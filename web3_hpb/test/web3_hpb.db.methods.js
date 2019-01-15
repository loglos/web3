var chai = require('chai');
var assert = chai.assert; 
var web3_hpb = require('../index.js');
var web3_hpb = new web3_hpb();
var u = require('./helpers/test.utils.js');

describe('web3_hpb.db', function() {
    describe('methods', function() {
        u.methodExists(web3_hpb.db, 'putHex');
        u.methodExists(web3_hpb.db, 'getHex');
        u.methodExists(web3_hpb.db, 'putString');
        u.methodExists(web3_hpb.db, 'getString');
    });
});

