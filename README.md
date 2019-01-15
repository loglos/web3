# HPB JavaScript API


This is the HPB compatible JavaScript API which implements the Generic JSON RPC spec.

You need to run a local Ethereum node to use this library.

## Table of Contents

- [Installation](#installation)
  - [As a Browser module](#as-a-browser-module)

### As a Browser module

CDN

```html
<script type="text/javascript" src="https://hpb.io/web_hpb.min.js"></script>
```

* Include `web3_hpb.min.js` in your html file.

## Usage

Use the `web3_hpb` object directly from the global namespace:

```js
var Web3ForHpb = require('web3_hpb');
var web3Hpb = new Web3ForHpb();
console.log(web3Hpb); //{ hpb:..., shh:... }
```

Set a provider (`HttpProvider`):

```js
// Set the provider you want from Web3.providers
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
```

There you go, now you can use it:

```js
var coinbase = web3Hpb.hpb.coinbase;
var balance = web3Hpb.hpb.getBalance(coinbase);
```

You can find more examples in the [`example`](https://github.com/yanranxiaoxiaoshu/web3/tree/master/web3_hpb/example) directory.

# text
