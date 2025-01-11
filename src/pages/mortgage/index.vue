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
            <nut-input class="input-class"  v-model="commercialLoanForm.housePrice" placeholder="请输入房屋总价" input-align="right">
              <template #rightExtra>
                <text class="suffix">万</text>
              </template>
            </nut-input>
          </nut-form-item>
          <nut-form-item label="贷款比例" label-width="150" prop="percent" required :rules="[{ required: true, message: '请输入贷款比例' }]">
            <view class="duration"><text class="text">{{commercialLoanForm.percent}} 成 </text></view>
          </nut-form-item>
            <nut-radiogroup v-model="commercialLoanForm.percent" direction="horizontal">
              <template v-for="item in percentList">
                <nut-radio shape="button" :label="item.value">{{item.text}}</nut-radio>
              </template>
            </nut-radiogroup>
          </template>
          <!--房屋总价-->
          <nut-form-item label="贷款金额" label-width="150" prop="amount" required :rules="[{ required: true, message: '请输入贷款金额' }]">
            <nut-input class="input-class" v-model="commercialLoanForm.amount" placeholder="请输入贷款金额" input-align="right">
              <template #rightExtra>
                <text class="suffix">万</text>
              </template>
            </nut-input>
          </nut-form-item>

          <nut-form-item label="商贷年限" label-width="80" prop="duration" required :rules="[{ required: true, message: '请输入商贷年限' }]" >
            <view class="duration" @click="handleShowDuration()"><text class="text">{{commercialLoanForm.duration}}</text>  年（{{commercialLoanForm.duration*12}}）期 <nut-icon name="right" color="#666" size="16"></nut-icon></view>
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
              <nut-input class="input-class"  v-model="providentFundLoanForm.housePrice" placeholder="请输入房屋总价" input-align="right">
                <template #rightExtra>
                  <text class="suffix">万</text>
                </template>
              </nut-input>
            </nut-form-item>
            <nut-form-item label="贷款比例" label-width="150" prop="percent" required :rules="[{ required: true, message: '请输入贷款比例' }]">
