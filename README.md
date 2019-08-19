
English | [简体中文](./README.zh-CN.md)
## Introduction

[materail-admin](https://github.com/enilu/material-admin) is a Materail Design Admin Framework based on [Spring Boot2](https://spring.io/projects/spring-boot/) and [Bootstrap](https://www.bootcss.com/). 
It includes basic functions commonly used in the background of rights management, configuration management, organization, users, scheduled tasks, and message management. Refining a typical business model can help you quickly build an enterprise back-end product system.

- [Online Demo](http://material.enilu.cn) 
 
## Preparation

- Download JAVA IDE :Eclipse or Intellij IDEA
- Install the Lombook plugin in the IDE.
- Install JDK1.8 ,MySQL5.5+，Maven

**Welcome to make an issue or pr**

 
## Features
- Department management
- Account management
- Role management
- Menu management
- Permission managemenet
- Configuration 
- Dict managemenet
- Schedule 
- log  

## Getting started

```
# create dabase in mysql:
CREATE DATABASE IF NOT EXISTS material DEFAULT CHARSET utf8 COLLATE utf8_general_ci; 
CREATE USER 'material'@'%' IDENTIFIED BY 'material123';
GRANT ALL privileges ON material.* TO 'material'@'%';
flush privileges;

# clone the project
git clone https://github.com/enilu/material-admin.git
# enter the project directory
cd material-admin
# build and package 
mvn package 
# run the project
 java -jar target/material.jar

# open the browser and enter:
http://localhost:8085
user/password:admin/admin

``` 
## Online Demo

[http://material.enilu.cn](http://material.enilu.cn)


## License

[MIT](https://github.com/enilu/material-admin/blob/master/LICENSE)

Copyright (c) 2017-present enilu