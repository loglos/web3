var chai = require('chai');
var assert = chai.assert;
var web3_hpb = require('../index.js');
var web3_hpb = new web3_hpb();
var u = require('./helpers/test.utils.js');
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

describe('web3_hpb.net', function() {
    describe('methods', function() {
        // set dummy providor, to prevent error
        web3_hpb.setProvider(new FakeHttpProvider());
        u.propertyExists(web3_hpb.personal, 'listAccounts');
        u.methodExists(web3_hpb.personal, 'newAccount');
        u.methodExists(web3_hpb.personal, 'unlockAccount');
    });
});
