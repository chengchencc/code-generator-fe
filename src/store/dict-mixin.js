import { mapState } from 'vuex'

const dictMixin = {
  computed: {
    ...mapState({
      dict: state => state.common.dict,
      dictCodeVaue: state => state.common.dict.codeToValue.list,
      dictValueCode: state => state.common.dict.valueToCode,
      dictTree: state => state.common.dict.codeToValue.tree
    })
  },
  methods: {
    codeValueRender (propName, value) {
      if (this.dictCodeVaue[propName] && this.dictCodeVaue[propName]) {
        return this.dictCodeVaue[propName][value]
      }
      return value
    }
  }
}

export {
  dictMixin
}
