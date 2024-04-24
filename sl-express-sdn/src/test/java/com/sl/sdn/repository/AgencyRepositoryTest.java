package com.sl.sdn.repository;

import com.sl.sdn.entity.node.AgencyEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;

@SpringBootTest
class AgencyRepositoryTest {

    @Autowired
    private AgencyRepository agencyRepository;

    @Test
    void findByBid() {
        AgencyEntity agencyEntity = agencyRepository.findByBid(9001L);
        System.out.println(agencyEntity);
    }

    @Test
    void deleteByBid() {
        AgencyEntity agencyEntity = new AgencyEntity();
        agencyEntity.setBid(9001L);
        agencyEntity.setName("测试节点");
        agencyEntity.setPhone("122222222222");
        agencyEntity.setAddress("测试数据地址");

        agencyRepository.save(agencyEntity);
        System.out.println(agencyEntity);

    }

    @Test
    public void testUpdate() {
        AgencyEntity agencyEntity = agencyRepository.findByBid(9001L);
        agencyEntity.setName("测试节点1");

        agencyRepository.save(agencyEntity);
        System.out.println(agencyEntity);

    }

    @Test
    public void testDeleteByBid() {
        Long count = agencyRepository.deleteByBid(9001L);
        System.out.println(count);
    }


    @Test
    public void testFindAll() {
        List<AgencyEntity> list = agencyRepository.findAll();
        for (AgencyEntity agencyEntity : list) {
            System.out.println(agencyEntity);
        }
    }


    @Test
    public void testPage() {
        PageRequest pageRequest = PageRequest.of(1, 2, Sort.by(Sort.Direction.DESC, "bid"));
        Page<AgencyEntity> page = agencyRepository.findAll(pageRequest);
        page.getContent().forEach(System.out::println);
    }

}