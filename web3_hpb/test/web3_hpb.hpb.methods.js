var chai = require('chai');
var assert = chai.assert;
var web3_hpb = require('../index.js');
var web3_hpb = new web3_hpb();
var u = require('./helpers/test.utils.js');
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

describe('web3_hpb.hpb', function() {
    describe('methods', function() {
        // set dummy providor, to prevent error
        web3_hpb.setProvider(new FakeHttpProvider());

        u.methodExists(web3_hpb.hpb, 'getBalance');
        u.methodExists(web3_hpb.hpb, 'getStorageAt');
        u.methodExists(web3_hpb.hpb, 'getTransactionCount');
        u.methodExists(web3_hpb.hpb, 'getCode');
        u.methodExists(web3_hpb.hpb, 'sendTransaction');
        u.methodExists(web3_hpb.hpb, 'call');
        u.methodExists(web3_hpb.hpb, 'getBlock');
        u.methodExists(web3_hpb.hpb, 'getTransaction');
        u.methodExists(web3_hpb.hpb, 'getUncle');
        u.methodExists(web3_hpb.hpb, 'getBlockTransactionCount');
        u.methodExists(web3_hpb.hpb, 'getBlockUncleCount');
        u.methodExists(web3_hpb.hpb, 'filter');
        u.methodExists(web3_hpb.hpb, 'contract');

        u.propertyExists(web3_hpb.hpb, 'coinbase');
        u.propertyExists(web3_hpb.hpb, 'mining');
        u.propertyExists(web3_hpb.hpb, 'gasPrice');
        u.propertyExists(web3_hpb.hpb, 'accounts');
        u.propertyExists(web3_hpb.hpb, 'defaultBlock');
        u.propertyExists(web3_hpb.hpb, 'blockNumber');
        u.propertyExists(web3_hpb.hpb, 'protocolVersion');
    });
});

