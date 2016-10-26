# Consul-SDK  [![npm version](https://badge.fury.io/js/consul-sdk.svg)](https://badge.fury.io/js/consul-sdk)
A succinct Consul SDK based on [node-consul](https://www.npmjs.com/package/consul)   

## 使用
在你的服务目录中安装配置并引用consul-sdk，需要三步：

#### 1. 安装
- npm方式：
```shell
npm i consul-sdk --save
```
- yarn方式：
```shell
yarn add consul-sdk
```
#### 2. 配置
在服务根目录下放一个配置文件 consul.json，格式如下：
```json
{
  "serverHost": "192.168.1.1",      
  "serverPort": 8500,              
  "secure": false,                 
  "name": "node-consul-sdk",        
  "host": "127.0.0.1",              
  "port": 8020               
}
```
配置说明：

| 字段        |     意义     |
| -----------| ---------:|
|serverHost | consul agent地址（选填，默认值为localhost)|
|serverPort |consul agent端口（选填，默认值为8500) |
|secure | 是否使用安全连接（选填，默认值为false) |
|name |服务名称 |
|host |服务所在的IP地址 |
|port |服务使用的端口 |

#### 3.调用
在服务入口文件中(比如app.js) 引入模块：
```javascript
require('consul-sdk')
```

## 功能列表
1. 服务启动时注册到consul
2. 服务退出时从consul注销