package com.sl.ms.search;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.*;
import co.elastic.clients.elasticsearch.core.bulk.BulkResponseItem;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.elasticsearch.core.search.TotalHits;
import co.elastic.clients.elasticsearch.core.search.TotalHitsRelation;
import com.sl.SearchApplication;
import com.sl.ms.search.entity.Person;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * ES文档相关测试
 **/
@Slf4j
@SpringBootTest(classes = SearchApplication.class)
class DocumentTest {
    @Resource
    private ElasticsearchClient client;

    private static final String INDEX_NAME = "person";

    /**
     * 新增或更新文档(传参为函数)
     * 注意：这里的更新是全量更新，原来没有的字段会增加，没有数据的字段会删掉
     *
     * @throws IOException IO异常
     */
    @Test
    void createOrUpdateDoc01() throws IOException {
        // 1.构造对象
        Person person = new Person(18, "张三", "18912345678", "北京市昌平区西三旗街道金燕龙办公楼");

        // 2.新增或更新文档数据（构造函数，使用lambda表达式形式）
        IndexResponse response = client.index(i -> i
                .index(INDEX_NAME)
                .id("1")
                // 此处传参也可以是map
                .document(person));

        // 3.version为1表示新增，大于1表示更新
        log.info("Indexed with version " + response.version());
    }

    /**
     * 新增或更新文档(传参为对象)
     * 注意：这里的更新是全量更新，原来没有的字段会增加，没有数据的字段会删掉
     *
     * @throws IOException IO异常
     */
    @Test
    void createOrUpdateDoc02() throws IOException {
        // 1.构造对象
        Person person = new Person(18, "张三", "18912345678", "北京市昌平区西三旗街道金燕龙办公楼");

        // 2.使用DSL语法创建对象，进行新增或更新
        IndexRequest<Person> request = IndexRequest.of(i -> i
                .index(INDEX_NAME)
                .id("2")
                // 此处传参也可以是map
                .document(person));
        IndexResponse response = client.index(request);

        // 3.version为1表示新增，大于1表示更新
        log.info("Indexed with version " + response.version());
    }

    /**
     * 新增文档（使用对象）
     *
     * @throws IOException IO异常
     */
    @Test
    void createDoc01() throws IOException {
        // 1.构造对象
        Person person = new Person(18, "张三", "18912345678", "北京市昌平区西三旗街道金燕龙办公楼");

        // 2.新增文档数据（若重复新增则会报错，错误码409）
        CreateResponse response = client.create(c -> c
                .index(INDEX_NAME)
                .id("3")
                .document(person));

        // 3.响应结果
        log.info(response.toString());
    }

    /**
     * 新增文档（使用map）
     *
     * @throws IOException IO异常
     */
    @Test
    void createDoc02() throws IOException {
        // 1.数据封装到map
        Map<String, Object> doc = new HashMap<>();
        doc.put("age", 78);
        doc.put("name", "Joe Biden");
        doc.put("phone", "1-202-456-1414");
        doc.put("address", "1600 Pennsylvania Avenue NW, Washington, DC 20500");

        // 2.新增文档数据（若重复新增则会报错，错误码409）
        CreateResponse response = client.create(c -> c
                .index(INDEX_NAME)
                .id("4")
                .document(doc));

        // 3.响应结果
        log.info(response.toString());
    }

    /**
     * 批量新增
     *
     * @throws IOException IO异常
     */
    @Test
    void bulkCreateDoc() throws IOException {
        // 1.构造数据
        List<Person> personList = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Person person = new Person(18 + i, "李四", "18912345678", "北京市顺义区京顺路99号");
            personList.add(person);
        }

        // 2.循环添加新增操作
        int i = 5;
        BulkRequest.Builder br = new BulkRequest.Builder();
        for (Person person : personList) {
            String id = String.valueOf(i++);
            br.operations(op -> op.index(idx -> idx
                    .index(INDEX_NAME)
                    .id(id)
                    .document(person)));
        }

        // 3.批量新增
        BulkResponse result = client.bulk(br.build());

