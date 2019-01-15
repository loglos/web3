var chai = require('chai');
var assert = chai.assert;
var web3_hpb = require('../index');
var web3_hpb = new web3_hpb();
var BigNumber = require('bignumber.js');
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

var method = 'gasPrice';

var tests = [{
    result: '0x15f90',
    formattedResult: new BigNumber(90000),
    call: 'hpb_'+ method
}];

describe('web3_hpb.hpb', function () {
    describe(method, function () {
        tests.forEach(function (test, index) {
            it('property test: ' + index, function () {
                
                // given
                var provider = new FakeHttpProvider();
                web3_hpb.setProvider(provider);
                provider.injectResult(test.result);
                provider.injectValidation(function (payload) {
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, test.call);
                    assert.deepEqual(payload.params, []);
                });

                // when 
                var result = web3_hpb.hpb[method];
                
                // then
                assert.deepEqual(test.formattedResult, result);
            });
        });
    });
});

