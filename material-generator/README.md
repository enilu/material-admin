English | [简体中文](./README.zh-CN.md)

# Code generation

## Useage
- Add dependencies in material-core/pom.xml
```xml
        <dependency>
            <groupId>cn.enilu</groupId>
            <artifactId>material-generator</artifactId>
            <version>${project.version}</version>
            <scope>provided</scope>
        </dependency>
```
- Download the IDEA Intellij plugin: Search and install the plugin in the plugin center: 'webflash-generator'

- Prepare an entity class,E.g:
```java
package cn.enilu.material.bean.entity.test;
import cn.enilu.material.bean.entity.BaseEntity;
import lombok.Data;
import org.hibernate.annotations.Table;
import javax.persistence.Column;
import javax.persistence.Entity;
 
@Entity(name="t_test_boy")
@Table(appliesTo = "t_test_boy",comment = "男孩")
@Data

public class Boy extends BaseEntity {
    @Column(columnDefinition = "VARCHAR(32) COMMENT '姓名'")
    private String userName;
    @Column(columnDefinition = "INT COMMENT '年龄'")
    private Integer age;
    @Column(columnDefinition = "VARCHAR(12) COMMENT '生日'")
    private String birthday;
    @Column(name = "has_girl_friend",columnDefinition = "TINYINT COMMENT '是否有女朋友'")
    private Boolean hasGirFriend;
}

``` 
- Precautions:
    - @Table: Use @org.hibernate.annotations.Table don't use @javax.persistence.Table
    - @Table annotations must be configured with the table name (applyiesTo) and comments (comment)
    - @Column annotations must be configured with columnDefinition to describe column information (all uppercase in English): include type, comment
    - Entity classes must inherit BaseEntity
- After the entity class is ready, open the entity class, right click on "Generator"-->"web-flash-mvc", and the following content will pop up.
![code-generator](./doc/code-generate.jpg)    
**Note**No need to change the configuration in the dialog (most of them have no effect)
- After running the generated code, it will generate the controller, service, repository, and add and delete the change page and js. Take the example of Boy, the generated code is as follows:
![generate-result](./doc/generate-result.png)
- After the code is generated, configure menus and permissions in the system
![菜单配置](./doc/menu.png)

![功能预览](./doc/boy-list.png)

