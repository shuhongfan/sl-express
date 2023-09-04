<!--重量体积计算-->
<template>
  <view class="boxBg">
    <view class="goodsCon">
      <view class="item">
        <text>预估重量</text>
        <view class="bg goodInfo">
          <view
            class="symbol"
            :class="isLessThan ? 'active' : ''"
            @click="handleMinus"
            >-</view
          >
          <view class="num">
            <input
              class="uni-input"
              type="number"
              maxlength="6"
              v-model="weight"
              @blur="handleSymbol"
            />
            <text>kg</text>
          </view>
          <view
            class="symbol"
            :class="isExceed ? 'active' : ''"
            @click="handleAdd"
            >+</view
          >
        </view>
      </view>
      <view class="item">
        <text>总体积</text>
        <view class="bg goodInfo">
          <!-- 暂时去除 :class="isLessThanVolume ? 'active' : ''" -->
          <view class="symbol" @click="handleVolumeMinus">-</view>
          <view class="num">
            <input
              class="uni-input"
              type="number"
              maxlength="6"
              v-model="volume"
              @blur="handleVolume"
            />
            <text>m³</text>
          </view>
          <!-- 暂时去除 :class="isExceedVolume ? 'active' : ''" -->
          <view class="symbol" @click="handleVolumeAdd">+</view>
        </view>
      </view>
      <view class="item calculate">
        <view class="bg">
          <input
            class="uni-input"
            type="number"
            maxlength="3"
            v-model="measureLong"
            placeholder="长"
            @input="handleCalculate"
          />
          <text :class="measureLong ? 'active' : ''">cm</text>
        </view>
        <text>*</text>
        <view class="bg">
          <input
            class="uni-input"
            type="number"
            maxlength="3"
            v-model="measureWidth"
            placeholder="宽"
            @input="handleCalculate"
          />
          <text :class="measureWidth ? 'active' : ''">cm</text>
        </view>
        <text>*</text>
        <view class="bg">
          <input
            class="uni-input"
            type="number"
            maxlength="3"
            v-model="measureHigh"
            placeholder="高"
            @input="handleCalculate"
          />
          <text :class="measureHigh ? 'active' : ''">cm</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
// ------定义变量------
let weight = ref(1); //重量
let volume = ref(0); //体积
let measureLong = ref(null); //长
let measureWidth = ref(null); //宽
let measureHigh = ref(null); //高
let isLessThan = ref(true); //判断重量是否小于0.1
let isExceed = ref(false); //判断重量是否大于9999
let isLessThanVolume = ref(true); //判断体积是否小于0.0001m³
let isExceedVolume = ref(false); //判断体积是否大于99m³

