# 神领物流 - 用户端（小程序）

### 项目简介
用户端: 主要承担了用户登录，下单，查询订单的功能

### 技术栈
vue3+uniapp

### 项目迭代日志：
- v1 - 涉及主流程
	- 用户端包含：
	  - 用户微信快捷登录
	  - 首页
	  - 下单
	  - 订单详情
	  - 订单取消
	  - 下单成功
	  - 实名认证
	  - 电子存根
### 外部环境
[启动文档](https://www.tapd.cn/33055819/personal_documents/show/1133055819001004909)
- 开发环境
- 1、申请开发权限
- 2、git拉代码
- 3、启动微信开发者工具
- 4、导入项目并启动

#### 运行环境 - 初始开发环境及工具
- 微信开发者工具（版本 1.06.2206090）
- HbuilderX (版本3.5.3.20220729)
- 开发版本（1.2.3）
- [下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

#### 开发环境
- windows 版本 windows 10 企业版
- 开发工具 vscode
- node 版本 v14.19.1
- npm 版本 v6.14.16

##### 依赖安装
- 依赖安装
	- HBuilderX为集成编辑器所有依赖都已经集成好了
- 运行
	- 开启开发者工具（需要有对应的开发权限 - 如果是没有请使用测试账号流程 [操作文档](./img/test.docx)）
	- 点击编辑器上的运行按钮 选择 微信开发者工具 会自动打开该项目
	- [参考](https://uniapp.dcloud.net.cn/tutorial/debug/debug-mp.html#mp-debug)
- 打包
	- 点击编辑器的发行 - 云打包 会生成对应的安装包 （打包后控制台会展示打包后的路径） 默认路径为：unpackage/release/apk/xxx.apk 文件

- #### 项目目录结构
```html
  ├── unpackage              编译结果目录
  ├── static                 icon目录
  ├── pages.js               路由
  ├── styles                 共用样式
  ├── store                  vuex
  ├── components             公用组件
  ├── pages                  页面文件目录
  |   ├── api                api接口
  |   ├── address            地址簿
  |   ├── express-delivery   寄快递
  |   ├── goodsInfo   		 物品信息
  |   ├── login   			 登录
  |   ├── my   			 	 我的页
  |   ├── index              首页
  |   |   ├── index.vue      页面逻辑
  |   |   ├── index.scss     页面样式
  |   |   ├── components     页面组件
  ├── subPages               页面文件目录
  |   ├── account-rules      计费规则
  |   ├── address-info   	 地址详情
  |   ├── authentication-success  认证成功
  |   ├── electronic-stub    电子存根
  |   ├── order-cancel       订单取消
  |   ├── order-info         订单详情
  |   ├── order-success   	 下单成功
  |   ├── realName-authentication  实名认证
  └── package.json
  └── util
```  
### 涉及到第三方库

- [uniapp] (https://uniapp.dcloud.net.cn/api/window/window.html#getcurrentpages)
- [微信开发者文档] (https://developers.weixin.qq.com/miniprogram/dev/framework/)