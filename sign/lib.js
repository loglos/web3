// 随机数生成器
var randomBytes = require('crypto').randomBytes;
// keccak哈希函数库
var createKeccakHash = require('keccak');
// secp256k1椭圆曲线库
var secp256k1 = require('secp256k1');
// 一些常用的方法：isHexString、intToBuffer、stripHexPrefix等
var util = require('ethjs-util');
// BigNumber
var BN = require('bn.js');
var Buffer = require('safe-buffer').Buffer;
var rlp = require('rlp');
window.randomBytes = randomBytes;
window.createKeccakHash = createKeccakHash;
window.secp256k1 = secp256k1;
window.util = util;
window.BN = BN;
window.Buffer = Buffer;
window.rlp = rlp;