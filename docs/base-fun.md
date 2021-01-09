# 公共框架说明

## 1. 说明

种子工程集成了常用的一些工具，包括用户、权限、字典操作、文件预览、流程表单、工具集等。

## 2. 用户及权限

前端权限只涉及功能权限，功能权限分两种：菜单权限、按钮权限。两种权限控制均通过服务端配置的权限操作进行控制，授权需先确定权限操作字符串，如一个功能【功能A】中有【新增】【编辑】两个按钮，则可定义菜单编号为`FunctionA`,按钮编号`FunctionA.Add`和`FunctionA.Edit`,这个编号需要在【系统管理】->【菜单管理】中进行维护,然后可分配给相应角色。代码按照以下方式调整：

## 2.1. 菜单的权限

菜单的权限在 `router.config.js`中进行配置，在对应的路由配置项中增加`permission`，内容为对应菜单编号。permission为数组，支持配置多个菜单编号。
示例：

```js
          {
            path: '/example/functiona',
            name: 'functiona',
            component: () => import('@/views/functiona/index'),
            meta: { title: '功能A', keepAlive: true, permission: [ 'FunctionA' ] }
          }
```

## 2.2. 按钮的权限

按钮权限已封装成vue指令,配置方式只需要在对应按钮上增加`v-action="'FunctionA.Add'"`绑定对应按钮编号即可。`v-action`目前只支持绑定字符串,暂不支持绑定`state`方法。
示例：

```js
 <a-button type="primary" icon="plus" v-action="'FunctionA.Add'">新增</a-button>

```

## 3. 字典操作

### 3.1. 请求数据字典

- 字典相关取值接口在`./src/api/common.js`定义
- 所有调用通过`vuex`的`action`发出，具体定义在`./src/store/modules/common.js`
- 通过`store.dispatch()`或者`mapActon`等方式调用`getDicts`函数
- 示例如下：

```js
    store.dispatch('getDicts', 
      {
        codes: ['custType', 'areacode_one', 'areacode_sec'],
        isCodeToValue: true, 
        isList: true
      })
  ```

### 3.2. 获取字典值

- 所有字典已经映射到`state`，可以直接从state里面拿到。
- 具体获取方式：
  
  ```js
    state => state.common.dict
  ```

- 字典相关说明见`./src/store/common.js`相关注释

## 4. 文件操作

### 4.1. 文件预览功能

目前文件都是基于文件服务器来进行存储和查看，在`./src/components/FilePreview`文件夹下，封装了文件预览组件，可直接使用

```js
// 导入组件
import FilePreview from '@/components/FilePreview'
// 打开模态框，预览或下载附件
this.$dialog(FilePreview, {
  fileId: 'dee78c20cd8846318a1d181fb2557d4e'
},
  {
    width: 'calc(100vw - 500px)',
    centered: true,
    maskClosable: false,
    footer: false
  }
)
```

## 5. 流程表单控件

在`/src/components/FormLayout`目录下封装了组件`FormLayout`
后端定义`formSchema`，前端基于某些节点id，或者其他信息，获取对应`schema`(具体定义规则见组件内部)。
可在此基础上进行一些功能扩展。

## 6. 工具类

### 6.1. 提供深拷贝工具

```js
import {deepCopy} from '@/utils/objectUtils'
deepCopy(obj)
```

### 6.2. 日期转换工具

用于时间类型转换，详情见 `@/utils/datetime` 注释

```js
import { toDateTime,toDate,parseToDateTime } from '@/utils/datetime'

console.log(parseToDateTime(1608080909963)); // 2020-12-16 9:08:29

console.log(toDateTime(`2020-12-15T08:17:35.536+0000`)); //2020-12-15 08:17:35

console.log(toDate('2020-12-15T08:17:35.536+0000')); //2020-12-15

```

### 6.3. 校验规则

```js

import { idCard,phoneNumber,passWord,email,licensePlateNo } from '@/utils/datetime'

// 手机号校验
console.log('Phone Number', phoneNumber.test('17865169605'))
// 身份证号校验
console.log('ID Card', idCard.test('32087419970908473X'))
// 密码强度校验 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
console.log('Password', passWord.test('ludan123456A?'))
// 邮件正则校验
console.log('Email', email.test('ynlbq@outlook.com'))
// 车牌号校验
console.log('license plate number', licensePlateNo.test('鲁Q0YE11'))

```
