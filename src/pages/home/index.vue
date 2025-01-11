<template>
  <view class="index">
    <nut-tabs v-model="state.tab1value" type="smile" background="#ffffff">
      <nut-tabpane title="💰算利息">
          <nut-form :model-value="interestForm" ref="interestRefForm">
          <nut-form-item label="本金" label-width="150" prop="capital" required :rules="[{ required: true, message: '请输入本金' }]">
            <nut-input class="input-class" v-model="interestForm.capital" placeholder="请输入本金" type="number" input-align="right">
              <template #rightExtra>
                <text class="suffix">元</text>
              </template>
            </nut-input>
          </nut-form-item>
          <nut-form-item label="天数" label-width="150" prop="days" required :rules="[{ required: true, message: '请输入天数' }]">
            <nut-input class="input-class" v-model="interestForm.days" placeholder="请输入天数" type="number"   input-align="right">
              <template #rightExtra>
                <span class="suffix">天</span>
              </template>
            </nut-input>
          </nut-form-item>
          <nut-form-item label="年化收益率（365）" label-width="150" prop="yield" required :rules="[{ required: true, message: '请输入年化收益率' }]">
            <nut-input class="input-class" v-model="interestForm.yield"  placeholder="请输入" type="number"  input-align="right">>
              <template #rightExtra>
               <span class="suffix">%</span>
              </template>
            </nut-input>
          </nut-form-item>
          <nut-form-item label="利息" label-width="150">
            <view class="interest"><text class="text">{{interestForm.interest}} 元 </text></view>
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
      <nut-tabpane title="💰算收益率">
        <nut-form :model-value="yieldForm" ref="yieldRefForm">
          <nut-form-item label="本金" label-width="150" prop="capital" required :rules="[{ required: true, message: '请输入本金' }]">
            <nut-input class="input-class" v-model="yieldForm.capital" placeholder="请输入本金" type="number" input-align="right">
              <template #rightExtra>
                <text class="suffix">元</text>
              </template>
            </nut-input>
          </nut-form-item>
          <nut-form-item label="天数" label-width="150" prop="days" required :rules="[{ required: true, message: '请输入天数' }]">
            <nut-input class="input-class" v-model="yieldForm.days" placeholder="请输入天数" type="number"   input-align="right">
              <template #rightExtra>
                <span class="suffix">天</span>
              </template>
            </nut-input>
          </nut-form-item>
          <nut-form-item label="利息" label-width="150" prop="yield" required :rules="[{ required: true, message: '请输入利息' }]">
            <nut-input class="input-class" v-model="yieldForm.interest"  placeholder="请输入" type="number"  input-align="right">>
              <template #rightExtra>
                <span class="suffix">元</span>
              </template>
            </nut-input>
          </nut-form-item>
          <nut-form-item label="年化收益率（365）" label-width="150">
            <view class="interest"><text class="text">{{yieldForm.yield}} % </text></view>
          </nut-form-item>
        </nut-form>
        <nut-row type="flex" justify="space-evenly" gutter="12">
          <nut-col :span="10">
            <nut-button plain block @click="handleYieldClear">清空</nut-button>
          </nut-col>
          <nut-col :span="10">
            <nut-button type="primary" block :disabled="calcYieldBtn" @click="handleYieldCalc">计算</nut-button>
          </nut-col>
        </nut-row>
        <nut-row class="share" type="flex" justify="space-evenly" gutter="12">
          <nut-col :span="21">
            <nut-button icon="share" plain block openType="share">分享给好友</nut-button>
          </nut-col>
        </nut-row>
      </nut-tabpane>
      <nut-tabpane title="💰算净值理财">
        <nut-form :model-value="netWorthForm" ref="netWorthRefForm">
          <nut-form-item label="起始日期" label-width="150" prop="startDate" required :rules="[{ required: true, message: '请输入起始日期' }]">
            <nut-input class="input-class" v-model="netWorthForm.startDate" placeholder="请输入起始日期" input-align="right" disabled @click="openDataPickerShow('start')">
            </nut-input>
          </nut-form-item>
          <nut-form-item label="起始净值" label-width="150" prop="startNetWorth" required :rules="[{ required: true, message: '请起始净值' }]">
            <nut-input class="input-class" v-model="netWorthForm.startNetWorth" placeholder="请输入起始净值" type="number"   input-align="right">
            </nut-input>
          </nut-form-item>
          <nut-form-item label="终止日期" label-width="150" prop="endDate" required :rules="[{ required: true, message: '请输入终止日期' }]">
            <nut-input ref="endDate" class="input-class" v-model="netWorthForm.endDate"  placeholder="请输入终止日期" input-align="right" disabled @click="openDataPickerShow('end')">
            </nut-input>
          </nut-form-item>
          <nut-form-item label="终止净值" label-width="150" prop="endNetWorth" required :rules="[{ required: true, message: '请输入终止净值' }]">
            <nut-input class="input-class" v-model="netWorthForm.endNetWorth" type="number" placeholder="请输入终止净值"   input-align="right">>
            </nut-input>
          </nut-form-item>
          <nut-form-item label="年化收益率（365）" label-width="150">
            <view class="interest"><text class="text">{{netWorthForm.yield}} % </text></view>
          </nut-form-item>
        </nut-form>
        <nut-row type="flex" justify="space-evenly" gutter="12">
          <nut-col :span="10">
            <nut-button plain block @click="handleNetWorthClear">清空</nut-button>
          </nut-col>
          <nut-col :span="10">
            <nut-button type="primary" block :disabled="calcYieldBtn" @click="handleNetWorthCalc">计算</nut-button>
          </nut-col>
        </nut-row>
        <nut-row class="share" type="flex" justify="space-evenly" gutter="12">
          <nut-col :span="21">
            <nut-button icon="share" plain block openType="share">分享给好友</nut-button>
          </nut-col>
        </nut-row>
      </nut-tabpane>
