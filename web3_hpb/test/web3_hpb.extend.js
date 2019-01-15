var chai = require('chai');
var assert = chai.assert;
var FakeHttpProvider = require('./helpers/FakeHttpProvider');
var web3_hpb = require('../lib/web3_hpb');
var web3_hpb = new web3_hpb();


var tests = [{
    properties: [new web3_hpb._extend.Property({
        name: 'gasPrice',
        getter: 'hpb_gasPrice',
        outputFormatter: web3_hpb._extend.formatters.outputBigNumberFormatter
    })]
},{
    methods: [new web3_hpb._extend.Method({
        name: 'getBalance',
        call: 'hpb_getBalance',
        params: 2,
        inputFormatter: [web3_hpb._extend.utils.toAddress, web3_hpb._extend.formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: web3_hpb._extend.formatters.outputBigNumberFormatter
    })]
},{
    property: 'admin',
    properties: [new web3_hpb._extend.Property({
        name: 'gasPrice',
        getter: 'hpb_gasPrice',
        outputFormatter: web3_hpb._extend.formatters.outputBigNumberFormatter
    })],
    methods: [new web3_hpb._extend.Method({
        name: 'getBalance',
        call: 'hpb_getBalance',
        params: 2,
        inputFormatter: [web3_hpb._extend.utils.toAddress, web3_hpb._extend.formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: web3_hpb._extend.formatters.outputBigNumberFormatter
    })]
}];

describe('web3_hpb', function () {
    describe('_extend', function () {
        tests.forEach(function (test, index) {
            it('test no: ' + index, function () {
                web3_hpb._extend(test);


                if(test.properties)
                    test.properties.forEach(function(property){

                        var provider = new FakeHttpProvider();
                        web3_hpb.setProvider(provider);
                        provider.injectResult('');
                        provider.injectValidation(function (payload) {
                            assert.equal(payload.jsonrpc, '2.0');
                            assert.equal(payload.method, property.getter);
                        });

                        if(test.property) {
                            assert.isObject(web3_hpb[test.property][property.name]);
                            assert.isFunction(web3_hpb[test.property]['get'+ property.name.charAt(0).toUpperCase() + property.name.slice(1)]);
                        } else {
                            assert.isObject(web3_hpb[property.name]);
                            assert.isFunction(web3_hpb['get'+ property.name.charAt(0).toUpperCase() + property.name.slice(1)]);                        
                        }
                    });

                if(test.methods)
                    test.methods.forEach(function(property){
                        if(test.property)
                            assert.isFunction(web3_hpb[test.property][property.name]);
                        else
                            assert.isFunction(web3_hpb[property.name]);
                    });

            });
        });
    });
});

