var web3_hpb = require('../index.js');
var web3_hpb = new web3_hpb();
var u = require('./helpers/test.utils.js');
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

describe('web3_hpb', function() {
    describe('methods', function () {
        // set dummy providor, to prevent error
        web3_hpb.setProvider(new FakeHttpProvider());

        u.methodExists(web3_hpb, 'sha3');
        u.methodExists(web3_hpb, 'toAscii');
        u.methodExists(web3_hpb, 'fromAscii');
        u.methodExists(web3_hpb, 'toDecimal');
        u.methodExists(web3_hpb, 'fromDecimal');
        u.methodExists(web3_hpb, 'fromWei');
        u.methodExists(web3_hpb, 'toWei');
        u.methodExists(web3_hpb, 'toBigNumber');
        u.methodExists(web3_hpb, 'isAddress');
        u.methodExists(web3_hpb, 'setProvider');
        u.methodExists(web3_hpb, 'reset');

        u.propertyExists(web3_hpb, 'providers');
        u.propertyExists(web3_hpb, 'hpb');
        u.propertyExists(web3_hpb, 'db');
        u.propertyExists(web3_hpb, 'shh');
    });
});

