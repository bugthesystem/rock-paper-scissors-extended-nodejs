rospock-node
================================

Simple game that I have developed to use nodejs (best) practices
[![Build Status](https://travis-ci.org/ziyasal/rospock-node.svg)](https://travis-ci.org/ziyasal/rospock-node) [![Coverage Status](https://coveralls.io/repos/ziyasal/rospock-node/badge.svg?branch=master&service=github)](https://coveralls.io/github/ziyasal/rospock-node?branch=master)

##Requirements
###Node.js
Tested with node.js `v5.1.0 Stable`.

##Usage

###Install Dependencies

**On Windows**
```sh
npm install
```

**On Linux**
```sh
sudo npm install
```

### Commands

**Start Sample App**
```sh
npm start
```

**Test**
```sh
npm test
```

**Coverage**
```sh
npm run test-cov
```

**JSHint Lib**
```sh
npm run jshint-lib
```

**JSHint Tests**
```sh
npm run jshint-tests
```

###Used 3.Party Testing Modules

[**mocha**](https://github.com/mochajs/mocha)  
`Simple, flexible, fun javascript test framework for node.js & the browser.`  
[**should**](https://github.com/shouldjs/should.js)  
`BDD style assertions for node.js.`  
[**sinon**](https://github.com/sinonjs/sinon)   
`Standalone test spies, stubs and mocks for JavaScript.`  
[**jshint**](https://github.com/jshint/jshint)  
`JSHint is a tool that helps to detect errors and potential problems in your JavaScript code.`  
[**istanbul**](https://github.com/gotwarlost/istanbul)  
`JS code coverage tool that computes statement, line, function and branch coverage with 
module loader hooks to transparently add coverage when running tests.`

[**proxyquire**](https://github.com/thlorenz/proxyquire)
 _**This package was used for just the system packages.**_  
`Proxies node.js require in order to allow overriding dependencies during testing.`