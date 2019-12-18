# nft-shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Notice
This website is not fully tested due to the limitations presented by the composer plugin

### Issues

The following issues were identified during the development of the POC
1. ``Uncaught (in promise) TypeError: Cannot read property 'parentNode' of undefined
    at _callee$ (content.js:160020)
    at tryCatch (content.js:148965)
    at Generator.invoke [as _invoke] (content.js:149191)
    at Generator.prototype.<computed> [as next] (content.js:149017)
    at tryCatch (content.js:148965)
    at invoke (content.js:149055)
    at content.js:149065`` 
The above error prevented me from testing the website as such i do not know if the website would work as expected however all functions have been placed accordingly in the instance that the above error is fixed
2. No init function
The constant copying and pasting of a functions ABI resulted in the development time of the POC being longer i do suggest that the devs of composer have an init function that allows for the initialisation of the smartcontract like below
``window.hash.init({
    contractABI:[{}],
    contractID:'0.0xxxx'
})
``
Then developers can simply call the function of the contract like so
``
window.hash.contract.mintToken().then((result,err)={
}).catch((err){
})
``
Instead of what exists this will save allot of time because i dont have to copy paste the function ABI when i make changes to the function
3. I also suggest we have a function that allows developers to get the current active account on composer maybe someting along these lines
``
window.hash.defaultAccount
``
4. I also suggest having standard web3 functions like converting bytes to hext or string to hex this will help developers develop gas efficient contracts cause at the moment one can only use strings instad of bytes or bytes32 very few libararies exist that allow for conversion between the mentioned
5. Improve the documentation website allot of things are assumed which may not be apparent to developers
6. Improve on the UX of the composer plugin theres too much going on there and its very off putting 
7. Local dev tool kit if possible have a local dev kit for developers to use on their local machines again this will save allot of time
8. Improve the console website the UX of the website is quite bad but i understand its a WIP but i expected better


I didnt deploy to github pages because i thought it be better to just run the POC locally just to avoid issues