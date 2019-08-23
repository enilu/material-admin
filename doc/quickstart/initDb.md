# 初始化数据

本系统使用mysql数据库：

- 在mysql中创建数据库 material

```sql
CREATE DATABASE IF NOT EXISTS material DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

```
- 启动项目系统会自动建表并初始化数据。