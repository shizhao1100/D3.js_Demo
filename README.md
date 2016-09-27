# D3js.Demo

## 主旨
----------------

        该案例库由个人构建、旨在构建模块化的D3.js图表及提供一些常用数据。方便快速搭建基于D3.js的可视化项目同时为D3.js的初学者提供
    一定的帮助。

## 案例来源
----------------
+ 个人构建
+ 官网
+ D3.js开发者友情提供

## 目录
----------------

+ data
    + 汉字拓扑关系
        + 格式：json 符合D3.v3标准力学图格式
        + 大小：7969KB
        + 说明：该数据为将汉字词组拆分为单个汉字的链接关系。节点为单个简体中文汉字，链接关系为汉字与汉字之间构成词组时的关联关系。例如：[中华]、[人民]、[共和国] 经拆分后节点为 [中 华 人 民 共 和 国]，链接关系为[{中-华}、{人-民}、{共-和-国}]
        + 数据来源 由搜狗词库拆分所得
    + 中国地图数据
        + 格式：json
        + 大小：2364KB
        + 说明：该数据为中国各省级行政单位边界数据
        + 数据来源：数据搜集时间距该文档构建时间较远数据来源已不可考
    + ChinaAreas.JSON
        + 格式：json
        + 大小：424KB
        + 说明：该数据包含各级行政单位级别（由“level”字段给出 包含 0：[中国] 1：[省及直辖市] 2：[市] 3：[县]）、中国各级行政单位GPS坐标（精确至县区级）、各级行政单位层级关系（由“code”&&“parentCode”字段给出）
        + 数据来源：层级单位数据距该文档构建时间较远数据来源已不可考、GPS数据由[百度API提供](http://developer.baidu.com/map/jsdemo.htm#a5_3)
    + PINYINData.js 
        + 格式：js 
        + 大小：203KB
        + 说明：该数据为中文简体字拼音及多音字数据。拼音数据：pinyin（Array）包含Unicode码（19968 - 40869）区间带音调的简体中文拼音、多音字数据：Polyphone（objec）多音字识别库包含多音字在特定词语中的真实读音 <br /><b>补充说明：多音字库不全 欢迎补充</b>
        + 数据来源：不可考
    + world.json 
        + 格式：json
        + 大小：24579KB
        + 说明：该数据为世界各国家单位边界数据
        + 数据来源：不可考

+ WorldMap_Add_Img_Circle
    + 来源：sz_p
    + 功能：世界地图上打点添加图片
    + 技术栈：D3        
    + 截图
    + ![image](https://raw.githubusercontent.com/shizhao1100/D3.js_Demo/master/img/WorldMap_Add_Img_Circle.png)

+ D3WordCloud
    + 来源：sz_p
    + 功能：中英文分词显示词云
    + 技术栈：d3.layout.cloud.js、D3、php、version 2.0        
    + 截图
    + ![image](https://raw.githubusercontent.com/shizhao1100/D3.js_Demo/master/img/D3WordCloud.png)

+ D3LiquidFillGauge
    + 来源：不可考
    + 功能：显示指数
    + 技术栈：liquidFillGauge.js、D3        
    + 截图
    + ![image](https://raw.githubusercontent.com/shizhao1100/D3.js_Demo/master/img/D3LiquidFillGauge.png)

+ Custom_Curve
    + 来源：官网Demo改编
    + 功能：显示自定义函数曲线
    + 技术栈：D3        
    + 截图
    + ![image](https://raw.githubusercontent.com/shizhao1100/D3.js_Demo/master/img/Custom_Curve.png)

+ 遮罩节点
    + 来源：私密の/太阳
    + 功能：不规则图片规则化显示
    + 技术栈：CSS3        
    + 截图
    + ![image](https://raw.githubusercontent.com/shizhao1100/D3.js_Demo/master/img/节点遮罩.png)

+ BrusHandle
    + 来源：官网
    + 功能：刷选器
    + 技术栈：D3        
    + 截图
    + ![image](https://raw.githubusercontent.com/shizhao1100/D3.js_Demo/master/img/BrusHandle.png)

+ Ranks
    + 来源：sz_p
    + 功能：各种排行榜
    + 技术栈：D3

+ img
    + README.md 图片提供文件

+ lib
    + 说明：lib库文件
    + bootstrap-slider.js
    + d3.js（V3）
    + jquery.min.js
    + three.min.js
    
## 声明
    不定期维护、您的支持是我更新的动力。</br>
    源码完全开放，欢迎Star、Fork、提交BUG，并提出您宝贵的意见与建议。</br>
    该案例库内容仅供学习和参考请勿用于商业用途。</br>
