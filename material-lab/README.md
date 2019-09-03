# material-lab
该模块包含一些实验特性的模块，主要探索spring boot的各种功能

## 集成actuator监控
- 使用actuator可以方便的对spring boot应用做监控
- 本引用之前的ehcache-core版本过低，需要升级：
    ```javascript
     <dependency>
        <groupId>net.sf.ehcache</groupId>
        <artifactId>ehcache-core</artifactId>
        <version>2.6.11</version>
      </dependency>
    调整为：
      <dependency>
          <groupId>net.sf.ehcache.internal</groupId>
          <artifactId>ehcache-core</artifactId>
          <version>2.10.5</version>
       </dependency>
    ```
- 启用该功能后 访问http://localhost:8000/actuator/env