// 暴漏给父组件
defineExpose({
  weight,
  volume,
  measureLong,
  measureWidth,
  measureHigh,
});
// ------生命周期------
// 监听重量数值，小数点后保留一位
watch(weight, (newValue, oldValue) => {
  const val = Number(newValue);
  nextTick(() => {
    // 数值小于0.1并且大于0  数值默认为1
    if (val < 0.1 && val > 0) {
      weight.value = 1;
    }
    // 处理小数点，小数点保留1位
    if (val > 0.1) {
      weight.value = parseInt(val * 10) / 10;
    }
    // 数值小于等于1 左侧按钮置灰
    if (val <= 1) {
      isLessThan.value = true; //左侧减号置灰
    } else {
      isLessThan.value = false; //左侧减号去除置灰
      if (val >= 9999) {
        weight.value = 9999;
        isExceed.value = true; //右侧加号置灰
      } else {
        isExceed.value = false; //右侧加号去除置灰
      }
    }
  });
});
// 监听长，取整
watch(measureLong, (newValue, oldValue) => {
  const val = Number(newValue);
  nextTick(() => {
    measureLong.value = Math.floor(val);
    if (newValue <= 0) {
      measureLong.value = null;
    }
  });
});
// 监听宽，取整
watch(measureWidth, (newValue, oldValue) => {
  const val = Number(newValue);
  nextTick(() => {
    measureWidth.value = Math.floor(val);
    if (newValue <= 0) {
      measureWidth.value = null;
    }
  });
});
// 监听高，取整
watch(measureHigh, (newValue, oldValue) => {
  const val = Number(newValue);
  nextTick(() => {
    measureHigh.value = Math.floor(val);
    if (newValue <= 0) {
      measureHigh.value = null;
    }
  });
});
// ------定义方法------
//触发重量输入如果输入0，自动判断为1kg,最小可输入值为0.1kg,最大值为9999kg
const handleSymbol = (e) => {
  const value = e.detail.value;
  if (value < 0.1) {
    weight.value = 1;
    isLessThan.value = true; //左侧减号置灰
  } else {
    if (value > 0.1 && value <= 1) {
      isLessThan.value = true;
    } else {
      isLessThan.value = false; //左侧减号去除置灰
    }
    if (value >= 9999) {
      isExceed.value = true; //右侧加号置灰
      weight.value = 9999;
    } else {
      isExceed.value = false; //右侧加号去除置灰
    }
  }
};
// 减重量
const handleMinus = () => {
  // 重量减去1
  if (weight.value > 1) {
    weight.value--;
    isExceed.value = false; //右侧加号去除置灰
    weight.value = weight.value.toFixed(1);
  }
  if (weight.value <= 0) {
    weight.value = 1;
    isLessThan.value = true; //左侧减号置灰
  }
};
// 加重量
const handleAdd = () => {
  // 重量加1
  if (weight.value < 9999) {
    ++weight.value;
    isLessThan.value = false; //左侧减号去除置灰
  }
  if (weight.value === 9999) {
    isExceed.value = true; //右侧加号置灰
  }
};

// 体积
const handleVolume = (e) => {
  const value = Number(e.detail.value);
  if (value < 0.0001) {
    volume.value = 0;
  } else {
    if (value > 99) {
      volume.value = 99;
      return uni.showToast({
        title: "体积最大可不能超过99m³",
        duration: 1000,
        icon: "none",
      });
    }
  }
};
// 减体积
const handleVolumeMinus = () => {
  // 体积减去1
  if (volume.value > 1) {
    volume.value--;
    volume.value = parseInt(volume.value * 10000) / 10000;
  }
  // 体积
  if (volume.value <= 0 || volume.value === 1) {
    volume.value = 0;
  }
};
// 加体积
const handleVolumeAdd = () => {
  // 体积加1
  if (volume.value < 99) {
    ++volume.value;
    isLessThanVolume.value = false; //左侧减号去除置灰
  }
  if (volume.value === 99) {
    isExceedVolume.value = true; //右侧加号置灰
  }
};
// 计算立方米
const handleCalculate = () => {
  const long = measureLong.value; //长
  const wide = measureWidth.value; //宽
  const height = measureHigh.value; //高
  // 长宽高都大于1才可以计算
  if (long >= 1 && wide >= 1 && height >= 1) {
    nextTick(() => {
      // 计算立方米：长/100*宽/100*高/100
      let val = (long / 100) * (wide / 100) * (height / 100);
      // 立方米必须大于0.0001
      if (val < 0.0001) {
        volume.value = 0;
      } else if (val > 99) {
        // 小数点后保留四位小数
        isExceedVolume.value = true; //右侧加号置灰
        volume.value = 99;
        return uni.showToast({
          title: "体积最大可不能超过99m³",
          duration: 1000,
          icon: "none",
        });
      } else {
        volume.value = parseInt(val * 10000) / 10000;
        // 如果体积大于1左侧减号按钮去除置灰
        if (val > 1) {
          isLessThanVolume.value = false; //左侧减号去除置灰
        } else {
          isLessThanVolume.value = true; //左侧减号置灰
        }
        isExceedVolume.value = false; //右侧加号去除置灰
      }
    });
  }
};
</script>
