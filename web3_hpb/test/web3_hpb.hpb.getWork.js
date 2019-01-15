var chai = require('chai');
var web3_hpb = require('../index');
var testMethod = require('./helpers/test.method.js');

var method = 'getWork';

var tests = [{
    args: [],
    formattedArgs: [],
    result: true,
    formattedResult: true,
    call: 'hpb_'+ method
}];

testMethod.runTests('hpb', method, tests);

