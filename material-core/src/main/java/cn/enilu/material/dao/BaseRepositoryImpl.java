package cn.enilu.material.dao;

import cn.enilu.material.bean.vo.query.SearchFilter;
import org.hibernate.SQLQuery;
import org.hibernate.query.internal.NativeQueryImpl;
import org.hibernate.transform.Transformers;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 基础dao实现类
 *
 * @author ：enilu
 * @date ：Created in 2019/6/29 12:53
 */
public class BaseRepositoryImpl<T, ID extends Serializable>
        extends SimpleJpaRepository<T, ID>
        implements BaseRepository<T, ID> {
    private final EntityManager entityManager;
    private Class<T> klass;


    BaseRepositoryImpl(JpaEntityInformation<T, ID> entityInformation,
                       EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityManager = entityManager;
        this.klass = (Class<T>) entityInformation.getJavaType();
    }

    @Override
    public List<Map> queryBySql(String sql) {
        return queryBySql(sql,null);
    }

    @Override
    public List<Map> queryBySql(String sql, List<SearchFilter> filters) {
            Query query = entityManager.createNativeQuery(sql);
        query.unwrap(NativeQueryImpl.class)
                .setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        if(filters!=null&&!filters.isEmpty()) {
            for (SearchFilter filter : filters) {
                query.setParameter(filter.fieldName, filter.value);
            }
        }

        List list = query.getResultList();
        return list;
    }

    @Override
    public Object getBySql(String sql) {
        List list = entityManager.createNativeQuery(sql).getResultList();
        if(list.isEmpty()){
            return null;
        }
        return list.get(0);
    }

    @Override
    public T get(String sql) {
        List<T> list =  entityManager.createNativeQuery(sql,klass).getResultList();
        return list.get(0);
    }

    @Override
    public int execute(String sql) {
        return entityManager.createNativeQuery(sql).executeUpdate();
    }

    @Override
    public Class<T> getDataClass() {
        return klass;
    }

    @Override
    public List<T> query(String sql) {
        return entityManager.createNativeQuery(sql,klass).getResultList();
    }
}
