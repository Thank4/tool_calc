<template>
  <nut-tabs v-model="tabVal" type="smile" background="#ffffff" >
    <nut-tabpane title="等额本息">
      <view class="card">
        <view class="card-content">
          <p class="monthly-payment">每月应还</p>
          <p class="amount">{{ EqualInstallmentMonthlyAmount }}<span class="currency">元</span></p>
          <view class="details">
            <view class="detail-item">
              <span>贷款总额</span>
              <span>{{EqualInstallmentCommercialLoanForm.amount}}万</span>
            </view>
            <view class="detail-item">
              <span>利息总额</span>
              <span>{{EqualInstallmentCommercialLoanForm.interest}}万</span>
            </view>
            <view class="detail-item">
              <span>贷款年限</span>
              <span>{{EqualInstallmentCommercialLoanForm.duration}}年</span>
            </view>
          </view>
        </view>
      </view>
      <!--分享按钮 -->
      <view class="share-button">
      <nut-button icon="share" plain block type="primary" openType="share">分享计算结果</nut-button>
      </view>
      <nut-table :columns="state.columns" :data="EqualInstallmentCommercialLoanFormTableData" :striped="state.striped"></nut-table>
    </nut-tabpane>
    <nut-tabpane title="等额本金">
      <view class="card">
        <view class="card-content">
          <p class="monthly-payment">首月应还</p>
          <p class="amount">{{ EqualPrincipalAmount }}<span class="currency">元</span></p>
          <p class="desc">每月递减约{{EqualPrincipalCommercialLoanForm.monthDecreasingAmount}}元</p>
          <view class="details">
            <view class="detail-item">
              <span>贷款总额</span>
              <span>{{EqualPrincipalCommercialLoanForm.amount}}万</span>
            </view>
            <view class="detail-item">
              <span>利息总额</span>
              <span>{{EqualPrincipalCommercialLoanForm.interest}}万</span>
            </view>
            <view class="detail-item">
              <span>贷款年限</span>
              <span>{{EqualPrincipalCommercialLoanForm.duration}}年</span>
            </view>
          </view>
        </view>
      </view>
      <!--分享按钮 -->
      <view class="share-button">
        <nut-button icon="share" plain block type="primary" openType="share">分享计算结果</nut-button>
      </view>
      <nut-table :columns="state.columns" :data="EqualPrincipalCommercialLoanFormTableData" :striped="state.striped"></nut-table>
    </nut-tabpane>
  </nut-tabs>
</template>
<script setup lang="ts">
import './index.scss'
import {reactive,ref,onMounted} from 'vue'
import { getCurrentInstance } from '@tarojs/taro'
let tabVal = ref(0)

const state = reactive({
  striped: true,
  columns: [
    {
      title: '期数',
      key: 'periods',
      align: 'center',
      stylehead: 'font-size:12px;font-weight:bolder;',
    },
    {
      title: '月供总额',
      key: 'monthlyTotalPayment',
      align: 'center',
      stylehead: 'font-size:12px;font-weight:bolder;',
      stylecolumn: 'font-size:12px;'
    },
    {
      title: '月供本金',
      key: 'monthlyPrincipalPayment',
      align: 'center',
      stylehead: 'font-size:12px;font-weight:bolder;',
      stylecolumn: 'font-size:12px;'
    },
    {
      title: '月供利息',
      key: 'monthlyInterestPayment',
      align: 'center',
      stylehead: 'font-size:12px;font-weight:bolder;',
      stylecolumn: 'font-size:12px;'
    },
    {
      title: '剩余本金',
      key: 'remainingPrincipal',
      align: 'center',
      stylehead: 'font-size:12px;font-weight:bolder;',
      stylecolumn: 'font-size:12px;'
    }
    ]
})

let EqualInstallmentCommercialLoanFormTableData = reactive([])

let  EqualInstallmentMonthlyAmount = ref(0)
const EqualInstallmentCommercialLoanForm = reactive({
  amount:0,
  interest:0,
  duration:30,
  rateOfInterest:3.5
})

let EqualPrincipalCommercialLoanFormTableData = reactive([])

let EqualPrincipalAmount = ref(0)
const EqualPrincipalCommercialLoanForm = reactive({
  amount:0,
  interest:0,
  duration:30,
  rateOfInterest:3.5,
  monthDecreasingAmount:0
})

