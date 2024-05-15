package com.sl.transport.service.impl;

import com.sl.transport.entity.node.OLTEntity;
import com.sl.transport.repository.OLTRepository;
import com.sl.transport.service.OLTService;
import org.springframework.stereotype.Service;

@Service
public class OLTServiceImpl extends ServiceImpl<OLTRepository, OLTEntity> implements OLTService {
}
