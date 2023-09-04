package com.sl.transport.info.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * 运输物流信息
 */
@Data
@Document("sl_transport_info")
public class TransportInfoEntity {

    @Id
    @JsonIgnore
    private ObjectId id;
    @Indexed
    private String transportOrderId; //运单id
    private List<TransportInfoDetail> infoList; //info信息列表
    private Long created; //创建时间
    private Long updated; //更新时间

}
