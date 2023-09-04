# 神领物流 - 快递员端（安卓APP）

#### 技术栈
- vue3+uniapp

#### 项目简介
> 快递员端：快递员端要主要包含取件派件、运费计算、微信支付宝收款、地图线路等功能

#### 项目迭代日志：
- v1 - 涉及主流程
	- 快递员端包含：
		- 用户登录 - 用户名密码登录
		- 取件 - 包含 筛选、去取件、取消订单、转单、打印、拨打电话、发信息、收款
		- 消息 - 包含 公告、公告详情、系统通知（寄件相关、签收提醒、快件取消）
		- 派件 - 包含 去派件、拨打电话、发信息、收款、订单跟踪
		- 历史派送 - 包含 日期筛选、取件派件列表搜索
		- 运费查询 - 查询运费
		- 我的 - 包含 我的详情
	- 目前遗留问题：
		- 订单跟踪 - 未调试 （地图页面未实现）
		- 搜索：各个模块搜索功能
		- 打印：取件、派件打印
		- 运单详情：地图路线图
		- 我的：二维码弹出专属、作业范围
		- 手机登录
		- 电话拨打、发信息

#### 运行环境 - 初始开发环境及工具
- 安卓手机、MuMu模拟器（版本 2.2.3（x86）,桌面启动器版本 2.3.2）
- 安装包 luj
	- unpackage/release/apk
	- XXX.apk 文件为安装文件
- MuMu模拟器安装包 
	- windows：--
	- MAC：mumu-mac.dmg
#### 开发环境
- 系统：windows 版本 windows 10 企业版
- 工具：HbuilderX 3.4.7.20220422
- node： 16.14.2
#### 安装运行
- 本项目为uniapp架构 需要依赖 HBuilderX编辑器
- 下载地址：https://www.dcloud.io/hbuilderx.html
##### 依赖安装
- 依赖安装
	- HBuilderX为集成编辑器所有依赖都已经集成好了
- 运行
	- 点击编辑器上的运行按钮 可使用手机或模拟器（默认可以使用浏览器直接预览） 
	- 使用手机或者模拟器 请阅读文件：
		- [真机运行](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#%E8%BF%90%E8%A1%8C%E5%85%A5%E5%8F%A3) 
		- [安装模拟器](https://uniapp.dcloud.net.cn/tutorial/run/installSimulator.html#simulator) 
		- [常见问题](https://uniapp.dcloud.net.cn/tutorial/run/run-app-faq.html)
- 打包
	- 点击编辑器的发行 - 云打包 会生成对应的安装包 （打包后控制台会展示打包后的路径） 默认路径为：unpackage/release/apk/xxx.apk 文件

#### 项目目录结构
```html
├── unpackage              编译结果目录
├── static                 icon目录
├── pages.js               路由
├── styles                 共用样式
├── store                  vuex
├── pages                  页面文件目录
|   ├──  api                api接口	
|   |   ├── common.js      公用	
|   |   ├── freight.js     运费计算
|   |   ├── index.js       取件派件	
|   |   ├── news.js        消息
|   |   ├── user.js        用户信息
|   ├── start              引导文件夹
|   ├── login              登录文件夹	
|   |   ├── user.vue       用户页面逻辑
|   |   ├── index.scss     页面样式
|   |   ├── components     页面组件
|   ├── index              首页文件夹
|   |   ├── index.vue      页面逻辑
|   |   ├── index.scss     页面样式
|   |   ├── components     页面组件
|   ├── cancel             取消取件文件夹
|   |   ├── index.vue      页面逻辑
|   |   ├── cause.vue      取消原因
|   ├── delivery           派件文件夹
|   |   ├── index.vue      页面逻辑
|   |   ├── index.scss     页面样式
|   |   ├── components     页面组件
|   ├── pickup             取件文件夹
|   |   ├── index.vue      页面逻辑
|   |   ├── index.scss     页面样式
|   |   ├── components     页面组件
|   ├── details            详情文件夹
|   |   ├── index.vue      去取件页面逻辑
|   |   ├── orderMap.vue   订单跟踪
|   |   ├── waybill.vue    去派件、运单详情
|   |   ├── index.scss     页面样式
|   |   ├── components     页面组件
|   ├── search             搜索
|   ├── news               消息页文件夹
|   |   ├── index.vue      页面逻辑
|   |   ├── system.vue     系统通知页
|   |   ├── detail.vue     公告详情页	
|   |   ├── index.scss     页面样式	
|   |   ├── components     页面组件	
|   ├── history            历史取派文件夹	
|   |   ├── index.vue      页面逻辑	
|   |   ├── index.scss     页面样式
|   |   ├── components     页面组件
|   ├── freight            运费查询文件夹
|   |   ├── index.vue      页面逻辑
|   |   ├── index.scss     页面样式
|   |   ├── components     页面组件
|   ├── my                 我的文件夹
|   |   ├── index.vue      页面逻辑
|   |   ├── index.scss     页面样式
|   |   ├── components     页面组件
|   ├── pay                收款文件夹
|   |   ├── index.vue      页面逻辑
|   |   ├── index.scss     页面样式
|   |   ├── components     页面组件
└── package.json
	
```
#### 相关资料
- [Vue3:](https://cn.vuejs.org/guide/introduction.html)
- [uniapp](https://uniapp.dcloud.net.cn/tutorial/)
#### 参考文档（项目开发过程中用到的所有技术难点 涉及到的相关参考）
- [vite配置:](https://vitejs.dev/config/)
