package com.sl.sdn.repository.impl;

import com.sl.sdn.dto.OrganDTO;
import com.sl.sdn.repository.OrganRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class OrganRepositoryImplTest {

    @Autowired
    private OrganRepository organRepository;

    @Test
    void findByBid() {
        OrganDTO byBid = organRepository.findByBid(100280L);
        System.out.println(byBid);
    }

    @Test
    void findAll() {
        List<OrganDTO> organRepositoryAll = organRepository.findAll("北京");
        System.out.println(organRepositoryAll);
    }
}