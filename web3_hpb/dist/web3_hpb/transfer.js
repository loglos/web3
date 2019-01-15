


var Iban = require('./iban');
var exchangeAbi = require('../contracts/SmartExchange.json');


var transfer = function (hpb, from, to, value, callback) {
    var iban = new Iban(to); 
    if (!iban.isValid()) {
        throw new Error('invalid iban address');
    }

    if (iban.isDirect()) {
        return transferToAddress(hpb, from, iban.address(), value, callback);
    }
    
    if (!callback) {
        var address = hpb.icapNamereg().addr(iban.institution());
        return deposit(hpb, from, address, value, iban.client());
    }

    hpb.icapNamereg().addr(iban.institution(), function (err, address) {
        return deposit(hpb, from, address, value, iban.client(), callback);
    });
    
};


var transferToAddress = function (hpb, from, to, value, callback) {
    return hpb.sendTransaction({
        address: to,
        from: from,
        value: value
    }, callback);
};


var deposit = function (hpb, from, to, value, client, callback) {
    var abi = exchangeAbi;
    return hpb.contract(abi).at(to).deposit(client, {
        from: from,
        value: value
    }, callback);
};

module.exports = transfer;

