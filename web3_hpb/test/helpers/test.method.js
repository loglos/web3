var chai = require('chai');
var assert = chai.assert;
var web3_hpb = require('../../index');

var FakeHttpProvider = require('./FakeHttpProvider');
var clone = function (object) { return JSON.parse(JSON.stringify(object)); };

var runTests = function (obj, method, tests) {

    var testName = obj ? 'web3_hpb.' + obj : 'web';

    describe(testName, function () {
        describe(method, function () {
            tests.forEach(function (test, index) {
                it('sync test: ' + index, function () {
                    
                    // given
                    var provider = new FakeHttpProvider();
                    var web3_hpb = new web3_hpb(provider);
                    provider.injectResult(test.result);
                    provider.injectValidation(function (payload) {
                        assert.equal(payload.jsonrpc, '2.0');
                        assert.equal(payload.method, test.call);
                        assert.deepEqual(payload.params, test.formattedArgs);
                    });

                    var args = clone(test.args)

                    // when
                    if (obj) {
                        var result = web3_hpb[obj][method].apply(web3_hpb[obj], args);
                    } else {
                        var result = web3_hpb[method].apply(web3_hpb, args);
                    }
                    // when
                    //var result = (obj)
                        //? web3_hpb[obj][method].apply(null, test.args.slice(0))
                        //: web3_hpb[method].apply(null, test.args.slice(0));
                    
                    // then 
                    assert.deepEqual(test.formattedResult, result);
                });
                
                it('async test: ' + index, function (done) {
                    
                    // given
                    var provider = new FakeHttpProvider();
                    var web3_hpb = new web3_hpb(provider);

                    provider.injectResult(test.result);
                    provider.injectValidation(function (payload) {
                        assert.equal(payload.jsonrpc, '2.0');
                        assert.equal(payload.method, test.call);
                        assert.deepEqual(payload.params, test.formattedArgs);
                    });

                    var args = clone(test.args);
                   
                    // add callback
                    args.push(function (err, result) {
                        assert.deepEqual(test.formattedResult, result);
                        done();
                    });

                    // when
                    if (obj) {
                        web3_hpb[obj][method].apply(web3_hpb[obj], args);
                    } else {
                        web3_hpb[method].apply(web3_hpb, args);
                    }
                });
            });
        });
    });

};

module.exports = {
    runTests: runTests
}

