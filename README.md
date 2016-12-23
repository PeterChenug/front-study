# front-study
Front Study Project of PeterZhang

- [Vue官网](http://vuejs.org/)
- [iview](https://www.iviewui.com)
- [Ant.Design官网](http://ant.design/)
- [FE-Driver](https://fe-driver.github.io/vue-beauty/#!/components/alert)

## 目录结构
<pre>
    front-study/
    |-- build               存放webpack的配置
    |-- views               存放页面
        |-- demo
            |-- index.html  页面视图 名字必须为index.html 否则无法找到页面
            |-- demo.js     页面脚本文件 名字必须与文件夹一致
            |-- demo.less   页面样式文件 名字随意，脚本require就可以了
    |-- assets              资源文件
        |-- js              脚本文件
            |-- app.js      公共入口文件
        |-- css             样式目录
            |-- app.less    公共样式文件
        |-- images          图片资源
</pre>


- `cnpm install`
- `npm run dev`

## 开发步骤 (已弃用npm, 参见yarn)
- 安装淘宝NPM镜像 npm install -g cnpm --registry=https://registry.npm.taobao.org
- 执行 cnpm install
- 执行 npm run dev

## 命名规范
- 文件，目录均以小写开头，驼峰式(如inputNumber)
- 组件的import export 均以v开头，驼峰式(如vInputNumber)

# front-study

