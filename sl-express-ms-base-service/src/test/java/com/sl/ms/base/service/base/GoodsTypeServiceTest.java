package com.sl.ms.base.service.base;

import com.sl.ms.base.entity.base.GoodsTypeEntity;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.List;

@SpringBootTest
public class GoodsTypeServiceTest {

    @Resource
    private GoodsTypeService goodsTypeService;

    @Test
    public void findByPage() {
    }

    @Test
    public void findAll() {
        List<GoodsTypeEntity> all = this.goodsTypeService.findAll();
        for (GoodsTypeEntity goodsTypeEntity : all) {
            System.out.println(goodsTypeEntity);
        }
    }

    @Test
    public void testFindAll() {
    }
}