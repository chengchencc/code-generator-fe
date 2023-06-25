import Mock from 'mockjs2'
// import { builder, getBody, getQueryParameters } from '../util'

// const username = ['admin', 'super']
// 强硬要求 ant.design 相同密码
// '21232f297a57a5a743894a0e4a801fc3',
// const password = ['8914de686ab28dc22f30d3d8e107ff6c', '21232f297a57a5a743894a0e4a801fc3'] // admin, ant.design

const responseBody = {
  message: '',
  timestamp: 0,
  result: null,
  code: 0
}

export const builder = (data, message, code = 0, headers = {}) => {
  responseBody.datas = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    responseBody._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}

const login = options => {
  // const body = getQueryParameters(options)
  console.log('mock: body', options)
  // if (!username.includes(body.username) || !password.includes(body.password)) {
  //   return builder({ isLogin: true }, '账户或密码错误', 401)
  // }

  return builder({ access_token: 'mocked-access-token', expires_in: 7 * 24 * 60 * 60 * 1000 })
}

Mock.mock(/\/oauth\/token/, 'post', login)

const getUserInfo = options => {
  return builder(
    {
      realName: 'admin',
      headImgUrl: '',
      permissions: ['dashboard', 'sys', 'project', 'taskcenter'],
      roles: [],
      sysUserId: 'admin',
      username: 'admin',
      dept: { deptName: 'admin' }
    },
    'success',
    200
  )
}
Mock.mock(/\/users\/current/, 'get', getUserInfo)

//   return builder({
//     'id': Mock.mock('@guid'),
//     'name': Mock.mock('@name'),
//     'username': 'admin',
//     'password': '',
//     'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
//     'status': 1,
//     'telephone': '',
//     'lastLoginIp': '27.154.74.117',
//     'lastLoginTime': 1534837621348,
//     'creatorId': 'admin',
//     'createTime': 1497160610259,
//     'deleted': 0,
//     'roleId': 'admin',
//     'lang': 'zh-CN',
//     'token': '4291d7da9005377ec9aec4a71ea837f'
//   }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
// }

// const logout = () => {
//   return builder({}, '[测试接口] 注销成功')
// }

// const smsCaptcha = () => {
//   return builder({ captcha: Mock.mock('@integer(10000, 99999)') })
// }

// const twofactor = () => {
//   return builder({ stepCode: Mock.mock('@integer(0, 1)') })
// }

// Mock.mock(/\/auth\/logout/, 'post', logout)
// Mock.mock(/\/account\/sms/, 'post', smsCaptcha)
// Mock.mock(/\/auth\/2step-code/, 'post', twofactor)
