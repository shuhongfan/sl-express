package com.sl.ms.web.courier.service;

import com.sl.ms.web.courier.vo.area.AreaSimpleVO;

import java.util.List;

public interface AreaService {
    List<AreaSimpleVO> findChildrenAreaByParentId(Long parentId);
}