<!--              <nut-input class="input-class" placeholder="请输入贷款比例"  input-align="right">-->
<!--                <template #rightExtra>-->
<!--                  <text class="suffix">成</text>-->
<!--                </template>-->
<!--              </nut-input>-->
              <view class="duration"><text class="text">{{providentFundLoanForm.percent}} 成 </text></view>
            </nut-form-item>
            <nut-radiogroup v-model="providentFundLoanForm.percent" direction="horizontal">
              <template v-for="item in percentList">
                <nut-radio shape="button" :label="item.value">{{item.text}}</nut-radio>
              </template>
            </nut-radiogroup>
          </template>
          <!--房屋总价-->
          <nut-form-item label="贷款金额" label-width="150" prop="amount" required :rules="[{ required: true, message: '请输入贷款金额' }]">
            <nut-input class="input-class" v-model="providentFundLoanForm.amount" placeholder="请输入贷款金额" input-align="right">
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
      <nut-tabpane title="💰组合贷款">
        <nut-form>
          <nut-form-item label="计算方式" required>
            <nut-radiogroup direction="horizontal" v-model="combinationLoanForm.way" >
              <nut-radio :label="1">按贷款总额</nut-radio>
              <nut-radio :label="2">按房屋总价</nut-radio>
            </nut-radiogroup>
          </nut-form-item>

          <!--房屋总价-->
          <template v-if="combinationLoanForm.way === 2">
            <nut-form-item label="房屋总价" label-width="150" prop="housePrice" required :rules="[{ required: true, message: '请输入房屋总价' }]">
              <nut-input class="input-class"  v-model="combinationLoanForm.housePrice" placeholder="请输入房屋总价" input-align="right">
                <template #rightExtra>
                  <text class="suffix">万</text>
                </template>
              </nut-input>
            </nut-form-item>
            <nut-form-item label="贷款比例" label-width="150" prop="percent" required :rules="[{ required: true, message: '请输入贷款比例' }]">
              <view class="duration"><text class="text">{{combinationLoanForm.percent}} 成 </text></view>
            </nut-form-item>
            <nut-radiogroup v-model="combinationLoanForm.percent" direction="horizontal">
              <template v-for="item in percentList">
                <nut-radio shape="button" :label="item.value">{{item.text}}</nut-radio>
              </template>
            </nut-radiogroup>
          </template>
          <!--房屋总价-->
          <nut-form-item label="贷款金额" label-width="150" prop="amount" required :rules="[{ required: true, message: '请输入商业金额' }]">
            <nut-input class="input-class" v-model="combinationLoanForm.amount" placeholder="请输入商业金额" input-align="right">
              <template #rightExtra>
                <text class="suffix">万</text>
              </template>
            </nut-input>
          </nut-form-item>

          <view class="part-title">商业贷款</view>
          <nut-form-item label="商贷金额" label-width="150"  required :rules="[{ required: true, message: '请输入商贷金额' }]">
            <nut-input class="input-class" v-model="combinationLoanForm.commercialAmount" placeholder="请输入商贷金额" input-align="right">
              <template #rightExtra>
                <text class="suffix">万</text>
              </template>
            </nut-input>
          </nut-form-item>
          <nut-form-item label="商贷期限" label-width="150" required :rules="[{ required: true, message: '请输入商贷金额' }]">
            <view class="duration" @click="handleShowCombinationCommercialDuration()"><text class="text">{{combinationLoanForm.commercialDuration}}</text>  年（{{combinationLoanForm.commercialDuration*12}}）期 <nut-icon name="right" color="#666" size="16"></nut-icon></view>
          </nut-form-item>
          <nut-form-item label="利率方式" label-width="150" required >
            <view class="duration" @click="() => interestTypesShow = true"><text class="text">{{combinationLoanForm.interestType}}</text> <nut-icon name="right" color="#666" size="16"></nut-icon></view>
          </nut-form-item>

          <nut-form-item label="LPR" label-width="100" required  v-if="combinationLoanForm.interestType == 'LPR'">
            <template v-slot:label> LPR <nut-icon name="ask" @click="LRPTipsShow = true"></nut-icon></template>
            <view class="tips" @click="LRPTipsShow = true"><nut-tag type="primary">{{ LPRTable.data[0].time }}</nut-tag><text class="desc"> LPR：一年期{{ LPRTable.data[0].oneYearTerm }}，五年期{{ LPRTable.data[0].fiveYearTerm}} </text></view>
          </nut-form-item>

          <nut-form-item label="利率" label-width="150" required >
            <view class="duration" @click="handleShowCombinationInterest()"><text class="text">{{combinationLoanForm.commercialInterest}}%</text> <nut-icon name="right" color="#666" size="16"></nut-icon></view>
          </nut-form-item>
          <view class="part-title">公积金贷款</view>
          <nut-form-item label="公积金贷款总额" label-width="150"  required :rules="[{ required: true, message: '请输入商贷金额' }]">
            <nut-input class="input-class" v-model="combinationLoanForm.providentFundAmount" placeholder="请输入商贷金额" input-align="right">
              <template #rightExtra>
                <text class="suffix">万</text>
              </template>
            </nut-input>
          </nut-form-item>
          <nut-form-item label="公积金贷款期限" label-width="150" required :rules="[{ required: true, message: '请输入商贷金额' }]">
            <view class="duration" @click="handleShowCombinationProvidentFundDuration()"><text class="text">{{combinationLoanForm.providentFundDuration}}</text>  年（{{combinationLoanForm.providentFundDuration*12}}）期 <nut-icon name="right" color="#666" size="16"></nut-icon></view>
          </nut-form-item>

          <nut-form-item label="公积金贷款利率" label-width="150" required >
            <view class="duration" @click="handleShowCombinationProvidentFundInterest()"><text class="text">{{combinationLoanForm.providentFundRateOfInterest}}%</text> <nut-icon name="right" color="#666" size="16"></nut-icon></view>
          </nut-form-item>
        </nut-form>
        <nut-row type="flex" justify="space-evenly" gutter="12">
          <nut-col :span="10">
            <nut-button plain block @click="handleCombinationClear">清空</nut-button>
          </nut-col>
          <nut-col :span="10">
            <nut-button type="primary" block :disabled="calcInterestBtn" @click="handleCombinationCalc">计算</nut-button>
          </nut-col>
        </nut-row>


      </nut-tabpane>

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

    <!--组合贷款商贷picker-->
    <nut-picker
      v-model:visible="combinationCommercialDurationShow"
      :columns="columns"
      title="商贷年限"
      @confirm="combinationCommercialDurationConfirm"
    >
    </nut-picker>

    <!--利率方式-->
    <nut-picker
      v-model:visible="interestTypesShow"
      :columns="interestTypes"
      title="利率方式"
      @confirm="interestTypesConfirm"
    >
    </nut-picker>

    <!--组合旧版利率选择器 -->
    <nut-picker
    v-model:visible="combinationOldInterestShow"
    :columns="oldInterest"
    title="旧版基准利率"
    @confirm="combinationOldInterestConfirm"
  >
  </nut-picker>

    <!--组合商贷利率-->
    <nut-picker
      v-model:visible="combinationCommercialInterestShow"
      :columns="commercialInterest"
      title="商业贷款利率"
      @confirm="combinationCommercialInterestConfirm"
    >