<!--      <nut-tabpane title="💰算复利">-->
<!--        <nut-empty image="empty" description="待上线"></nut-empty>-->
<!--      </nut-tabpane>-->
    </nut-tabs>


    <nut-datepicker
      ref="datePicker"
      v-model="currentDate"
      v-model:visible="dataPickerShow"
      :is-show-chinese="true"
      :three-dimensional="false"
      @confirm="confirm"
    ></nut-datepicker>
  </view>
</template>
<script setup lang="ts">
import {reactive, ref, watch} from 'vue';
import './index.scss'
import _ from 'lodash'
import dayjs from "dayjs";

const state = reactive({
  tab1value: '0',
});
const calcInterestBtn = ref(true)
const calcYieldBtn = ref(true)

const interestRefForm = ref<any>(null);
let interestForm = reactive({
    capital: null,
    days: null,
    yield: null,
    interest: null
  })
const yieldForm = reactive({
    capital: null,
    days: null,
    yield: null,
    interest: null
})

const netWorthForm = reactive({
  startDate: null,
  startNetWorth: null,
  endDate: null,
  endNetWorth: null,
  yield: null
})



watch(interestForm,(newVal) => {
  calcInterestBtn.value = _.isEmpty(newVal.capital) || _.isEmpty(newVal.days) || _.isEmpty(newVal.yield);
})

watch(yieldForm,(newVal) => {
  calcYieldBtn.value = _.isEmpty(newVal.capital) || _.isEmpty(newVal.days) || _.isEmpty(newVal.interest);
})

watch(netWorthForm,(newVal) => {
  calcYieldBtn.value = _.isEmpty(newVal.startDate) || _.isEmpty(newVal.startNetWorth) || _.isEmpty(newVal.endDate) || _.isEmpty(newVal.endNetWorth);
})

const handleInterestCalc = () => {
  interestForm.interest = Number((interestForm.capital!! * (interestForm.yield!!/100) * interestForm.days!!)/365).toFixed(2)
}


const handleYieldCalc = () => {
  //年化收益率=［（投资内收益 / 本金）/ 投资天数］ * 365 ×100%
  yieldForm.yield = Number((yieldForm.interest!! / yieldForm.capital!!/ yieldForm.days!!) * 365*100).toFixed(2)
}

const handleInterestClear = () => {
  _.assign(interestForm, {
    capital: null,
    days: null,
    yield: null,
    interest: null
  })
}

const handleYieldClear = () =>{
  _.assign(yieldForm, {
    capital: null,
    days: null,
    yield: null,
    interest: null
  })
}


const dataPickerShow = ref(false)
const currentDate = ref(dayjs().toDate())

const confirm = ( {selectedValue, selectedOptions }) => {
  if (activeInput.value === 'start') {
    netWorthForm.startDate = selectedValue.join('-')
  }else if (activeInput.value === 'end') {
    netWorthForm.endDate = selectedValue.join('-')
  }
  dataPickerShow.value = false
  console.log(selectedValue, selectedOptions);
}

let activeInput = ref("")
const openDataPickerShow =(val:string) =>{
  activeInput.value = val
  dataPickerShow.value = true
  if (val === 'start') {
    currentDate.value = netWorthForm.startDate ? dayjs(netWorthForm.startDate).toDate() : dayjs().toDate()
  }else if (val === 'end') {
    currentDate.value = netWorthForm.endDate ? dayjs(netWorthForm.endDate).toDate() : dayjs().toDate()
  }
}

const handleNetWorthClear = () => {
  _.assign(netWorthForm, {
    startDate: null,
    startNetWorth: null,
    endDate: null,
    endNetWorth: null,
    yield: null
  })
}

const handleNetWorthCalc = () => {
  netWorthForm.yield = Number((netWorthForm.endNetWorth! - netWorthForm.startNetWorth!)/netWorthForm.startNetWorth!/(dayjs(netWorthForm.endDate).diff(netWorthForm.startDate,'day'))*365).toFixed(2)
}

</script>
