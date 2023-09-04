package com.sl.ms.base.service.base.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.constant.WorkConstants;
import com.sl.ms.base.domain.base.WorkPatternAddDTO;
import com.sl.ms.base.domain.base.WorkPatternDTO;
import com.sl.ms.base.domain.base.WorkPatternQueryDTO;
import com.sl.ms.base.domain.base.WorkPatternUpdateDTO;
import com.sl.ms.base.domain.enums.WorkPatternEnum;
import com.sl.ms.base.entity.base.WorkPatternEntity;
import com.sl.ms.base.entity.base.WorkSchedulingEntity;
import com.sl.ms.base.mapper.base.WorkPatternMapper;
import com.sl.ms.base.service.base.WorkPatternService;
import com.sl.ms.base.service.base.WorkSchedulingService;
import com.sl.ms.base.utils.WorkPatternUtils;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.BeanUtil;
import com.sl.transport.common.util.PageResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 工作模式服务
 */
@Slf4j
@Service
public class WorkPatternServiceImpl extends ServiceImpl<WorkPatternMapper, WorkPatternEntity> implements WorkPatternService {

    @Resource
    private WorkSchedulingService workSchedulingService;

    /**
     * 分页查询工作模式
     *
     * @param workPatternQueryDTO 查询条件
     * @return 工作模式数据
     */
    @Override
    public PageResponse<WorkPatternDTO> page(WorkPatternQueryDTO workPatternQueryDTO) {
        WorkPatternMapper workPatternMapper = getBaseMapper();

        LambdaQueryWrapper<WorkPatternEntity> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(WorkPatternEntity::getIsDelete, 0);
        queryWrapper.orderByDesc(WorkPatternEntity::getCreated);
        Page<WorkPatternEntity> page = new Page<>(workPatternQueryDTO.getPage(), workPatternQueryDTO.getPageSize());

        IPage<WorkPatternEntity> iPage = workPatternMapper.selectPage(page, queryWrapper);

        return PageResponse.of(iPage, WorkPatternDTO.class, (entity, workPatternDTO) -> {
            workPatternDTO.setWorkDate(WorkPatternUtils.toWorkDate(entity));
            workPatternDTO.setWorkPatternTypeDesc(WorkPatternEnum.desc(entity.getWorkPatternType()));
        });

    }

    /**
     * 工作模式ID查询
     *
     * @param id 工作模式ID
     * @return 工作模式
     */
    @Override
    public WorkPatternDTO findById(Long id) {
        WorkPatternEntity workPatternEntity = getBaseMapper().selectById(id);
        return BeanUtil.toBean(workPatternEntity, WorkPatternDTO.class, (entity, workPatternDTO) -> {
            workPatternDTO.setWorkDate(WorkPatternUtils.toWorkDate(entity));
            workPatternDTO.setWorkPatternTypeDesc(WorkPatternEnum.desc(entity.getWorkPatternType()));
        });
    }

    /**
     * 删除工作模式
     *
     * @param id 工作模式ID
     */
    @Override
    @Transactional(rollbackFor = {SLException.class, Exception.class})
    public void delete(long id) {

        // 删除限制
        long count = workSchedulingService.count(Wrappers.<WorkSchedulingEntity>lambdaQuery().eq(WorkSchedulingEntity::getWorkPatternId, id));
        if (count > 0) {
            throw new SLException("改工作模式下有排班，请先把排班修改为其他工作模式后删除");
        }
        int number = getBaseMapper().deleteById(id);
        if (number <= 0) {
            throw new SLException("工作模式删除失败");
        }

    }

    /**
     * 更新工作模式
     *
     * @param workPatternUpdateDTO 工作模式
     */
    @Override
    @Transactional(rollbackFor = {SLException.class, Exception.class})
    public void update(WorkPatternUpdateDTO workPatternUpdateDTO) {
        WorkPatternMapper workPatternMapper = getBaseMapper();
        WorkPatternEntity workPatternEntity = BeanUtil.toBean(workPatternUpdateDTO, WorkPatternEntity.class, (origin, entity) -> {
            entity.setName(origin.getName());
            entity.setUpdated(LocalDateTime.now());
            entity.setStatus(WorkConstants.WorkStatus.STOP);
        });
        int result = workPatternMapper.updateById(workPatternEntity);
        if (result <= 0) {
            throw new SLException("工作模式更新失败");
        }
    }

    /**
     * 新增工作模式
     *
     * @param workPatternAddDTO 工作模式
     */
    @Override
    @Transactional(rollbackFor = {SLException.class, Exception.class})
    public void add(WorkPatternAddDTO workPatternAddDTO) {

        WorkPatternEntity workPatternEntity = BeanUtil.toBean(workPatternAddDTO, WorkPatternEntity.class, (dto, entity) -> {
            entity.setId(IdWorker.getId());
            entity.setCreater(dto.getOperator());
            entity.setUpdater(dto.getOperator());
            entity.setCreated(LocalDateTime.now());
            entity.setUpdated(LocalDateTime.now());
            entity.setStatus(WorkConstants.WorkStatus.USING);
        });
        BeanUtil.setDefault(workPatternEntity);
        int result = getBaseMapper().insert(workPatternEntity);
        if (result <= 0) {
            throw new SLException("工作模式新增失败");
        }
    }

    @Override
    public List<WorkPatternDTO> all() {
        return list(
                Wrappers.<WorkPatternEntity>lambdaQuery()
                        .eq(WorkPatternEntity::getIsDelete, 0))
                .stream()
                .map(v -> BeanUtil.toBean(v, WorkPatternDTO.class))
                .collect(Collectors.toList());
    }

}
