<template>
  <div>
    <div class="containers">
      <div class="canvas" ref="canvas"></div>
      <div id="js-properties-panel"></div>
      <div class="toolbar">
        <a-button type="button">保存</a-button>
        <a ref="saveSvg" href="javascript:" title="保存为svg">保存为svg</a>
        <a ref="saveDiagram" href="javascript:" title="保存为bpmn">保存为bpmn</a>
      </div>
    </div>
  </div>

</template>

<script>
// 引入相关的依赖
import BpmnModeler from 'bpmn-js/lib/Modeler'

import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

import demo from './guarantee-process.bpmn' // 这里是直接引用了xml字符串

export default {
  name: 'BpmnDesigner',
  components: {},
  data () {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted () {
    this.init()
  },

  methods: {
    init () {
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas
      // 建模
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        // 添加控制板
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        additionalModules: [
          // 右边的属性栏
          propertiesProviderModule,
          propertiesPanelModule
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      })
      this.createNewDiagram()
    },
    createNewDiagram () {
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(demo, (err) => {
        if (err) {
          console.error(err)
        } else {
          // 这里是成功之后的回调, 可以在这里做一系列事情
          this.success()
        }
      })
    },
    success () {
      console.log('创建成功!')
      this.addBpmnListener()
    },
    // 添加绑定事件
    addBpmnListener () {
      // 获取a标签dom节点
      const downloadLink = this.$refs.saveDiagram
      const downloadSvgLink = this.$refs.saveSvg

      const that = this

      // 给图绑定事件，当图有发生改变就会触发这个事件
      this.bpmnModeler.on('commandStack.changed', function () {
        that.saveDiagram((errr, xml) => {
          console.log(xml) // 这里获取到的就是最新的xml信息
          that.setEncoded(downloadLink, 'diagram.bpmn', errr ? null : xml)
        })
        that.saveSVG((errr, svg) => {
          that.setEncoded(downloadSvgLink, 'diagram.svg', errr ? null : svg)
          console.log(svg) // 这里获取到的就是最新的xml信息
        })
      })
    },
    // 下载为bpmn格式,done是个函数，调用的时候传入的
    saveDiagram (done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      this.bpmnModeler.saveXML({ format: true }, function (err, xml) {
        done(err, xml)
      })
      // this.bpmnModeler.save
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveSVG (done) {
      // 把传入的done再传给bpmn原型的saveSVG函数调用
      this.bpmnModeler.saveSVG(done)
    },

    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded (link, name, data) {
      // 把xml转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data)
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      console.log(link, name, data)
      const xmlFile = new File([data], 'test.bpmn')
      console.log(xmlFile)
      if (data) {
        link.className = 'active'
        link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
        link.download = name
      }
    }
  }
}
</script>

<style lang="less">
/* 以下为bpmn工作流绘图工具的样式 */
@import '~bpmn-js/dist/assets/diagram-js.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

// 右边工具栏样式
@import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';

.containers {
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
}
.toolbar {
  position: absolute;
  top: 0;
  left: 100px;
  right: 300px;
  border: 1px solid #ccc;
}
.canvas {
  width: 100%;
  height: 100%;
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}
#js-properties-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 300px;
  z-index: 10;
  border-left: 1px solid #ccc;
  overflow: auto;
  &:empty {
    display: none;
  }
  > .djs-properties-panel {
    padding-bottom: 70px;
    min-height: 100%;
  }
}
</style>
