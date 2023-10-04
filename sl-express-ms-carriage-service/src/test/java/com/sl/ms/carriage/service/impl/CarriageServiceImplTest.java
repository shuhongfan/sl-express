package com.sl.ms.carriage.service.impl;

import com.sl.ms.carriage.domain.dto.CarriageDTO;
import com.sl.ms.carriage.domain.dto.WaybillDTO;
import com.sl.ms.carriage.service.CarriageService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CarriageServiceImplTest {

    @Resource
    private CarriageService carriageService;

    @Test
    void saveOrUpdate() {
    }

    @Test
    void findAll() {
        List<CarriageDTO> all = carriageService.findAll();
        all.forEach(System.out::println);
    }

    @Test
    void compute() {
        WaybillDTO waybillDTO = new WaybillDTO();
        waybillDTO.setReceiverCityId(161793L); //上海
        waybillDTO.setSenderCityId(2L); //北京
        waybillDTO.setWeight(0.8); //重量
        waybillDTO.setVolume(1); //体积

        CarriageDTO compute = this.carriageService.compute(waybillDTO);
        System.out.println(compute);
    }

    @Test
    void findByTemplateType() {
    }
}