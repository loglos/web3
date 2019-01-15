


var Method = require('../method');

/// @returns an array of objects describing web3_hpb.hpb.filter api methods
var hpb = function () {
    var newFilterCall = function (args) {
        var type = args[0];

        switch(type) {
            case 'latest':
                args.shift();
                this.params = 0;
                return 'hpb_newBlockFilter';
            case 'pending':
                args.shift();
                this.params = 0;
                return 'hpb_newPendingTransactionFilter';
            default:
                return 'hpb_newFilter';
        }
    };

    var newFilter = new Method({
        name: 'newFilter',
        call: newFilterCall,
        params: 1
    });

    var uninstallFilter = new Method({
        name: 'uninstallFilter',
        call: 'hpb_uninstallFilter',
        params: 1
    });

    var getLogs = new Method({
        name: 'getLogs',
        call: 'hpb_getFilterLogs',
        params: 1
    });

    var poll = new Method({
        name: 'poll',
        call: 'hpb_getFilterChanges',
        params: 1
    });

    return [
        newFilter,
        uninstallFilter,
        getLogs,
        poll
    ];
};

/// @returns an array of objects describing web3_hpb.shh.watch api methods
var shh = function () {

    return [
        new Method({
            name: 'newFilter',
            call: 'shh_newMessageFilter',
            params: 1
        }),
        new Method({
            name: 'uninstallFilter',
            call: 'shh_deleteMessageFilter',
            params: 1
        }),
        new Method({
            name: 'getLogs',
            call: 'shh_getFilterMessages',
            params: 1
        }),
        new Method({
            name: 'poll',
            call: 'shh_getFilterMessages',
            params: 1
        })
    ];
};

module.exports = {
    hpb: hpb,
    shh: shh
};

