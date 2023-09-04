package com.sl.ms.search;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.SuggestMode;
import co.elastic.clients.elasticsearch._types.query_dsl.Operator;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQueryField;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.sql.QueryResponse;
import co.elastic.clients.json.JsonData;
import com.sl.ms.search.entity.Person;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 复杂查询相关
 **/
@Slf4j
@SpringBootTest
class ComplexSearchTest {
    @Resource
    private ElasticsearchClient client;

    private static final String INDEX_NAME = "person";

    /**
     * term查询（传参为函数）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchTerm01() throws IOException {
        // 1.构造查询条件，并进行查询(此处search方法传参为lambda函数)
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .term(t -> t
                                        .field("name")
                                        .value("张三")))
                , Person.class);
        // 2.打印查询结果
        log.info(response.toString());
    }

    /**
     * term查询（传参为对象）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchTerm02() throws IOException {
        // 1.构造查询条件，并进行查询
        Query query = new Query.Builder().term(t -> t
                .field("name")
                .value("张三")).build();

        SearchRequest searchRequest = new SearchRequest.Builder()
                .index(INDEX_NAME)
                .query(query).build();

        // 此处search方法传参为SearchRequest对象
        SearchResponse<Person> response = client.search(searchRequest, Person.class);

        // 2.打印查询结果
        log.info(response.toString());
    }

    /**
     * terms查询（传参为函数）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchTerms01() throws IOException {
        // 1.构造查询条件，并进行查询
        List<FieldValue> values = new ArrayList<>();
        values.add(new FieldValue.Builder().stringValue("20").build());
        values.add(new FieldValue.Builder().stringValue("21").build());

        // 此处search方法传参为lambda函数
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .terms(t -> t
                                        .field("age")
                                        .terms(f -> f.value(values))))
                , Person.class);

        // 2.打印查询结果
        log.info(response.toString());
    }

    /**
     * terms查询（传参为对象）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchTerms02() throws IOException {
        // 1.构造查询条件，并进行查询
        List<FieldValue> values = new ArrayList<>();
        values.add(new FieldValue.Builder().stringValue("20").build());
        values.add(new FieldValue.Builder().stringValue("21").build());
        TermsQueryField termsQueryField = new TermsQueryField.Builder().value(values).build();

        Query query = new Query.Builder().terms(t -> t
                .field("age")
                .terms(termsQueryField)).build();

        SearchRequest searchRequest = new SearchRequest.Builder()
                .index(INDEX_NAME)
                .query(query).build();

        // 此处search方法传参为SearchRequest对象
        SearchResponse<Person> response = client.search(searchRequest, Person.class);

        // 2.打印查询结果
        log.info(response.toString());
    }

    /**
     * range查询（传参为函数）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchRange01() throws IOException {
        // 此处search方法传参为lambda函数
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .range(r -> r
                                        .field("age")
                                        .gte(JsonData.of("20"))
                                        .lt(JsonData.of("40"))))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * range查询（传参为对象）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchRange02() throws IOException {
        // 1.构造查询条件，并进行查询
        Query query = new Query.Builder().range(r -> r
                .field("age")
                .gte(JsonData.of("20"))
                .lt(JsonData.of("40"))).build();

        SearchRequest searchRequest = new SearchRequest.Builder()
                .index(INDEX_NAME)
                .query(query).build();

        // 此处search方法传参为SearchRequest对象
        SearchResponse<Person> response = client.search(searchRequest, Person.class);

        // 2.打印查询结果
        log.info(response.toString());
    }

    /**
     * match查询（传参为函数）
     * match 查询，对输入内容先分词再查询
     *
     * @throws IOException IO异常
     */
    @Test
    void searchMatch01() throws IOException {
        // 此处search方法传参为lambda函数
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .match(m -> m
                                        .field("address")
                                        .query("昌平区天通苑")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * match查询（传参为对象）
     * match 查询，对输入内容先分词再查询
     *
     * @throws IOException IO异常
     */
    @Test
    void searchMatch02() throws IOException {
        // 1.构造查询条件，并进行查询
        Query query = new Query.Builder().match(m -> m
                .field("address")
                .query("昌平区天通苑")).build();

        SearchRequest searchRequest = new SearchRequest.Builder()
                .index(INDEX_NAME)
                .query(query).build();

        // 此处search方法传参为SearchRequest对象
        SearchResponse<Person> response = client.search(searchRequest, Person.class);

        // 2.打印查询结果
        log.info(response.toString());
    }

    /**
     * multi_match查询（传参为函数）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchMultiMatch01() throws IOException {
        // 此处search方法传参为lambda函数
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .multiMatch(m -> m
                                        .fields("name", "address")
                                        .query("顺义")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * multi_match查询（传参为对象）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchMultiMatch02() throws IOException {
        // 1.构造查询条件，并进行查询
        Query query = new Query.Builder().multiMatch(m -> m
                .fields("name", "address")
                .query("顺义")).build();

        SearchRequest searchRequest = new SearchRequest.Builder()
                .index(INDEX_NAME)
                .query(query).build();

        // 此处search方法传参为SearchRequest对象
        SearchResponse<Person> response = client.search(searchRequest, Person.class);

        // 2.打印查询结果
        log.info(response.toString());
    }

    /**
     * matchPhrase查询（传参为函数）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchMatchPhrase01() throws IOException {
        // 此处search方法传参为lambda函数
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .matchPhrase(m -> m
                                        .field("address")
                                        .query("金燕龙")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * matchPhrase查询（传参为对象）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchMatchPhrase02() throws IOException {
        // 1.构造查询条件，并进行查询
        Query query = new Query.Builder().matchPhrase(m -> m
                .field("address")
                .query("金燕龙")).build();

        SearchRequest searchRequest = new SearchRequest.Builder()
                .index(INDEX_NAME)
                .query(query).build();

        // 此处search方法传参为SearchRequest对象
        SearchResponse<Person> response = client.search(searchRequest, Person.class);

        // 2.打印查询结果
        log.info(response.toString());
    }

    /**
     * match_all 查询（传参为函数）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchMatchAll01() throws IOException {
        // 此处search方法传参为lambda函数
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .matchAll(m -> m))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * match_all 查询（传参为对象）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchMatchAll02() throws IOException {
        // 1.构造查询条件，并进行查询
        Query query = new Query.Builder().matchAll(m -> m).build();

        SearchRequest searchRequest = new SearchRequest.Builder()
                .index(INDEX_NAME)
                .query(query).build();

        // 此处search方法传参为SearchRequest对象
        SearchResponse<Person> response = client.search(searchRequest, Person.class);

        // 2.打印查询结果
        log.info(response.toString());
    }

    /**
     * query_string查询（等同于match）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchQueryString01() throws IOException {
        // 类似 match
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .queryString(qs -> qs
                                        .defaultField("address")
                                        .query("昌平区天通苑")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * query_string查询（等同于match_phrase）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchQueryString02() throws IOException {
        // 类似 match_phrase
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .queryString(qs -> qs
                                        .defaultField("address")
                                        .query("\"昌平区天通苑\"")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * query_string查询（运算符查询）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchQueryString03() throws IOException {
        // 带运算符查询，运算符两边的词不再分词
        // 查询同时包含 ”昌平区“ 和 ”金燕龙“ 的文档
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .queryString(qs -> qs
                                        .fields("address")
                                        // 如果不写 AND ，之间是空格，默认是OR
                                        .query("昌平区 AND 天通苑")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * query_string查询（同上一个）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchQueryString04() throws IOException {
        // 查询同时包含 ”昌平区“ 和 ”金燕龙“ 的文档
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .queryString(qs -> qs
                                        .fields("address")
                                        .query("昌平区 金燕龙")
                                        .defaultOperator(Operator.And)))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * query_string查询（复合运用）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchQueryString05() throws IOException {
        // 查询 name 或 address 字段包含"昌平区"和"金燕龙"这两个单词，或者包含"李四"这个单词的文档。
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .queryString(qs -> qs
                                        .fields("name", "address")
                                        .query("(昌平区 AND 金燕龙) OR 李四")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * simple_query_string 查询
     * <p>
     * 类似 query_string，主要区别如下：<p>
     * 1、不支持AND OR NOT ，会当做字符处理<p>
     * 2、使用 + 代替 AND，| 代替OR，- 代替 NOT<p>
     * 3、term之间默认关系为OR<p>
     * 4、会忽略错误的语法
     *
     * @throws IOException IO异常
     */
    @Test
    void searchSimpleQueryString() throws IOException {
        // 查询同时包含 ”昌平区“ 和 ”金燕龙“ 的文档
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .simpleQueryString(sqs -> sqs
                                        .fields("address")
                                        .query("昌平区 AND 天通苑")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * 模糊查询(使用match)
     *
     * @throws IOException IO查询
     */
    @Test
    void searchFuzzy01() throws IOException {
        // 全文查询时使用模糊参数，先分词再计算模糊选项。
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .match(m -> m
                                        .field("address")
                                        // 中英文的分词不一样，尽量用英文测试
                                        .query("Pennsylvania Avenue NN")
                                        .fuzziness("1")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * 模糊查询（使用fuzzy）
     *
     * @throws IOException IO查询
     */
    @Test
    void searchFuzzy02() throws IOException {
        // 使用 fuzzy query，对输入不分词，直接计算模糊选项。
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .fuzzy(f -> f
                                        .field("name")
                                        .value("Joa Biden")
                                        .fuzziness("1")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * 组合查询(must)
     *
     * @throws IOException IO异常
     */
    @Test
    void searchBool() throws IOException {
        // 查询 name 包含 “张三” 且 age 在 [16-40] 之间的文档
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .bool(b -> b
                                        .must(q1 -> q1
                                                .match(m -> m
                                                        .field("name")
                                                        .query("张三"))
                                        )
                                        .must(q2 -> q2
                                                .range(r -> r
                                                        .field("age")
                                                        .gte(JsonData.of("16"))
                                                        .lte(JsonData.of("40")))
                                        )
                                )
                        )
                , Person.class);
        log.info(response.toString());
    }

    /**
     * 组合查询(filter)
     *
     * @throws IOException IO异常
     */
    @Test
    void searchFilter() throws IOException {
        // 过滤出 name 包含 “张三” 且 age 在 [16-40] 之间的文档，不计算得分
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .bool(b -> b
                                        .filter(q1 -> q1
                                                .match(m -> m
                                                        .field("name")
                                                        .query("张三"))
                                        )
                                        .filter(q2 -> q2
                                                .range(r -> r
                                                        .field("age")
                                                        .gte(JsonData.of("16"))
                                                        .lte(JsonData.of("40")))
                                        )
                                )
                        )
                , Person.class);
        log.info(response.toString());
    }

    /**
     * 聚合查询（求和）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchAggs01() throws IOException {
        // 求和
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .aggregations("age_sum", a -> a
                                .sum(sa -> sa
                                        .field("age")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * 聚合查询（distinct计数）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchAggs02() throws IOException {
        // 类似 select count distinct(age) from person
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .aggregations("age_count", a -> a
                                .cardinality(ca -> ca.field("age")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * 聚合查询（统计）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchAggs03() throws IOException {
        // 数量、最大、最小、平均、求和
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .aggregations("age_stats", a -> a
                                .stats(sa -> sa
                                        .field("age")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * 聚合查询（group统计）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchAggs04() throws IOException {
        // select name,count(*) from person group by name
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .aggregations("name_terms", a -> a
                                .terms(ta -> ta
                                        .field("name")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * 聚合查询（嵌套计数）
     *
     * @throws IOException IO异常
     */
    @Test
    void searchAggs05() throws IOException {
        // select name,age,count(*) from person group by name,age
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .aggregations("name_terms", a -> a
                                .terms(ta -> ta
                                        .field("name")
                                )
                                .aggregations("age_terms", a1 -> a1
                                        .terms(ta1 -> ta1
                                                .field("age")
                                        ))
                        )
                , Person.class);
        log.info(response.toString());
    }

    /**
     * 复杂聚合查询
     *
     * @throws IOException IO异常
     */
    @Test
    void searchAggs06() throws IOException {
        // 类似 select avg(age) from person where name='李四'
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .bool(b -> b
                                        .filter(q1 -> q1
                                                .term(t -> t
                                                        .field("name")
                                                        .value("李四")))))
                        .aggregations("ave_age", a -> a
                                .avg(aa -> aa.field("age")))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * 推荐搜索
     * 注意：该测试会报 JsonpMappingException 错误，该bug官方会在8.4.1版本修复
     *
     * @throws IOException IO异常
     */
    @Test
    void searchSuggest() throws IOException {
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .suggest(suggest -> suggest
                                .suggesters("address_suggest", fs -> fs
                                        .text("金燕龙")
                                        .term(ts -> ts
                                                .field("address")
                                                .suggestMode(SuggestMode.Always)
                                                .minWordLength(2)
                                        )
                                )
                        )
                , Person.class);
        log.info(response.toString());
    }

    /**
     * 高亮显示
     *
     * @throws IOException IO异常
     */
    @Test
    void searchHighlight() throws IOException {
        SearchResponse<Person> response = client.search(s -> s
                        .index(INDEX_NAME)
                        .query(q -> q
                                .match(m -> m
                                        .field("address")
                                        .query("昌平区")))
                        .highlight(h -> h
                                .preTags("<span color='red'>")
                                .postTags("</span>")
                                .fields("address", hf -> hf))
                , Person.class);
        log.info(response.toString());
    }

    /**
     * SQL 查询
     * 注意：该测试会报 JsonpMappingException 错误，该bug官方会在8.4.1版本修复
     *
     * @throws IOException IO异常
     */
    @Test
    void searchSql() throws IOException {
        QueryResponse response = client.sql().query(q -> q
                .format("json")
                .query("SELECT * FROM \"" + INDEX_NAME + "\" limit 3"));
        log.info(response.toString());
    }
}
