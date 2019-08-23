# 建表
比如我们要开发一个系统参数的管理功能，该功能主要对系统相关参数进行增删该查。

~~建表语句如下：~~

```sql
CREATE TABLE `t_sys_cfg` (
  `id` bigint(64) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `cfg_name` varchar(100) DEFAULT NULL COMMENT '参数名',
  `cfg_value` varchar(3000) DEFAULT NULL COMMENT '参数值',
  `cfg_desc` varchar(200) DEFAULT NULL COMMENT '参数描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='系统参数';
```

**注意**

- 看到上面的 ~~建表语句如下：~~ 了么，知道为什么要划掉么？因为在使用本系统做开发的时候强烈建议不用自己建表，而是直接根据实体在系统启动的时候自动生成表。因为以后如果我们用代码生成工具的话，你要建个表，再写一遍实体类，不近工作做了两套，而且容易出现两别字段定义不一致的问题。
- 当然在生产环境，我个人是不建议开启Spring Boot的自动更新表结构功能的，还是自己手动建表比较稳妥。
