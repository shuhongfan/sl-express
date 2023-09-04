// 取消原因数据
export const cancelData= [
  {
    value: 1,
    label: '用户恶意下单'
  },
  {
    value: 2,
    label: '用户取消投递'
  },
  {
    value: 3,
    label: '违禁品'
  },
  {
    value: 4,
    label: '重复下单'
  },
  {
    value: 5,
    label: '无法联系上客户（空号、停机等）'
  },
  {
    value: 6,
    label: '虚假地址'
  },
  {
    value: 7,
    label: '实际发货地址与下单地址不符'
  },
  {
    value: 8,
    label: '因个人无法取件，退回到网点'
  }
]
// 付款方式数据
export const SignData= [
	{
	  value: 1,
	  label: '本人'
	},
	{
	  value: 2,
	  label: '代收'
	}
]
// 签收人数据
export const PayMethodData= [
	{
	  value: 1,
	  label: '寄付'
	},
	{
	  value: 2,
	  label: '到付'
	}
]
// 物品名称数据
export const GoodsData= [
	{
	  value: 1,
	  label: '生活用品'
	},
	{
	  value: 2,
	  label: '文件'
	},
	{
	  value: 3,
	  label: '数码产品'
	},
	{
	  value: 4,
	  label: '食品'
	},
	{
	  value: 5,
	  label: '服饰'
	},
	{
	  value: 6,
	  label: '其他'
	}
]

// 支付方式
export const PayWayData= [
	{
	  value: 1,
	  label: '微信支付'
	},
	{
	  value: 2,
	  label: '支付宝支付'
	}
]
// 取件tab数据
export const DeliveryData= [
	{
	  value: 1,
	  label: '寄件'
	},
	{
	  value: 2,
	  label: '收件'
	}
]
// 派件tab数据
export const PickUpData= [
	{
	  value: 1,
	  label: '待派件'
	},
	{
	  value: 2,
	  label: '已签收'
	}
]
// 历史去拍tab数据
export const HistoryTabData= [
	{
	  value: 1,
	  label: '取件'
	},
	{
	  value: 2,
	  label: '派件'
	}
]