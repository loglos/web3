



var RequestManager = require('./web3_hpb/requestmanager');
var Iban = require('./web3_hpb/iban');
var Hpb = require('./web3_hpb/methods/hpb');
var DB = require('./web3_hpb/methods/db');
var Shh = require('./web3_hpb/methods/shh');
var Net = require('./web3_hpb/methods/net');
var Personal = require('./web3_hpb/methods/personal');
var Swarm = require('./web3_hpb/methods/swarm');
var Debug = require('./web3_hpb/methods/debug');
var Settings = require('./web3_hpb/settings');
var version = require('./version.json');
var utils = require('./utils/utils');
var sha3 = require('./utils/sha3');
var extend = require('./web3_hpb/extend');
var Batch = require('./web3_hpb/batch');
var Property = require('./web3_hpb/property');
var HttpProvider = require('./web3_hpb/httpprovider');
var IpcProvider = require('./web3_hpb/ipcprovider');
var BigNumber = require('bignumber.js');



function web3_hpb (provider) {
    this._requestManager = new RequestManager(provider);
    this.currentProvider = provider;
    this.hpb = new Hpb(this);
    this.db = new DB(this);
    this.shh = new Shh(this);
    this.net = new Net(this);
    this.personal = new Personal(this);
    this.debug = new Debug(this);
    this.bzz = new Swarm(this);
    this.settings = new Settings();
    this.version = {
        api: version.version
    };
    this.providers = {
        HttpProvider: HttpProvider,
        IpcProvider: IpcProvider
    };
    this._extend = extend(this);
    this._extend({
        properties: properties()
    });
}

// expose providers on the class
web3_hpb.providers = {
    HttpProvider: HttpProvider,
    IpcProvider: IpcProvider
};

web3_hpb.prototype.setProvider = function (provider) {
    this._requestManager.setProvider(provider);
    this.currentProvider = provider;
};

web3_hpb.prototype.reset = function (keepIsSyncing) {
    this._requestManager.reset(keepIsSyncing);
    this.settings = new Settings();
};

web3_hpb.prototype.BigNumber = BigNumber;
web3_hpb.prototype.toHex = utils.toHex;
web3_hpb.prototype.toAscii = utils.toAscii;
web3_hpb.prototype.toUtf8 = utils.toUtf8;
web3_hpb.prototype.fromAscii = utils.fromAscii;
web3_hpb.prototype.fromUtf8 = utils.fromUtf8;
web3_hpb.prototype.toDecimal = utils.toDecimal;
web3_hpb.prototype.fromDecimal = utils.fromDecimal;
web3_hpb.prototype.toBigNumber = utils.toBigNumber;
web3_hpb.prototype.toWei = utils.toWei;
web3_hpb.prototype.fromWei = utils.fromWei;
web3_hpb.prototype.isAddress = utils.isAddress;
web3_hpb.prototype.isChecksumAddress = utils.isChecksumAddress;
web3_hpb.prototype.toChecksumAddress = utils.toChecksumAddress;
web3_hpb.prototype.isIBAN = utils.isIBAN;
web3_hpb.prototype.padLeft = utils.padLeft;
web3_hpb.prototype.padRight = utils.padRight;


web3_hpb.prototype.sha3 = function(string, options) {
    return '0x' + sha3(string, options);
};


web3_hpb.prototype.fromICAP = function (icap) {
    var iban = new Iban(icap);
    return iban.address();
};

var properties = function () {
    return [
        new Property({
            name: 'version.node',
            getter: 'web3_hpb_clientVersion'
        }),
        new Property({
            name: 'version.network',
            getter: 'net_version',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.hpber',
            getter: 'hpb_protocolVersion',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.whisper',
            getter: 'shh_version',
            inputFormatter: utils.toDecimal
        })
    ];
};

web3_hpb.prototype.isConnected = function(){
    return (this.currentProvider && this.currentProvider.isConnected());
};

web3_hpb.prototype.createBatch = function () {
    return new Batch(this);
};

module.exports = web3_hpb;
