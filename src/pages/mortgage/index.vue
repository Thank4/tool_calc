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
            <view class="duration" @click="handleShowDuration()"><text class="text">{{commercialLoanForm.duration}}</text>  年（{{commercialLoanForm.duration*12}}）期</view>
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
<!--        <nut-row class="share" type="flex" justify="space-evenly" gutter="12">-->
<!--          <nut-col :span="21">-->
<!--            <nut-button icon="share" plain block openType="share">分享给好友</nut-button>-->
<!--          </nut-col>-->
<!--        </nut-row>-->
      </nut-tabpane>
      <nut-tabpane title="💰公积金贷款">
        <nut-form>
          <nut-form-item label="计算方式" required>
            <nut-radiogroup direction="horizontal" v-model="providentFundLoanForm.way" >
              <nut-radio :label="1">按贷款总额</nut-radio>
              <nut-radio :label="2">按房屋总价</nut-radio>
            </nut-radiogroup>
          </nut-form-item>
          <!--房屋总价-->
          <template v-if="providentFundLoanForm.way === 2">
            <nut-form-item label="房屋总价" label-width="150" prop="housePrice" required :rules="[{ required: true, message: '请输入房屋总价' }]">
              <nut-input class="input-class"  v-model="providentFundLoanForm.housePrice" placeholder="请输入房屋总价" type="digit" input-align="right">
                <template #rightExtra>
                  <text class="suffix">万</text>
                </template>
              </nut-input>
            </nut-form-item>
            <nut-form-item label="贷款比例" label-width="150" prop="percent" required :rules="[{ required: true, message: '请输入贷款比例' }]">
              <nut-input class="input-class" v-model="providentFundLoanForm.percent" placeholder="请输入贷款比例" type="digit" input-align="right">
                <template #rightExtra>
                  <text class="suffix">成</text>
                </template>
              </nut-input>
            </nut-form-item>
          </template>
          <!--房屋总价-->
          <nut-form-item label="贷款金额" label-width="150" prop="amount" required :rules="[{ required: true, message: '请输入贷款金额' }]">
            <nut-input class="input-class" v-model="providentFundLoanForm.amount" placeholder="请输入贷款金额" type="digit" input-align="right">
              <template #rightExtra>
                <text class="suffix">万</text>
              </template>
            </nut-input>
            </nut-form-item>
          <nut-form-item label="贷款年限" label-width="80" prop="duration" required :rules="[{ required: true, message: '请选择贷款年限' }]" >
            <view class="duration" @click="handleShowDuration()"><text class="text">{{providentFundLoanForm.duration}}</text>  年（{{providentFundLoanForm.duration*12}}）期 <nut-icon name="right" color="#666" size="16"></nut-icon></view>
          </nut-form-item>
          <nut-form-item label="贷款利率" label-width="80" prop="rateOfInterest" required :rules="[{ required: true, message: '请选择贷款年限' }]" >
            <view class="duration" @click="handleShowInterest()"><text class="text">{{providentFundLoanForm.rateOfInterest}}% </text><nut-icon name="right" color="#666" size="16"></nut-icon></view>
          </nut-form-item>
        </nut-form>
        <nut-row type="flex" justify="space-evenly" gutter="12">
          <nut-col :span="10">
            <nut-button plain block @click="handleProvidentFundInterestClear">清空</nut-button>
          </nut-col>
          <nut-col :span="10">
            <nut-button type="primary" block :disabled="calcInterestBtn" @click="handleProvidentFundInterestCalc">计算</nut-button>
          </nut-col>
        </nut-row>
        <!--        <nut-row class="share" type="flex" justify="space-evenly" gutter="12">-->
        <!--          <nut-col :span="21">-->
        <!--            <nut-button icon="share" plain block openType="share">分享给好友</nut-button>-->
        <!--          </nut-col>-->
        <!--        </nut-row>-->
      </nut-tabpane>
<!--      <nut-tabpane title="💰组合贷款">-->

