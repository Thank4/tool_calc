<script setup lang="ts">
import {reactive} from "vue";

const state = reactive({
  tab1value: '0',
});
</script>

<template>
  <view class="index">
    <nut-tabs v-model="state.tab1value" type="smile" background="#ffffff">
      <nut-tabpane title="💰商业贷款">
      </nut-tabpane>
      <nut-tabpane title="💰组合贷款">

      </nut-tabpane>
      <nut-tabpane title="💰公积金贷款">
      </nut-tabpane>
    </nut-tabs>


  </view>
</template>

