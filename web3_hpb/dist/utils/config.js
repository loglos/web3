







/// required to define HPB_BIGNUMBER_ROUNDING_MODE
var BigNumber = require('bignumber.js');

var HPB_UNITS = [
    'wei',
    'kwei',
    'Mwei',
    'Gwei',
    'szabo',
    'finney',
    'femtohpber',
    'picohpber',
    'nanohpber',
    'microhpber',
    'millihpber',
    'nano',
    'micro',
    'milli',
    'hpber',
    'grand',
    'Mhpber',
    'Ghpber',
    'Thpber',
    'Phpber',
    'Ehpber',
    'Zhpber',
    'Yhpber',
    'Nhpber',
    'Dhpber',
    'Vhpber',
    'Uhpber'
];

module.exports = {
    HPB_PADDING: 32,
    HPB_SIGNATURE_LENGTH: 4,
    HPB_UNITS: HPB_UNITS,
    HPB_BIGNUMBER_ROUNDING_MODE: { ROUNDING_MODE: BigNumber.ROUND_DOWN },
    HPB_POLLING_TIMEOUT: 1000/2,
    defaultBlock: 'latest',
    defaultAccount: undefined
};

