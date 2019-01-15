


var Jsonrpc = require('./jsonrpc');
var utils = require('../utils/utils');
var c = require('../utils/config');
var errors = require('./errors');


var RequestManager = function (provider) {
    this.provider = provider;
    this.polls = {};
    this.timeout = null;
};


RequestManager.prototype.send = function (data) {
    if (!this.provider) {
        console.error(errors.InvalidProvider());
        return null;
    }

    var payload = Jsonrpc.toPayload(data.method, data.params);
    var result = this.provider.send(payload);

    if (!Jsonrpc.isValidResponse(result)) {
        throw errors.InvalidResponse(result);
    }

    return result.result;
};


RequestManager.prototype.sendAsync = function (data, callback) {
    if (!this.provider) {
        return callback(errors.InvalidProvider());
    }

    var payload = Jsonrpc.toPayload(data.method, data.params);
    this.provider.sendAsync(payload, function (err, result) {
        if (err) {
            return callback(err);
        }
        
        if (!Jsonrpc.isValidResponse(result)) {
            return callback(errors.InvalidResponse(result));
        }

        callback(null, result.result);
    });
};


RequestManager.prototype.sendBatch = function (data, callback) {
    if (!this.provider) {
        return callback(errors.InvalidProvider());
    }

    var payload = Jsonrpc.toBatchPayload(data);

    this.provider.sendAsync(payload, function (err, results) {
        if (err) {
            return callback(err);
        }

        if (!utils.isArray(results)) {
            return callback(errors.InvalidResponse(results));
        }

        callback(err, results);
    }); 
};


RequestManager.prototype.setProvider = function (p) {
    this.provider = p;
};


RequestManager.prototype.startPolling = function (data, pollId, callback, uninstall) {
    this.polls[pollId] = {data: data, id: pollId, callback: callback, uninstall: uninstall};


    // start polling
    if (!this.timeout) {
        this.poll();
    }
};


RequestManager.prototype.stopPolling = function (pollId) {
    delete this.polls[pollId];

    // stop polling
    if(Object.keys(this.polls).length === 0 && this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
    }
};


RequestManager.prototype.reset = function (keepIsSyncing) {
    

    for (var key in this.polls) {
        // remove all polls, except sync polls,
        // they need to be removed manually by calling syncing.stopWatching()
        if(!keepIsSyncing || key.indexOf('syncPoll_') === -1) {
            this.polls[key].uninstall();
            delete this.polls[key];
        }
    }

    // stop polling
    if(Object.keys(this.polls).length === 0 && this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
    }
};


RequestManager.prototype.poll = function () {
    
    this.timeout = setTimeout(this.poll.bind(this), c.HPB_POLLING_TIMEOUT);

    if (Object.keys(this.polls).length === 0) {
        return;
    }

    if (!this.provider) {
        console.error(errors.InvalidProvider());
        return;
    }

    var pollsData = [];
    var pollsIds = [];
    for (var key in this.polls) {
        pollsData.push(this.polls[key].data);
        pollsIds.push(key);
    }

    if (pollsData.length === 0) {
        return;
    }

    var payload = Jsonrpc.toBatchPayload(pollsData);
    
    // map the request id to they poll id
    var pollsIdMap = {};
    payload.forEach(function(load, index){
        pollsIdMap[load.id] = pollsIds[index];
    });


    var self = this;
    this.provider.sendAsync(payload, function (error, results) {


        // TODO: console log?
        if (error) {
            return;
        }

        if (!utils.isArray(results)) {
            throw errors.InvalidResponse(results);
        }
        results.map(function (result) {
            var id = pollsIdMap[result.id];

            // make sure the filter is still installed after arrival of the request
            if (self.polls[id]) {
                result.callback = self.polls[id].callback;
                return result;
            } else
                return false;
        }).filter(function (result) {
            return !!result; 
        }).filter(function (result) {
            var valid = Jsonrpc.isValidResponse(result);
            if (!valid) {
                result.callback(errors.InvalidResponse(result));
            }
            return valid;
        }).forEach(function (result) {
            result.callback(null, result.result);
        });
    });
};

module.exports = RequestManager;