<!--      <view style="margin-bottom:30rpx ">-->
<!--        <nut-input-->
<!--          label="自定义利率"-->
<!--          placeholder="请输入利率"-->
<!--          v-model="diyInterest"-->
<!--          type="digit"-->
<!--          input-align="right"-->
<!--        >-->
<!--          <template #rightExtra>-->
<!--            <text class="suffix">%</text>-->
<!--          </template>-->
<!--        </nut-input>-->
<!--      </view>-->
    </nut-picker>

    <!--组合公积金期限-->

    <nut-picker
      v-model:visible="combinationProvidentFundDurationShow"
      :columns="columns"
      title="贷款年限"
      @confirm="combinationProvidentFundDurationShowConfirm"
    >
    </nut-picker>

    <nut-picker
      v-model:visible="combinationProvidentFundInterestShow"
      :columns="interestColumns"
      title="公积金贷款利率"
      @change="change"
      @confirm="combinationProvidentFundInterestConfirm"
    >
<!--      <view style="margin-bottom:30rpx ">-->
<!--        <nut-input-->
<!--          label="自定义利率"-->
<!--          placeholder="请输入利率"-->
<!--          v-model="diyInterest"-->
<!--          type="digit"-->
<!--          input-align="right"-->
<!--        >-->
<!--          <template #rightExtra>-->
<!--            <text class="suffix">%</text>-->
<!--          </template>-->
<!--        </nut-input>-->
<!--      </view>-->
    </nut-picker>
    <!--组合公积金期限-->


    <nut-popup position="bottom" closeable round :style="{ height: '50%' }" v-model:visible="LRPTipsShow">
      <view class="LRPTips">
        <p style="font-weight: bolder;font-size: 30rpx;text-align: left;margin-bottom: 20rpx">LPR全称贷款市场报价利率</p>
        <p style="text-align: left;font-size: 28rpx">
        自2019年10月8日起，新发放的商业性贷款利率由“贷款基准利率（4.9%）”转换为“贷款市场报价利率（LPR）”。
        在LPR的基础上增加基点来确定最终的商贷利率；LPR每月20日（遇节假日顺延），可在中国人民银行网站查询。</p>
      </view>
      <nut-table :columns="LPRTable.columns" :data="LPRTable.data" :striped="LPRTable.striped"></nut-table>
    </nut-popup>
  </view>
</template>
<script setup lang="ts">
import {reactive, ref, watch, watchEffect} from "vue";
import './index.scss'
import Taro from "@tarojs/taro";
import _ from 'lodash'


const state = reactive({
  tab1value: '2',
});

//商业贷款表单
const commercialLoanForm = reactive({
  way: 1,
  amount: 0,
  duration: 30,
  rateOfInterest: 3.5,
  housePrice:0,
  percent:2
})

//公积金贷款表单
const providentFundLoanForm = reactive({
  way: 1,
  amount: 0,
  duration: 30,
  rateOfInterest: 2.85,
  housePrice:0,
  percent:2
})

//组合贷款表单
const combinationLoanForm = reactive({
  way: 1,
  amount: 0,
  duration: 30,
  rateOfInterest: 3.5,
  housePrice:0,
  percent:2,
  commercialAmount:0,
  commercialDuration:30,
  interestType: 'LPR',
  commercialInterest:3.6, //商贷利率
  providentFundAmount:0,//公积金贷款总额
  providentFundDuration:30,//公积金贷款年限
  providentFundRateOfInterest:2.85,//公积金贷款利率
})

let durationShow = ref(false)
let interestShow = ref(false)
let combinationCommercialDurationShow = ref(false)
let interestTypesShow = ref(false) //利率方式
let combinationOldInterestShow = ref(false)//旧版利率picker显示
let combinationCommercialInterestShow = ref(false)//商业贷款利率显示
let combinationProvidentFundInterestShow = ref(false)//组合公积金商业贷款利率显示
let combinationProvidentFundDurationShow = ref(false)//组合公积金商业贷款年限显示

const percentList = (() => {
  let arr = []
  for (let i = 2; i <=9 ; i++) {
    arr.push({
      text: `${i}成`,
      value: i
    })
  }
  return arr
})()

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

const interestTypes = ref([
  {
    text: '按最新LPR',
    value: 'LPR'
  },
  {
    text: '按旧版基准利率',
    value: '按旧版基准利率'
  }
])

