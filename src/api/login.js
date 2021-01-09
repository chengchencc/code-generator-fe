import request from '@/utils/request'
import Qs from 'qs'

const userApi = {
  // Login: '/auth/login',
  Login: '/api-uaa/oauth/token',

  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // UserInfo: '/user/info',
  UserInfo: '/api-user/users/current',

  UserMenu: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  // return request({
  //   url: userApi.Login,
  //   method: 'post',
  //   data: parameter
  // })
  // ===Spring security form login
  var btoa = window.btoa('webApp' + ':' + 'webApp')

  parameter = { ...parameter, grant_type: 'password' }

  return request({
    url: userApi.Login,
    baseURL: process.env.VUE_APP_API_LOGIN_URL,
    headers: {
      'Authorization': 'Basic ' + btoa,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    method: 'post',
    data: Qs.stringify(parameter)
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: userApi.UserInfo,
    baseURL: process.env.VUE_APP_API_LOGIN_URL,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
  // return request({
  //   url: userApi.UserInfo,
  //   method: 'get',
  //   headers: {
  //     'Content-Type': 'application/json;charset=UTF-8'
  //   }
  // })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}
