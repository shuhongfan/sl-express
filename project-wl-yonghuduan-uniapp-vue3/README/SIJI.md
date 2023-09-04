# 神领物流 - 司机端（安卓APP）

#### 技术栈
- vue3+uniapp

#### 项目简介
> 司机端：主要为司机提供：提货 交货及车辆信息上报等功能

#### 项目迭代日志：
- v1 - 涉及主流程
	- 司机端包含：
		- 用户登录 - 用户名密码登录
		- 任务 - 包含 提货、在途、已完成
		- 信息 - 包含 公告、系统通知 
		- 我的 - 车辆信息、任务数据、系统设置
	- 目前遗留问题：- 接口未实现 二期补 
		- 上报异常 - 未调试 （地图定位页面未实现）
		- 系统设置：换绑手机、修改密码、消息通知设置功能 - 未调试
 
#### 运行环境 - 初始开发环境及工具
- 安卓手机、MuMu模拟器（版本 2.2.3（x86）,桌面启动器版本 2.3.2）
- 安装包 luj
	- unpackage/release/apk
	- XXX.apk 文件为安装文件  
- MuMu模拟器安装包 
	- windows：--
	- MAC：mumu-mac.dmg
#### 开发环境
- 系统：MacOs  
- 工具：HbuilderX 3.4.18.20220630
- node： 16.8.0
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
	
#### 项目结构
```html
├── unpackage              编译结果目录
├── static                 icon目录
├── pages.js               路由
├── styles                 共用样式
├── store                  vuex
├── pages                  页面文件目录
|   ├── api                api接口
|   ├── start              引导文件夹
|   ├── login              登录文件夹
|   ├── index              首页文件夹
|   |   ├── index.vue      页面逻辑
|   |   ├── index.scss     页面样式
|   |   ├── components     页面组件
|   ├── search             搜索
|   └── news               消息页文件夹
|   └── history            历史取派
|   └── freight            运费查询
├── manifest.json          所有App相关配置都在这个文件里
└── package.json

```
#### 相关资料
- [Vue3:](https://cn.vuejs.org/guide/introduction.html)
- [uniapp](https://uniapp.dcloud.net.cn/tutorial/)
#### 参考文档（项目开发过程中用到的所有技术难点 涉及到的相关参考）
- [vite配置:](https://vitejs.dev/config/)
