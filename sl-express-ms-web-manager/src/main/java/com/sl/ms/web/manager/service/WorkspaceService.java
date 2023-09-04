package com.sl.ms.web.manager.service;

import com.sl.ms.web.manager.vo.workspace.MonthlyOrderAddVO;
import com.sl.ms.web.manager.vo.workspace.WorkbenchAddVO;
import com.sl.ms.web.manager.vo.workspace.WorkbenchVO;

import java.util.List;

/**
 * 工作台服务
 */
public interface WorkspaceService {
    /**
     * 新增数据
     *
     * @param workbenchVO 工作台
     */
    void saveWorkbench(WorkbenchAddVO workbenchVO);

    /**
     * 新增订单总量数据
     *
     * @param monthlyOrderList 月度订单数据
     */
    void saveOrderNumber(List<MonthlyOrderAddVO> monthlyOrderList);

    /**
     * 查询一条数据
     *
     * @return 工作台数据
     */
    WorkbenchVO findOne();

    /**
     * 删除所有
     */
    void deleteAll();
}
