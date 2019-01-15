


var utils = require('../../utils/utils');
var Property = require('../property');

var Net = function (web3_hpb) {
    this._requestManager = web3_hpb._requestManager;

    var self = this;

    properties().forEach(function(p) { 
        p.attachToObject(self);
        p.setRequestManager(web3_hpb._requestManager);
    });
};

/// @returns an array of objects describing web3_hpb.hpb api properties
var properties = function () {
    return [
        new Property({
            name: 'listening',
            getter: 'net_listening'
        }),
        new Property({
            name: 'peerCount',
            getter: 'net_peerCount',
            outputFormatter: utils.toDecimal
        })
    ];
};

module.exports = Net;
