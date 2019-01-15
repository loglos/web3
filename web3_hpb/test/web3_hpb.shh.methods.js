var chai = require('chai');
var assert = chai.assert;
var web3_hpb = require('../index.js');
var web3_hpb = new web3_hpb();
var u = require('./helpers/test.utils.js');

describe('web3_hpb.shh', function() {
    describe('methods', function() {
        u.methodExists(web3_hpb.shh, 'version');
        u.methodExists(web3_hpb.shh, 'info');
        u.methodExists(web3_hpb.shh, 'setMaxMessageSize');
        u.methodExists(web3_hpb.shh, 'setMinPoW');
        u.methodExists(web3_hpb.shh, 'markTrustedPeer');
        u.methodExists(web3_hpb.shh, 'newKeyPair');
        u.methodExists(web3_hpb.shh, 'addPrivateKey');
        u.methodExists(web3_hpb.shh, 'deleteKeyPair');
        u.methodExists(web3_hpb.shh, 'hasKeyPair');
        u.methodExists(web3_hpb.shh, 'getPublicKey');
        u.methodExists(web3_hpb.shh, 'getPrivateKey');
        u.methodExists(web3_hpb.shh, 'newSymKey');
        u.methodExists(web3_hpb.shh, 'addSymKey');
        u.methodExists(web3_hpb.shh, 'generateSymKeyFromPassword');
        u.methodExists(web3_hpb.shh, 'hasSymKey');
        u.methodExists(web3_hpb.shh, 'getSymKey');
        u.methodExists(web3_hpb.shh, 'deleteSymKey');
        u.methodExists(web3_hpb.shh, 'newMessageFilter');
        u.methodExists(web3_hpb.shh, 'post');

    });
});

