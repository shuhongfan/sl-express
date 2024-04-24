package com.sl.sdn.entity.node;

import com.sl.sdn.enums.OrganTypeEnum;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.data.neo4j.core.schema.Node;

/**
 * 二级转运中心实体(TwoLevelTransportEntity)
 */
@Node("TLT")
@Data
@ToString(callSuper = true)
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
public class TLTEntity extends BaseEntity {

    @Override
    public OrganTypeEnum getAgencyType() {
        return OrganTypeEnum.TLT;
    }
}