<!--      </nut-tabpane>-->

    </nut-tabs>

    <!-- 贷款年限picker-->
    <nut-picker
      v-model:visible="durationShow"
      :columns="columns"
      title="贷款年限"
      @change="change"
      @confirm="confirm"
    >
    </nut-picker>

    <!--贷款利率picker-->
    <nut-picker
      v-model:visible="interestShow"
      :columns="interestColumns"
      title="公积金贷款利率"
      @change="change"
      @confirm="providentFundConfirm"
    >
      <view style="margin-bottom:30rpx ">
        <nut-input
          label="自定义利率"
          placeholder="请输入利率"
          v-model="diyInterest"
          type="digit"
          input-align="right"
        >
          <template #rightExtra>
            <text class="suffix">%</text>
          </template>
        </nut-input>
      </view>
    </nut-picker>
  </view>
</template>
<script setup lang="ts">
import {reactive, ref, watchEffect} from "vue";
import './index.scss'
import Taro from "@tarojs/taro";
import _ from 'lodash'


const state = reactive({
  tab1value: '0',
});

//商业贷款表单
const commercialLoanForm = reactive({
  way: 1,
  amount: 0,
  duration: 30,
  rateOfInterest: 3.5,
  housePrice:0,
  percent:6.5
})

//公积金贷款表单
const providentFundLoanForm = reactive({
  way: 1,
  amount: 0,
  duration: 30,
  rateOfInterest: 2.85,
  housePrice:0,
  percent:6.5
})

let durationShow = ref(false)
let interestShow = ref(false)

const columns =(() => {
  let arr = []
  for (let i = 1; i <=30 ; i++) {
    arr.push({
      text: `${i}年(${i*12}期)`,
      value: i
    })
  }
  return arr
})()

const interestColumns = ref([
  {
    text: '2.85%(最新基准利率)',
    value: 2.35
  },
  {
    text: '3.325%(二套房利率)',
    value: 3.325
  }
])

let diyInterest = ref()

/**
 * 根据房屋面积比例计算商业贷款例
 *
 */
watchEffect(() => {
  console.log('housePrice changed:', commercialLoanForm.housePrice);
  commercialLoanForm.amount = commercialLoanForm.housePrice * (commercialLoanForm.percent /10);
});

watchEffect(() => {
  console.log('housePrice changed:', providentFundLoanForm.housePrice);
  providentFundLoanForm.amount = providentFundLoanForm.housePrice * (providentFundLoanForm.percent /10);
});


function confirm(e) {
  commercialLoanForm.duration = Number(e.selectedValue[0])
}


function  providentFundConfirm(e){
  if (diyInterest.value!=""){
    providentFundLoanForm.rateOfInterest = Number(diyInterest.value)
  }else{
    console.log(e)
    providentFundLoanForm.rateOfInterest = Number(e.selectedValue[0])
  }

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
  const paramForm = {
    amount:commercialLoanForm.amount,
    rateOfInterest :commercialLoanForm.rateOfInterest,
    duration : commercialLoanForm.duration
  }
  Taro.navigateTo({
    url: `/pages/result/index?data=${encodeURIComponent(JSON.stringify(paramForm))}`,
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
  durationShow.value = true
}

function handleShowInterest(){
  interestShow.value = true
  diyInterest.value = ''
}


/**
 * 公积金计算按钮
 *
 */
function handleProvidentFundInterestCalc(){
  if (providentFundLoanForm.amount<=0){
    Taro.showToast({
      title: '公积金贷款金额必须大于0万',
      icon:'none',
      duration: 3000
    })
    return
  }
  console.log('计算公积金贷款利息')
  console.log(providentFundLoanForm)
  const paramForm = {
    amount:providentFundLoanForm.amount,
    rateOfInterest :providentFundLoanForm.rateOfInterest,
    duration : providentFundLoanForm.duration
  }
  Taro.navigateTo({
    url: `/pages/result/index?data=${encodeURIComponent(JSON.stringify(paramForm))}`,
  })
}

function handleProvidentFundInterestClear(){
  _.assign(providentFundLoanForm, {
    way: 1,
    amount: 0,
    duration: 30,
    rateOfInterest: 2.85,
    housePrice:0,
    percent:6.5
  })
}

</script>


