package com.sl.transport.entity.node;

import com.sl.transport.enums.OrganTypeEnum;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.data.neo4j.core.schema.Node;

/**
 * 一级转运中心实体 (OneLevelTransportEntity)
 *
 * @author zzj
 * @version 1.0
 */
@Node("OLT")
@Data
@ToString(callSuper = true)
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
public class OLTEntity extends BaseEntity {

    @Override
    public OrganTypeEnum getAgencyType() {
        return OrganTypeEnum.OLT;
    }
}
