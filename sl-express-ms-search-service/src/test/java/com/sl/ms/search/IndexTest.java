package com.sl.ms.search;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.indices.CreateIndexResponse;
import co.elastic.clients.elasticsearch.indices.DeleteIndexResponse;
import co.elastic.clients.elasticsearch.indices.GetIndexResponse;
import co.elastic.clients.elasticsearch.indices.PutMappingResponse;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.io.IOException;


/**
 * ES索引相关测试
 **/
@Slf4j
@SpringBootTest
class IndexTest {
    @Resource
    private ElasticsearchClient client;

    private static final String INDEX_NAME = "person";

    /**
     * 创建索引
     *
     * @throws IOException IO异常
     */
    @Test
    void createIndex() throws IOException {
        CreateIndexResponse response = client.indices().create(builder -> builder
                // 设置索引分片：number_of_shards：主分片数，默认为1；number_of_replicas：副本分片数，默认为1
                // 合理设置索引分片可以提高ES的查询性能
                .settings(indexSettingsBuilder -> indexSettingsBuilder.numberOfReplicas("1").numberOfShards("2"))
                .mappings(typeMappingBuilder -> typeMappingBuilder
                        .properties("age", propertyBuilder -> propertyBuilder.integer(integerNumberPropertyBuilder -> integerNumberPropertyBuilder))
                        .properties("name", propertyBuilder -> propertyBuilder.keyword(keywordPropertyBuilder -> keywordPropertyBuilder))
                        .properties("phone", propertyBuilder -> propertyBuilder.text(textPropertyBuilder -> textPropertyBuilder.analyzer("whitespace").searchAnalyzer("whitespace")))
                        .properties("address", propertyBuilder -> propertyBuilder.text(textPropertyBuilder -> textPropertyBuilder.analyzer("ik_max_word").searchAnalyzer("ik_max_word")))
                )
                .index(INDEX_NAME));
        log.info("索引创建是否成功：{}", response.acknowledged());
    }

    /**
     * 修改 _mapping 信息
     * 字段可以新增，已有的字段只能修改字段的 search_analyzer 属性。
     *
     * @throws IOException IO异常
     */
    @Test
    void modifyIndex() throws IOException {
        PutMappingResponse response = client.indices().putMapping(typeMappingBuilder -> typeMappingBuilder
                .index(INDEX_NAME)
                // 已有字段和之前一样，则不变
                .properties("age", propertyBuilder -> propertyBuilder.integer(integerNumberPropertyBuilder -> integerNumberPropertyBuilder))
                // 已有字段修改search_analyzer属性
                .properties("address", propertyBuilder -> propertyBuilder.text(textPropertyBuilder -> textPropertyBuilder.analyzer("ik_max_word").searchAnalyzer("ik_smart")))
                // 新增字段
                .properties("sex", propertyBuilder -> propertyBuilder.integer(integerNumberPropertyBuilder -> integerNumberPropertyBuilder))
        );
        log.info("修改索引是否成功：{}", response.acknowledged());
    }

    /**
     * 删除索引
     *
     * @throws IOException IO异常
     */
    @Test
    void deleteIndex() throws IOException {
        DeleteIndexResponse response = client.indices().delete(builder -> builder.index(INDEX_NAME));
        log.info("删除索引是否成功：{}", response.acknowledged());
    }

    /**
     * 查询索引列表
     *
     * @throws IOException IO异常
     */
    @Test
    void getIndex() throws IOException {
        // 此处使用 * 也可以
        // 同时需要注意，在反序列化时某些索引的属性无法识别，该方法可能会执行失败
        GetIndexResponse response = client.indices().get(builder -> builder.index("_all"));
        log.info(response.result().toString());
    }

    /**
     * 查询索引是否存在
     *
     * @throws IOException IO异常
     */
    @Test
    void existsIndex() throws IOException {
        boolean exists = client.indices().exists(e -> e.index(INDEX_NAME)).value();
        log.info("person索引是否存在：{}", exists);
    }

    /**
     * 查询索引详情
     *
     * @throws IOException IO异常
     */
    @Test
    void getIndexDetail() throws IOException {
        // 该方法需要查询ES中存在的索引，否则会报错
        GetIndexResponse response = client.indices().get(builder -> builder.index(INDEX_NAME));
        log.info(response.result().toString());
    }
}
