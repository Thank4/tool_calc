<script setup lang="ts">
import './index.scss'
import manageMoneyIcon from '@/assets/icon/manageMoney.png';
import mortgageIcon from '@/assets/icon/mortgage.png';
import Taro from "@tarojs/taro";
const goPage = (url: string) => {
  Taro.navigateTo({
    url
  })
}
</script>

<template>
  <view class="grid">
  <nut-grid :column-num="2">
    <nut-grid-item :icon="manageMoneyIcon" text="理财计算" @click="goPage('/pages/home/index')"></nut-grid-item>
    <nut-grid-item :icon="mortgageIcon" text="房贷计算" @click="goPage('/pages/mortgage/index')"></nut-grid-item>
  </nut-grid>
  </view>
  <view class="share-button">
    <nut-button class="" type="primary" icon="share" block openType="share">分享给好友</nut-button>
  </view>
</template>