const commercialInterest = ref([
  {
    text: '2.7%(LPR-90基点)',
    value:'2.7'
  },
  {
    text: '2.8%(LPR-80基点)',
    value:'2.8'
  },
  {
    text: '2.85%(LPR-75基点)',
    value:'2.85'
  },
  {
    text: '2.9%(LPR-70基点)',
    value:'2.9'
  },
  {
    text: '3.1%(LPR-50基点)',
    value:'3.1'
  },
  {
    text: '3.3%(LPR-30基点)',
    value:'3.3'
  },
  {
    text: '3.4%(LPR-20基点)',
    value:'3.4'
  },
  {
    text: '3.5%(LPR-10基点)',
    value:'3.5'
  },
  {
    text: '3.6%(LPR+-0基点)',
    value:'3.6'
  },
  {
    text: '3.7%(LPR+10基点)',
    value:'3.7'
  },
  {
    text: '3.8%(LPR+20基点)',
    value:'3.8'
  },
  {
    text: '3.9%(LPR+30基点)',
    value:'3.9'
  },
])

const oldInterest = ref([
  {
    text: '3.43%（旧版基准利率7折）',
    value: '3.45'
  },
  {
    text: '3.68%（旧版基准利率7.5折）',
    value: '3.68'
  },
  {
    text: '3.92%（旧版基准利率8折）',
    value: '3.92'
  },
  {
    text: '4.17%（旧版基准利率8.5折）',
    value: '4.17'
  },
  {
    text: '4.41%（旧版基准利率9折）',
    value: '4.41'
  },
  {
    text: '4.66%（旧版基准利率9.5折）',
    value: '4.66'
  },
  {
    text: '4.9%（旧版基准利率）',
    value: '4.9'
  },
  {
    text: '5.15%（旧版基准利率1.05倍）',
    value: '5.15'
  },
  {
    text: '5.39%（旧版基准利率1.1倍）',
    value: '5.39'
  },
  {
    text: '5.64%（旧版基准利率1.15倍）',
    value: '5.64'
  },
  {
    text: '5.88%（旧版基准利率1.2倍）',
    value: '5.88'
  },
  {
    text: '6.13%（旧版基准利率1.25倍）',
    value: '6.13'
  },
  {
    text: '6.37%（旧版基准利率1.3倍）',
    value: '6.37'
  },




])

let diyInterest = ref()

let LRPTipsShow = ref(false)

const LPRTable = reactive({
  striped: true,
  columns: [
    {
      title: '发布时间',
      key: 'time',
      align: 'center',
      stylehead: 'font-size:12px;font-weight:bolder;',
    },
    {
      title: '一年期',
      key: 'oneYearTerm',
      align: 'center',
      stylehead: 'font-size:12px;font-weight:bolder;',
      stylecolumn: 'font-size:12px;'
    },
    {
      title: '五年期',
      key: 'fiveYearTerm',
      align: 'center',
      stylehead: 'font-size:12px;font-weight:bolder;',
      stylecolumn: 'font-size:12px;'
    }
  ],
  data: [
    {
      time: '2024/10/21',
      oneYearTerm: '3.1%',
      oneYearTermVal: '3.1',
      fiveYearTerm: '3.6%',
      fiveYearTermVal: '3.6'
    },
    {
      time: '2024/7/22',
      oneYearTerm: '3.35%',
      oneYearTermVal: '3.35',
      fiveYearTerm: '3.85%',
      fiveYearTermVal: '3.85'
    },
    {
      time: '2024/3/20',
      oneYearTerm: '3.45%',
      oneYearTermVal: '3.45',
      fiveYearTerm: '3.95%',
      fiveYearTermVal: '3.95'
    }
  ]
})

/**
 * 根据房屋面积比例计算商业贷款例
 *
 */
watchEffect(() => {
  console.log('housePrice changed:', commercialLoanForm.housePrice);
  commercialLoanForm.amount = (commercialLoanForm.housePrice * (commercialLoanForm.percent /10)).toFixed(2);
});

watchEffect(() => {
  console.log('housePrice changed:', providentFundLoanForm.housePrice);
  providentFundLoanForm.amount = (providentFundLoanForm.housePrice * (providentFundLoanForm.percent /10)).toFixed(2);
});

watchEffect(() => {
  console.log('housePrice changed:', combinationLoanForm.housePrice);
  combinationLoanForm.amount = (combinationLoanForm.housePrice * (combinationLoanForm.percent /10)).toFixed(2);
});


