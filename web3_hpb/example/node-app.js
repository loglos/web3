#!/usr/bin/env node

var web3_hpb = require('../index.js');
var web3_hpb = new web3_hpb();

web3_hpb.setProvider(new web3_hpb.providers.HttpProvider('http://localhost:8545'));

var coinbase = web3_hpb.hpb.coinbase;
console.log(coinbase);

var balance = web3_hpb.hpb.getBalance(coinbase);
console.log(balance.toString(10));
