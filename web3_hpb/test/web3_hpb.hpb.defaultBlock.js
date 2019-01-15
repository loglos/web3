var chai = require('chai');
var assert = chai.assert;
var web3_hpb = require('../index');
var web3_hpb = new web3_hpb();

describe('web3_hpb.hpb', function () {
    describe('defaultBlock', function () {
        it('should check if defaultBlock is set to proper value', function () {
            assert.equal(web3_hpb.hpb.defaultBlock, 'latest');
        });
    });
});

