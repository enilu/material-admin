package cn.enilu.material.dao;

import cn.enilu.material.bean.vo.query.SearchFilter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 封装基础的dao接口
 *
 * @author ：enilu
 * @date ：Created in 2019/6/29 12:50
 */
@NoRepositoryBean
public interface BaseRepository<T, ID extends Serializable> extends JpaRepository<T, ID>
        , PagingAndSortingRepository<T, ID>
        , JpaSpecificationExecutor<T> {
    List<Map> queryBySql(String sql);
    List<Map> queryBySql(String sql, List<SearchFilter> filter);
    List<T> query(String sql);
    Object getBySql(String sql);
    T get(String sql);
    int execute(String sql);
    Class<T> getDataClass();

}
