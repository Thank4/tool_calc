<template>
  <view class="index">
    <nut-tabs v-model="state.tab1value" type="smile" background="#ffffff" >
      <nut-tabpane title="💰商业贷款">
        <nut-form>
          <nut-form-item label="计算方式" required>
            <nut-radiogroup direction="horizontal" v-model="commercialLoanForm.way" >
              <nut-radio :label="1">按贷款总额</nut-radio>
              <nut-radio :label="2">按房屋总价</nut-radio>
            </nut-radiogroup>
          </nut-form-item>

          <!--房屋总价-->
          <template v-if="commercialLoanForm.way === 2">
          <nut-form-item label="房屋总价" label-width="150" prop="housePrice" required :rules="[{ required: true, message: '请输入房屋总价' }]">
            <nut-input class="input-class"  v-model="commercialLoanForm.housePrice" placeholder="请输入房屋总价" type="digit" input-align="right">
              <template #rightExtra>
                <text class="suffix">万</text>
              </template>
            </nut-input>
          </nut-form-item>
          <nut-form-item label="贷款比例" label-width="150" prop="percent" required :rules="[{ required: true, message: '请输入贷款比例' }]">
            <nut-input class="input-class" v-model="commercialLoanForm.percent" placeholder="请输入贷款比例" type="digit" input-align="right">
              <template #rightExtra>
                <text class="suffix">成</text>
              </template>
            </nut-input>
          </nut-form-item>
          </template>
          <!--房屋总价-->
          <nut-form-item label="商业金额" label-width="150" prop="amount" required :rules="[{ required: true, message: '请输入商业金额' }]">
            <nut-input class="input-class" v-model="commercialLoanForm.amount" placeholder="请输入商业金额" type="digit" input-align="right">
              <template #rightExtra>
                <text class="suffix">万</text>
              </template>
            </nut-input>
          </nut-form-item>

          <nut-form-item label="商贷年限" label-width="80" prop="duration" required :rules="[{ required: true, message: '请输入商贷年限' }]" >
            <view class="duration" @click="handleShowDuration()"><text class="text">{{commercialLoanForm.duration}}</text>  年</view>
          </nut-form-item>
          <nut-form-item label="贷款利率" label-width="150" prop="rateOfInterest" required :rules="[{ required: true, message: '请输入贷款利率' }]">
            <nut-input class="input-class" v-model="commercialLoanForm.rateOfInterest" placeholder="贷款利率" input-align="right">
              <template #rightExtra>
                <text class="suffix">%</text>
              </template>
            </nut-input>
          </nut-form-item>
        </nut-form>
        <nut-row type="flex" justify="space-evenly" gutter="12">
          <nut-col :span="10">
            <nut-button plain block @click="handleInterestClear">清空</nut-button>
          </nut-col>
          <nut-col :span="10">
            <nut-button type="primary" block :disabled="calcInterestBtn" @click="handleInterestCalc">计算</nut-button>
          </nut-col>
        </nut-row>
        <nut-row class="share" type="flex" justify="space-evenly" gutter="12">
          <nut-col :span="21">
            <nut-button icon="share" plain block openType="share">分享给好友</nut-button>
          </nut-col>
        </nut-row>
      </nut-tabpane>
<!--      <nut-tabpane title="💰组合贷款">-->

<!--      </nut-tabpane>-->
<!--      <nut-tabpane title="💰公积金贷款">-->
<!--      </nut-tabpane>-->
    </nut-tabs>

    <nut-picker
      v-model:visible="durationShow"
      :columns="columns"
      title="商贷年限"
      @change="change"
      @confirm="confirm"
    >
    </nut-picker>

  </view>
</template>
<script setup lang="ts">
import {reactive, ref, watch, watchEffect} from "vue";
import './index.scss'
import Taro from "@tarojs/taro";
import _ from 'lodash'

const marks=ref({
  1: 1,
  5: 5,
  10: 10,
  15: 15,
  20: 20,
  25: 25,
  30:30
});

const state = reactive({
  tab1value: '0',
});
const commercialLoanForm = reactive({
  way: 1,
  amount: 0,
  duration: 30,
  rateOfInterest: 3.5,
  housePrice:0,
  percent:6.5
})

let durationShow = ref<boolean>(false)

const columns =(() => {
  let arr = []
  for (let i = 1; i <=30 ; i++) {
    arr.push({
      text: `${i}年`,
      value: i
    })
  }
  return arr
})()

watchEffect(() => {
  console.log('housePrice changed:', commercialLoanForm.housePrice);
  commercialLoanForm.amount = commercialLoanForm.housePrice * commercialLoanForm.percent /10;
});
//
// watchEffect([commercialLoanForm.housePrice, commercialLoanForm.percent], ([newHousePrice, newPercent], [oldHousePrice, oldPercent]) => {
//   console.log('housePrice changed:', commercialLoanForm.housePrice);
//   commercialLoanForm.amount = newHousePrice * newPercent / 100;
// });



function confirm(e) {
  commercialLoanForm.duration = Number(e.selectedValue[0])
}

function handleInterestCalc(){
  if (commercialLoanForm.amount<=0){
    Taro.showToast({
      title: '商业贷款金额必须大于0万',
      icon:'none',
      duration: 3000
    })
    return
  }
  console.log('计算商业贷款利息')
  console.log(commercialLoanForm)
  Taro.navigateTo({
    url: `/pages/result/index?data=${encodeURIComponent(JSON.stringify(commercialLoanForm))}`,
  })
}

function handleInterestClear(){
  _.assign(commercialLoanForm, {
    amount: 0,
    duration: 30,
    rateOfInterest: 3.5,
    housePrice:0,
    percent:6.5
  })
}

function handleShowDuration(){
  Taro.hideKeyboard({
    success: () => {
      durationShow.value = true
    },
    fail: (res) => {
      console.log(res)
    }
  })
}

</script>


