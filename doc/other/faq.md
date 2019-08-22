# 常见问题

## 本地开发正常，打包运行的时候提交中文内容乱码，检查了数据库编码也没问题？

打包为jar包运行的时候可以指定运行时编码为UTF8：
```
java -Dfile.encoding=utf-8 -jar xxxxxxx.jar
```

## 使用代码生成器的时候总是报找不到Generator类或者找不到code.json配置文件

下载项目后首先mvn package 保证项目能构建并打包成功再使用代码生成器