        // 4.如果出现错误，输出所有错误信息
        if (result.errors()) {
            log.error("Bulk had errors");
            for (BulkResponseItem item : result.items()) {
                if (item.error() != null) {
                    log.error(item.error().reason());
                }
            }
        }
    }

    /**
     * 更新文档（使用对象，增量更新）
     *
     * @throws IOException IO异常
     */
    @Test
    void updateDoc01() throws IOException {
        // 1.构造数据（传入为null的字段不会更新）
        Person person = new Person(20, null, null, null);

        // 2.数据更新
        UpdateResponse<Person> response = client.update(u -> u
                        .index(INDEX_NAME)
                        .id("1")
                        .doc(person)
                , Person.class);

        // 3.响应结果
        log.info(response.toString());
    }

    /**
     * 更新文档（使用map，增量更新）
     *
     * @throws IOException IO异常
     */
    @Test
    void updateDoc02() throws IOException {
        // 1.构造数据（sex是原来不存在的字段，该方法会新增这个字段）
        Map<String, Object> doc = new HashMap<>();
        doc.put("age", 33);
        doc.put("sex", "男");

        // 2.数据更新
        UpdateResponse response = client.update(builder -> builder
                        .index(INDEX_NAME)
                        .id("1")
                        .doc(doc)
                , Map.class);

        // 3.响应结果
        log.info(response.toString());
    }

    /**
     * 删除文档
     *
     * @throws IOException IO异常
     */
    @Test
    void deleteDoc() throws IOException {
        DeleteResponse response = client.delete(d -> d
                .index(INDEX_NAME)
                .id("1"));
        log.info(response.toString());
    }

    /**
     * 条件删除文档（传参为函数）
     *
     * @throws IOException IO异常
     */
    @Test
    void deleteByQueryDoc01() throws IOException {
        // deleteByQuery方法传参为lambda函数
        DeleteByQueryResponse response = client.deleteByQuery(d -> d.index(INDEX_NAME)
                .query(q -> q
                        .match(m -> m
                                .field("age")
                                .query("20"))));
        log.info(response.toString());
    }

    /**
     * 条件删除文档（传参为对象）
     *
     * @throws IOException IO异常
     */
    @Test
    void deleteByQueryDoc02() throws IOException {
        // 构造删除条件
        Query query = new Query.Builder().match(m -> m
                .field("age")
                .query("20")).build();

        DeleteByQueryRequest searchRequest = new DeleteByQueryRequest.Builder()
                .index(INDEX_NAME)
                .query(query).build();

        // 此处search方法传参为DeleteByQueryRequest对象
        DeleteByQueryResponse response = client.deleteByQuery(searchRequest);
        log.info(response.toString());
    }

    /**
     * 查询所有文档（用对象接收）
     *
     * @throws IOException IO异常
     */
    @Test
    void getDocAll01() throws IOException {
        SearchResponse<Person> response = client.search(s -> s.index(INDEX_NAME), Person.class);
        log.info(response.toString());
    }

    /**
     * 查询所有文档（用map接收）
     *
     * @throws IOException IO异常
     */
    @Test
    void getDocAll02() throws IOException {
        SearchResponse<Map> response = client.search(s -> s.index(INDEX_NAME), Map.class);
        log.info(response.toString());
    }

    /**
     * 查询单个文档(使用对象接收)
     *
     * @throws IOException IO异常
     */
    @Test
    void getDoc01() throws IOException {
        // 1.查询id为2的文档
        GetResponse<Person> response = client.get(g -> g.index(INDEX_NAME).id("2"), Person.class);

        // 2.判断响应数据是否为空
        if (response.found()) {
            Person person = response.source();
            assert person != null;
            log.info("Person name " + person.getName());
        } else {
            log.info("Person not found");
        }
    }

    /**
     * 查询单个文档(使用map接收)
     *
     * @throws IOException IO异常
     */
    @Test
    void getDoc02() throws IOException {
        // 1.查询id为2的文档
        GetResponse<Map> response = client.get(g -> g.index(INDEX_NAME).id("2"), Map.class);

        // 2.判断响应数据是否为空
        if (response.found()) {
            Map person = response.source();
            assert person != null;
            log.info("Person name " + person.get("name"));
        } else {
            log.info("Person not found");
        }
    }

    /**
     * 简单查询(传入函数)
     *
     * @throws IOException IO异常
     */
    @Test
    void simpleSearch01() throws IOException {
        // 1.构造查询条件，并进行查询(此处search方法传参为lambda函数)
        SearchResponse<Person> response = client.search(s -> s.index(INDEX_NAME)
                        .query(q -> q
                                .match(m -> m
                                        .field("name")
                                        .query("张三")))
                , Person.class);

        // 2.查询结果数量
        TotalHits total = response.hits().total();
        assert total != null;
        // 默认情况下，hits.total.value是不确切的命中计数，
        // 在这种情况下，当hits.total.relation的值是eq时，hits.total.value的值是准确计数。
        // 当hits.total.relation的值是gte时，hits.total.value的值是不准确的。
        boolean isExactResult = total.relation() == TotalHitsRelation.Eq;

        if (isExactResult) {
            log.info("There are " + total.value() + " results");
        } else {
            log.info("There are more than " + total.value() + " results");
        }

        // 3.解析hit结构，输出全部结果
        List<Hit<Person>> hits = response.hits().hits();
        for (Hit<Person> hit : hits) {
            Person person = hit.source();
            assert person != null;
            log.info("Found person " + person.getName() + ", score " + hit.score());
        }
    }

    /**
     * 简单查询（传入对象）
     *
     * @throws IOException IO异常
     */
    @Test
    void simpleSearch02() throws IOException {
        // 1.构造查询条件，并进行查询
        Query query = new Query.Builder().match(m -> m
                .field("name")
                .query("张三")).build();

        SearchRequest searchRequest = new SearchRequest.Builder()
                .index(INDEX_NAME)
                .query(query).build();

        // 此处search方法传参为SearchRequest对象
        SearchResponse<Person> response = client.search(searchRequest, Person.class);

        // 2.查询结果数量
        TotalHits total = response.hits().total();
        assert total != null;
        // 默认情况下，hits.total.value是不确切的命中计数，
        // 在这种情况下，当hits.total.relation的值是eq时，hits.total.value的值是准确计数。
        // 当hits.total.relation的值是gte时，hits.total.value的值是不准确的。
        boolean isExactResult = total.relation() == TotalHitsRelation.Eq;

        if (isExactResult) {
            log.info("There are " + total.value() + " results");
        } else {
            log.info("There are more than " + total.value() + " results");
        }

        // 3.解析hit结构，输出全部结果
        List<Hit<Person>> hits = response.hits().hits();
        for (Hit<Person> hit : hits) {
            Person person = hit.source();
            assert person != null;
            log.info("Found person " + person.getName() + ", score " + hit.score());
        }
    }

}