onMounted(() => {
  if (getCurrentInstance().router.params?.data){
    let data = JSON.parse(decodeURIComponent(getCurrentInstance().router.params?.data))
    EqualInstallmentCommercialLoanForm.amount = data.amount
    EqualInstallmentCommercialLoanForm.rateOfInterest = data.rateOfInterest
    EqualInstallmentCommercialLoanForm.duration = data.duration

    EqualPrincipalCommercialLoanForm.amount = data.amount
    EqualPrincipalCommercialLoanForm.rateOfInterest = data.rateOfInterest
    EqualPrincipalCommercialLoanForm.duration = data.duration
  }

  tabVal.value = 0
  const { monthlyPayments,monthlyPayment,totalPayment,totalInterest} = calculateEqualInstallment(EqualInstallmentCommercialLoanForm.amount*10000, EqualInstallmentCommercialLoanForm.rateOfInterest, EqualInstallmentCommercialLoanForm.duration)
  EqualInstallmentMonthlyAmount.value = monthlyPayment
  EqualInstallmentCommercialLoanForm.interest = totalInterest
  EqualInstallmentCommercialLoanFormTableData = monthlyPayments

  const { EqualPrincipalMonthlyPayments,firstPayment,monthDecreasingAmount,EqualPrincipalTotalPayment,EqualPrincipalTotalInterest} = calculateEqualPrincipal(EqualPrincipalCommercialLoanForm.amount*10000, EqualPrincipalCommercialLoanForm.rateOfInterest, EqualPrincipalCommercialLoanForm.duration)
  EqualPrincipalAmount.value = firstPayment
  EqualPrincipalCommercialLoanForm.interest = EqualPrincipalTotalInterest
  EqualPrincipalCommercialLoanForm.monthDecreasingAmount = monthDecreasingAmount
  EqualPrincipalCommercialLoanFormTableData = EqualPrincipalMonthlyPayments

})


/**
 * @description 等额本息计算方式
 * @param principal 贷款本金
 * @param annualRate 年利率（%）
 * @param termInYears 贷款期限（年）
 */
function calculateEqualInstallment(principal, annualRate, termInYears) {
  // 将年利率转换为月利率
  const monthlyRate = annualRate / 100 / 12;
  // 计算还款期数（月）
  const numberOfPayments = termInYears * 12;

  // 等额本息还款公式计算每月还款额
  const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  // 计算总还款额
  const totalPayment = monthlyPayment * numberOfPayments;

  // 计算总利息
  const totalInterest = totalPayment - principal;

  // 存储每月还款信息
  const monthlyPayments = [];
  let remainingPrincipal = principal;

  for (let i = 1; i <= numberOfPayments; i++) {
    // 当前月的利息支付
    const interestPayment = remainingPrincipal * monthlyRate;
    // 当前月的本金支付
    const principalPayment = monthlyPayment - interestPayment;
    // 更新剩余本金
    remainingPrincipal -= principalPayment;

    monthlyPayments.push({
      periods: i,
      monthlyTotalPayment: monthlyPayment.toFixed(2),
      monthlyPrincipalPayment: principalPayment.toFixed(2),
      monthlyInterestPayment: interestPayment.toFixed(2),
      remainingPrincipal: remainingPrincipal.toFixed(2)
    });
  }

  return {
    monthlyPayments: monthlyPayments,
    monthlyPayment: monthlyPayment.toFixed(2), // 每月还款额，保留两位小数
    totalPayment: (totalPayment/10000).toFixed(2),     // 总还款额，保留两位小数
    totalInterest: (totalInterest/10000).toFixed(2)     // 总利息，保留两位小数
  };
}

/**
 * @description 等额本金计算方式
 * @param principal
 * @param annualRate
 * @param termInYears
 */
function calculateEqualPrincipal(principal, annualRate, termInYears) {
  // 将年利率转换为月利率
  const monthlyRate = annualRate / 100 / 12;
  // 计算还款期数（月）
  const numberOfPayments = termInYears * 12;
  // 计算每月应还本金
  const monthlyPrincipal = principal / numberOfPayments;

  let totalInterest = 0;
  let totalPayment = 0;
  let remainingPrincipal = principal;

  // 存储每月还款信息
  const monthlyPayments = [];

  for (let i = 1; i <= numberOfPayments; i++) {
    // 计算每月应还利息
    const monthlyInterest = remainingPrincipal * monthlyRate;
    // 每月还款额
    const monthlyPayment = monthlyPrincipal + monthlyInterest;
    // 累加总利息和总还款额
    totalInterest += monthlyInterest;
    totalPayment += monthlyPayment;
    // 更新剩余本金
    remainingPrincipal -= monthlyPrincipal;
    // 存储每月还款信息
    monthlyPayments.push({
      periods: i,
      monthlyTotalPayment: monthlyPayment.toFixed(2),
      monthlyPrincipalPayment: monthlyPrincipal.toFixed(2),
      monthlyInterestPayment: monthlyInterest.toFixed(2),
      remainingPrincipal: remainingPrincipal.toFixed(2),
    });
  }

  return {
    EqualPrincipalMonthlyPayments: monthlyPayments,
    firstPayment: monthlyPayments[0].monthlyTotalPayment,
    monthDecreasingAmount: (monthlyPayments[0].monthlyTotalPayment - monthlyPayments[1].monthlyTotalPayment).toFixed(2),
    EqualPrincipalTotalPayment: (totalPayment/10000).toFixed(2),
    EqualPrincipalTotalInterest: (totalInterest/10000).toFixed(2), // 总利息，保留两位小数
  };
}






</script>

