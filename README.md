# Consul-SDK  [![npm version](https://badge.fury.io/js/consul-sdk.svg)](https://badge.fury.io/js/consul-sdk)
A succinct Consul SDK based on [node-consul](https://www.npmjs.com/package/consul)   


## 1. 安装
- npm方式：
```
npm i consul-sdk --save
```
- yarn方式：
```
yarn add consul-sdk
```
## 2. 配置
在服务根目录下放一个配置文件 consul.json，格式如下：
```
{
  "serverHost": "192.168.1.1",      // consul服务地址
  "serverPort": 8500,               // consul服务端口
  "secure": false,                  // 是否使用安全连接

  "name": "node-consul-sdk",        // 服务名称
  "host": "127.0.0.1",              // 服务所在的IP地址
  "port": 8020                      // 服务使用的端口
}
```
## 3.调用
在服务入口文件中(比如app.js) 引入模块：
```
require('consul-sdk')
```