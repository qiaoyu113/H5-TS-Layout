

# 梧桐综合业务支撑平台

该文件为“梧桐综合业务支撑平台”前端项目的基础架构和介绍

## 项目架构版本
| Vue | vant-Ui |
| ------ | ------ |
| v2.6.10 | v2.5.5 |

| Author | E-mail |
| ------ | ------ |
| 乔宇 | 527324363@qq.com |

## 开发

```bash
# 克隆项目
git clone http://firmiana-gitlab.yunniao.cn/firmiana/szjw_bss_h5

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev

# 打包
npm run dist / yarn run dist
```

## 目录

```bash
├── public                     // 构建相关
├── mock                       // 本地mock数据
│   ├── role                   // mock权限相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 静态资源
│   ├── components             // 全局公用组件
│   ├── filters                // 全局 filter
│   ├── icons                  // 项目所有 svg icons
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── views                  // views 所有页面
│   |   ├── 404                // 404页面
│   |   ├── home               // APP主框架
│   |   ├── views              // view文件夹
│   |   |   ├── clue           // 线索相关
│   |   |   ├── driver         // 司机相关
│   |   |   ├── line           // 线路相关
│   |   |   ├── order          // 订单相关
│   |   |   ├── other          // 附加相关
│   |   |   ├── setting        // 个人中心设置相关
│   |   |   └── user           // 个人中心相关
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口文件 加载组件 初始化等
│   └── settings.js            // 公共设置项
├── .eslintrc.js               // eslint 配置项
├── .gitignore                 // git 忽略项
├── index.html                 // html模板
└── package.json               // package.json
```

  
## D2环境
[D2环境](http://firmiana-open-api-d2.yunniao.cn)

## M1环境
[M1环境](http://firmiana-wechat.m1.yunniao.cn)

## 代码规范

```bash
1.文字按功能命名（v1.12.2 later）：

- 注：main（正文用字）；assist（辅助用字）；stress（强调用字）；title（标题用字）；xtitle（大一号标题用字）

- 文字使用场所                命名
- 正文使用                 F_font_main
- 辅助用字                 F_font_assist

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

2.views中命名文件名规则：

- 第一个单词小写，第二个单词首字母大写

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

3.router命名极配置：

- 路径配置全部在src/router/roles.js内
- 命名时单词首字母大写
- path格式为小写，单词中间使用-连接
- name和components、view中模块name一致
- hidden为是否展示在菜单栏中（例：子页面为hidden: true）
- apiUrl为对应页面的router-roles权限

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

4.component格式规范:

- 命名时单词首字母大写
- 文件夹名称为模块Name
- 文件夹内统一为index.vue，通过文件夹名指向

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

5.代码规范：

- 文件内分为template、script、style

- Template:
- 首行缩进为0，代码上下缩进为2个空格
- 判断及循环置前，紧跟动态属性，顺序已在esLint中配置，如果顺序问题错误，terminal中会体现

- Script:
- 冒号：后面要保留一个空格
- 等号= 前后要保留一个空格
- 括号() 后面如有{} 要保留一个空格
- 逗号， 后面要保留一个空格
- js中换行最好统一都加分号；
- js中条件项需要引号时，首选单引号
- script中先import、再export default
- function中then和catch中都需将error展示；example:this.$message.error(err);

- Style:
- rel="stylesheet" lang="scss"
- 减少scope的使用
- 样式首层class命名与模块Name统一

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

6.directive规范
- 建立自定义名称，单词之间用-分割
- 最好统一使用小写
- 内部建立indexjs和与外层文件夹名称一致的js

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

7.Api规范
- 位置于src/api
- api文件夹根据bss功能类划分，例如线路为carline-api、标书为tender-api
- 命名api.js时用小写，后加-api
- 先import request from '@/utils/request' 再export
- function名称单词首字母大写
- get请求时params: data
- post请求时去掉params,仅保留data