<template>
  <nut-tabs v-model="tabVal" type="smile" background="#ffffff" >
    <nut-tabpane title="等额本息">
      <view class="card">
        <view class="card-content">
          <p class="monthly-payment">每月应还</p>
          <p class="amount-container">
          <span class="amount">{{ combinedEqualInstallmentLoanResult.combinedLoanResult.monthlyPayment }}</span><span class="currency">元</span>
          </p>
          <p class="desc">每月还款金额不变，其中本金逐月递增，利息逐月递减</p>
          <view class="details">
            <view class="detail-item">
              <span>还款总额</span>
              <span>{{combinedEqualInstallmentLoanResult.combinedLoanResult.totalPayment}}万</span>
            </view>
            <view class="detail-item">
              <span>利息总额</span>
              <span>{{combinedEqualInstallmentLoanResult.combinedLoanResult.totalInterest}}万</span>
            </view>
            <view class="detail-item">
              <span>本金总额</span>
              <span>{{(combinedEqualInstallmentLoanResult.combinedLoanResult.totalPayment - combinedEqualInstallmentLoanResult.combinedLoanResult.totalInterest).toFixed(0)}}万</span>
            </view>
          </view>
        </view>
      </view>
      <!--分享按钮 -->
      <view class="share-button">
      <nut-button icon="share" plain block type="primary" openType="share">分享计算结果</nut-button>
      </view>
      <nut-tabs v-model="state.tab1value">
        <nut-tabpane title="月贷款合计">
          <nut-table :columns="state.columns" :data="combinedEqualInstallmentLoanResult.combinedLoanResult.monthlyPayments" :striped="state.striped"></nut-table>
        </nut-tabpane>
        <nut-tabpane title="商业贷款">
          <nut-table :columns="state.columns" :data="combinedEqualInstallmentLoanResult.commercialLoanResult.monthlyPayments" :striped="state.striped"></nut-table>
        </nut-tabpane>
        <nut-tabpane title="公积金贷款">
          <nut-table :columns="state.columns" :data="combinedEqualInstallmentLoanResult.providentFundLoanResult.monthlyPayments" :striped="state.striped"></nut-table>
        </nut-tabpane>
      </nut-tabs>

    </nut-tabpane>
    <nut-tabpane title="等额本金">
      <view class="card">
        <view class="card-content">
          <p class="monthly-payment">首月应还</p>
          <p class="amount-container">
            <span class="amount">{{ combinedEqualPrincipalLoanRes.combinedLoanResult.firstPayment }}</span>
            <span class="currency">元</span>
          </p>
          <p class="desc">每月还款金额递减，本金固定，利息递减约{{combinedEqualPrincipalLoanRes.combinedLoanResult.monthDecreasingAmount}}元</p>
          <view class="details">
            <view class="detail-item">
              <span>贷款总额</span>
              <span>{{combinedEqualPrincipalLoanRes.combinedLoanResult.totalPayment}}万</span>
            </view>
            <view class="detail-item">
              <span>利息总额</span>
              <span>{{combinedEqualPrincipalLoanRes.combinedLoanResult.totalInterest}}万</span>
            </view>
            <view class="detail-item">
              <span>本金总额</span>
              <span>{{(combinedEqualPrincipalLoanRes.combinedLoanResult.totalPayment - combinedEqualPrincipalLoanRes.combinedLoanResult.totalInterest).toFixed(0)}}万</span>
            </view>
          </view>
        </view>
      </view>
      <!--分享按钮 -->
      <view class="share-button">
        <nut-button icon="share" plain block type="primary" openType="share">分享计算结果</nut-button>
      </view>
      <nut-tabs v-model="state.tab1value">
        <nut-tabpane title="月贷款合计">
          <nut-table :columns="state.columns" :data="combinedEqualPrincipalLoanRes.combinedLoanResult.monthlyPayments" :striped="state.striped"></nut-table>
        </nut-tabpane>
        <nut-tabpane title="商业贷款">
          <nut-table :columns="state.columns" :data="combinedEqualPrincipalLoanRes.commercialLoanResult.EqualPrincipalMonthlyPayments" :striped="state.striped"></nut-table>
        </nut-tabpane>
        <nut-tabpane title="公积金贷款">
          <nut-table :columns="state.columns" :data="combinedEqualPrincipalLoanRes.providentFundLoanResult.EqualPrincipalMonthlyPayments" :striped="state.striped"></nut-table>
        </nut-tabpane>
      </nut-tabs>

    </nut-tabpane>
  </nut-tabs>
