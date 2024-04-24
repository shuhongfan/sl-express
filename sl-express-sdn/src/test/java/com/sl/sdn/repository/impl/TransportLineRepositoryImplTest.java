package com.sl.sdn.repository.impl;

import com.sl.sdn.dto.TransportLineNodeDTO;
import com.sl.sdn.entity.node.AgencyEntity;
import com.sl.sdn.repository.TransportLineRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TransportLineRepositoryImplTest {

    @Autowired
    private TransportLineRepository transportLineRepository;

    @Test
    void findShortTestPath() {
        AgencyEntity start = AgencyEntity.builder().bid(100280L).build();
        AgencyEntity end = AgencyEntity.builder().bid(210057L).build();

        TransportLineNodeDTO shortTestPath = transportLineRepository.findShortTestPath(start, end);
        System.out.println(shortTestPath);
    }
}