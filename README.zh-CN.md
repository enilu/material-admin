[English](./README.md) | 简体中文
## 简介
[materail-admin](https://gitee.com/enilu/material-admin) 是一个通用的基础的后台管理系统，它基于[Spring Boot2](https://spring.io/projects/spring-boot/) 和 [Bootstrap](https://www.bootcss.com/)实现。它使用了当下流行的java 框架Spring Boot和基于Materail Design风格的组件构建。内置了权限管理，配置管理，组织机构，用户，定时任务，消息管理等后台常用的基础功能。提炼了典型的业务模型，可以帮助你快速搭建企业级中后台产品系统。

- [在线预览](http://material.enilu.cn) 
- [gitee地址](https://gitee.com/enilu/material-admin)
 
## 准备

你需要下载JAVA IDE :Eclipse或者Intellij IDEA

你需要在开发环境中安装Lombook插件，用以生成java entity的set get方法。

你需要在本地安装JDK1.8 ,MySQL5.5+，Maven


**如有问题请，欢迎 issue 和 pr**


## 技术选型

- 核心框架：spring boot
- 数据库层：spring data jpa
- 安全框架：Shiro
- 数据库连接池：Druid
- 缓存：Ehcache
- 前端：Beetl模版+Bootstrap
 
## 功能
- 部门管理
- 用户管理
- 角色管理
- 菜单管理
- 权限分配
- 参数管理
- 数据字典
- 定时任务
- 业务日志
- 登录日志

## 开发

- 克隆本项目
- 导入idea或者eclipse，确保开发工具安装了lombok插件，如果不了解该插件，请自行搜索
- 创建数据库： 
    ```sql
    CREATE DATABASE IF NOT EXISTS material DEFAULT CHARSET utf8 COLLATE utf8_general_ci; 
    CREATE USER 'material'@'%' IDENTIFIED BY 'material123';
    GRANT ALL privileges ON material.* TO 'material'@'%';
    flush privileges;
    
    ```
- 更改配置文件中相应数据库配置
- material-manage启动的时候会自动创建表并导入src/main/resources/import.sql到数据库中，无需开发手动初始化表结构
- 启动material-manage中的类：cn.enilu.material.admin.AdminApplication
- 访问 http://localhost:8085，   
- 登录，用户名密码:admin/admin

 
## Online Demo

[在线 Demo](http://material.enilu.cn)

## License

[MIT](https://github.com/enilu/material-admin/blob/master/LICENSE)

Copyright (c) 2017-present enilu