</template>
<script setup lang="ts">
import './index.scss'
import {onMounted, reactive, ref} from 'vue'
import {getCurrentInstance} from '@tarojs/taro'

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

const paramForm = {
  commercialLoan:{
    amount:0,
    rateOfInterest :0,
    duration : 0
  },
  providentFundLoanForm:{
    amount:0,
    rateOfInterest :0,
    duration:0
  }
}

const combinedEqualInstallmentLoanResult = reactive({
  commercialLoanResult:{},
  providentFundLoanResult:{},
  combinedLoanResult:{}

})

const combinedEqualPrincipalLoanRes = reactive({
  commercialLoanResult:{},
  providentFundLoanResult:{},
  combinedLoanResult:{}
})

onMounted(() => {
  console.log("组合计算")
  if (getCurrentInstance().router.params?.data){
    let data = JSON.parse(decodeURIComponent(getCurrentInstance().router.params?.data))
    paramForm.providentFundLoanForm = data.providentFundLoanForm
    paramForm.commercialLoan = data.commercialLoan
    console.log(paramForm)
    const {
      commercialLoanResult,
      providentFundLoanResult,
      combinedLoanResult
    } = calculateInstallmentCombinedLoan(paramForm.commercialLoan, paramForm.providentFundLoanForm)
    console.log(combinedEqualInstallmentLoanResult)
   combinedEqualInstallmentLoanResult.commercialLoanResult = commercialLoanResult
   combinedEqualInstallmentLoanResult.providentFundLoanResult= providentFundLoanResult
   combinedEqualInstallmentLoanResult.combinedLoanResult = combinedLoanResult
  }

  const {
    commercialEqualPrincipalLoanResult,
    providentFundEqualPrincipalLoanResult,
    combinedEqualPrincipalLoanResult
  } = calculateEqualPrincipalCombinedLoan(paramForm.commercialLoan, paramForm.providentFundLoanForm)
  console.log(combinedEqualInstallmentLoanResult)
  // combinedEqualPrincipalLoanRes.commercialLoanResult = commercialEqualPrincipalLoanResult
  // combinedEqualPrincipalLoanRes.providentFundLoanResult= providentFundEqualPrincipalLoanResult
  // combinedEqualPrincipalLoanRes.combinedLoanResult = combinedEqualPrincipalLoanResult
  console.log(combinedEqualPrincipalLoanRes)

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
 * @description等额本息
 * @param commercialLoan
 * @param providentFundLoan
 */
function calculateInstallmentCombinedLoan(commercialLoan, providentFundLoan){
  const commercialLoanResult = calculateEqualInstallment(commercialLoan.amount*10000, commercialLoan.rateOfInterest, commercialLoan.duration);
  const providentFundLoanResult = calculateEqualInstallment(providentFundLoan.amount*10000, providentFundLoan.rateOfInterest, providentFundLoan.duration);

  const commercialLoanResultMonthlyPayments = []

  const maxLength = Math.max(
    commercialLoanResult.monthlyPayments.length,
    providentFundLoanResult.monthlyPayments.length
  );

  for (let i = 1; i < maxLength; i++) {
    commercialLoanResultMonthlyPayments.push({
      periods: i,
      monthlyTotalPayment: Number(
        Number(commercialLoanResult.monthlyPayments[i]?.monthlyTotalPayment ?? 0) +
        Number(providentFundLoanResult.monthlyPayments[i]?.monthlyTotalPayment ??0)
      ).toFixed(2),
      monthlyPrincipalPayment: Number(
        Number(commercialLoanResult.monthlyPayments[i]?.monthlyPrincipalPayment ?? 0) +
        Number(providentFundLoanResult.monthlyPayments[i]?.monthlyPrincipalPayment ?? 0)
      ).toFixed(2),
      monthlyInterestPayment: Number(
        Number(commercialLoanResult.monthlyPayments[i]?.monthlyInterestPayment ?? 0) +
        Number(providentFundLoanResult.monthlyPayments[i]?.monthlyInterestPayment ?? 0)
      ).toFixed(2),
      remainingPrincipal: Number(
        Number(commercialLoanResult.monthlyPayments[i]?.remainingPrincipal ?? 0) +
        Number(providentFundLoanResult.monthlyPayments[i]?.remainingPrincipal ?? 0)
      ).toFixed(2)
    });
  }


  const combinedLoanResult = {
    monthlyPayments: commercialLoanResultMonthlyPayments,
    monthlyPayment: (Number(commercialLoanResult.monthlyPayment) + Number(providentFundLoanResult.monthlyPayment)).toFixed(2),
    totalPayment: (Number(commercialLoanResult.totalPayment) + Number(providentFundLoanResult.totalPayment)).toFixed(2),
    totalInterest: (Number(commercialLoanResult.totalInterest) + Number(providentFundLoanResult.totalInterest)).toFixed(2)
  }

  return {
    commercialLoanResult,
    providentFundLoanResult,
    combinedLoanResult
  }
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


function calculateEqualPrincipalCombinedLoan(commercialLoan, providentFundLoan){
  const commercialEqualPrincipalLoanResult = calculateEqualPrincipal(commercialLoan.amount*10000, commercialLoan.rateOfInterest, commercialLoan.duration);
  const providentFundEqualPrincipalLoanResult = calculateEqualPrincipal(providentFundLoan.amount*10000, providentFundLoan.rateOfInterest, providentFundLoan.duration);
  console.log('commercialEqualPrincipalLoanResult',commercialEqualPrincipalLoanResult)
  console.log('providentFundEqualPrincipalLoanResult',providentFundEqualPrincipalLoanResult)

  const commercialLoanResultMonthlyPayments = []

  const maxLength = Math.max(
    commercialEqualPrincipalLoanResult.EqualPrincipalMonthlyPayments.length,
    providentFundEqualPrincipalLoanResult.EqualPrincipalMonthlyPayments.length
  );

  for (let i = 1; i < maxLength; i++) {
    commercialLoanResultMonthlyPayments.push({
      periods: i,
      monthlyTotalPayment: Number(
        Number(commercialEqualPrincipalLoanResult.EqualPrincipalMonthlyPayments[i]?.monthlyTotalPayment ?? 0) +
        Number(providentFundEqualPrincipalLoanResult.EqualPrincipalMonthlyPayments[i]?.monthlyTotalPayment ?? 0)
      ).toFixed(2),
      monthlyPrincipalPayment: Number(
        Number(commercialEqualPrincipalLoanResult.EqualPrincipalMonthlyPayments[i]?.monthlyPrincipalPayment ?? 0) +
        Number(providentFundEqualPrincipalLoanResult.EqualPrincipalMonthlyPayments[i]?.monthlyPrincipalPayment ?? 0)
      ).toFixed(2),
      monthlyInterestPayment: Number(
        Number(commercialEqualPrincipalLoanResult.EqualPrincipalMonthlyPayments[i]?.monthlyInterestPayment ?? 0) +
        Number(providentFundEqualPrincipalLoanResult.EqualPrincipalMonthlyPayments[i]?.monthlyInterestPayment ?? 0)
      ).toFixed(2),
      remainingPrincipal: Number(
        Number(commercialEqualPrincipalLoanResult.EqualPrincipalMonthlyPayments[i]?.remainingPrincipal ?? 0) +
        Number(providentFundEqualPrincipalLoanResult.EqualPrincipalMonthlyPayments[i]?.remainingPrincipal ?? 0)
      ).toFixed(2)
    });
  }

  const combinedEqualPrincipalLoanResult = {
    monthlyPayments: commercialLoanResultMonthlyPayments,
    firstPayment: (Number(commercialEqualPrincipalLoanResult.firstPayment) + Number(providentFundEqualPrincipalLoanResult.firstPayment)).toFixed(2),
    monthDecreasingAmount: (commercialLoanResultMonthlyPayments[0].monthlyTotalPayment - commercialLoanResultMonthlyPayments[1].monthlyTotalPayment).toFixed(2),

    totalPayment: (Number(commercialEqualPrincipalLoanResult.EqualPrincipalTotalPayment) + Number(providentFundEqualPrincipalLoanResult.EqualPrincipalTotalPayment)).toFixed(2),
    totalInterest: (Number(commercialEqualPrincipalLoanResult.EqualPrincipalTotalInterest) + Number(providentFundEqualPrincipalLoanResult.EqualPrincipalTotalInterest)).toFixed(2)
  }

  return {
    commercialEqualPrincipalLoanResult,
    providentFundEqualPrincipalLoanResult,
    combinedEqualPrincipalLoanResult
  }
}


</script>