watch(()=>combinationLoanForm.amount, (newVal) => {
  console.log(newVal)
  combinationLoanForm.providentFundAmount = newVal - Number(combinationLoanForm.commercialAmount)
},{deep:true,immediate:false})
watch(()=>combinationLoanForm.commercialAmount, (newVal) => {
  console.log("newVal",newVal)
  console.log("combinationLoanForm.amount",combinationLoanForm.amount)
  if (Number(newVal)>combinationLoanForm.amount){
    Taro.showToast({
      title: '商业贷款总额不能大于贷款总额',
      icon:'none',
      duration: 3000
    })
    combinationLoanForm.commercialAmount = 0
    return
  }
  combinationLoanForm.providentFundAmount = Number(combinationLoanForm.amount) - Number(newVal)
},{deep:true,immediate:false})

watch(()=>combinationLoanForm.providentFundAmount, (newVal) => {
  if (Number(newVal)>combinationLoanForm.amount) {
    Taro.showToast({
      title: '公积金贷款总额不能大于贷款总额',
      icon: 'none',
      duration: 3000
    })
    combinationLoanForm.providentFundAmount = 0
    return
  }

  combinationLoanForm.commercialAmount = Number(combinationLoanForm.amount) - Number(newVal)
},{deep:true,immediate:false})


function confirm(e) {
  commercialLoanForm.duration = Number(e.selectedValue[0])
  providentFundLoanForm.duration = Number(e.selectedValue[0])
}


function providentFundConfirm(e){
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

function handleShowCombinationCommercialDuration(){
  combinationCommercialDurationShow.value = true
}

function combinationCommercialDurationConfirm(e){
  combinationLoanForm.commercialDuration = Number(e.selectedValue[0])
}


/**
 * 组合商贷利率选择
 */
function combinationCommercialInterestConfirm(e){
  combinationLoanForm.commercialInterest = Number(e.selectedValue[0])
}

/**
 * 组合商贷旧版利息选择
 */
function combinationOldInterestConfirm(e){
  combinationLoanForm.commercialInterest = Number(e.selectedValue[0])
}

/**
 * @description 组合计算显示公积金期限
 */

function handleShowCombinationProvidentFundDuration(){
  combinationProvidentFundDurationShow.value = true
}

/**
 * @description 组合计算显示公积金期限确认
 */
function combinationProvidentFundDurationShowConfirm(e){
  console.log("公积金利率确认")
  combinationLoanForm.providentFundDuration = Number(e.selectedValue[0])
}

/**
 * @description 组合计算显示公积金利率确认
 */
function combinationProvidentFundInterestConfirm(e){
  combinationLoanForm.providentFundRateOfInterest = Number(e.selectedValue[0])
}

/**
 *
 * 利率方式选择
 * @param e
 */
function interestTypesConfirm(e){
  combinationLoanForm.interestType = e.selectedValue[0]
  if (e.selectedValue[0] == 'LPR'){
    if (combinationLoanForm.commercialDuration < 5){
      combinationLoanForm.commercialInterest = LPRTable.data[0].oneYearTermVal
    }else{
      combinationLoanForm.commercialInterest = LPRTable.data[0].fiveYearTermVal
    }
  }else{
    combinationLoanForm.commercialInterest =4.9
  }

}

function handleShowCombinationInterest(){
  if(combinationLoanForm.interestType == 'LPR'){
    //显示组合LPR利率
    combinationCommercialInterestShow.value = true
  }else{
    combinationOldInterestShow.value = true
  }
}

/**
 * @description 公积金贷款利picker显示
 * */
function handleShowCombinationProvidentFundInterest(){
  combinationProvidentFundInterestShow.value = true
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


/**
 * @description 计算组合贷款
 */

function handleCombinationCalc(){
  if (combinationLoanForm.amount<=0){
    Taro.showToast({
      title: '贷款金额必须大于0万',
      icon:'none',
      duration: 3000
    })
    return
  }
  console.log('计算组合贷款利息')
  console.log(providentFundLoanForm)
  const paramForm = {
    commercialLoan:{
      amount:combinationLoanForm.commercialAmount,
      rateOfInterest :combinationLoanForm.commercialInterest,
      duration : combinationLoanForm.commercialDuration
    },
    providentFundLoanForm:{
      amount:combinationLoanForm.providentFundAmount,
      rateOfInterest :combinationLoanForm.providentFundRateOfInterest,
      duration : combinationLoanForm.providentFundDuration
    }

  }
  Taro.navigateTo({
    url: `/pages/combinationResult/index?data=${encodeURIComponent(JSON.stringify(paramForm))}`,
  })
}
</script>


