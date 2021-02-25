<template>
  <div>
    <a-input
      v-if="controlType == cType.InputText"
      :value="computedValue"
      :disabled="disabled"
      @change="handleChange($event.target.value)"></a-input>
    <a-input-number
      v-else-if="controlType == cType.Number"
      :value="computedValue"
      :disabled="disabled"
      @change="handleChange"></a-input-number>
    <a-date-picker
      v-else-if="controlType == cType.Date"
      :value="computedValue"
      :disabled="disabled"
      @change="(time,timeString)=>handleChange(timeString)"></a-date-picker>
    <a-checkbox
      v-else-if="controlType == cType.Boolean"
      :checked="computedValue"
      :disabled="disabled"
      @change="handleChange($event.target.checked)"></a-checkbox>
    <a-select
      v-else-if="controlType == cType.Select"
      :value="computedValue"
      :disabled="disabled"
      @change="handleChange"
      style="width:100%">
      <!-- <a-select-option value="">
        未选择
      </a-select-option> -->
      <a-select-option v-for="(item) in enums" :key="item.value" :value="item.value">
        {{ item.name }}
      </a-select-option>
    </a-select>
    <validation-comp v-else-if="controlType == cType.Object" :value="computedValue" @change="handleChange"></validation-comp>
    <!-- <a-switch v-else-if="controlType == cType.Boolean" :value="computedValue" @change="(c)=>console.log(c)" :disabled="disabled"></a-switch> -->
    <span v-else>不支持</span>
  </div>
</template>

<script>
import ValidationComp from './ValidationComp'

export const ControlType = {
  InputText: 'input',
  Number: 'number',
  Date: 'date',
  Boolean: 'boolean',
  Select: 'select',
  Object: 'object',
  Action: 'action'
}

export default {
  name: 'DynamicFormItem',
  components: {
    ValidationComp
  },
  props: {
    controlType: {
      type: String,
      default: () => ControlType.InputText
    },
    value: {
      type: null,
      default: () => null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    enums: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      cType: ControlType
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted () {},
  computed: {
    computedValue () {
      // return this.value || true
      return this.value
    }
  },
  methods: {
    handleChange (value) {
      console.log('handle', value)
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
