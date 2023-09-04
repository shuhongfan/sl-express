package com.sl.ms.web.courier.vo.task;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class RecentSearchVO {

    /**
     * 运单id
     */
    private String transportOrderId;

    /**
     * 创建时间
     */
    private LocalDateTime created;
}
