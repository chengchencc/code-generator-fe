import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: false, // boolean | array
    permissions: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {

    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          // TODO: 对接spring security 需要调整
          const result = response.datas
          storage.set(ACCESS_TOKEN, result.access_token, result.expires_in) // 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.datas
          const { realName, headImgUrl, permissions, roles, sysUserId, username, dept } = result

          const userInfo = {
            id: sysUserId,
            code: username,
            name: realName,
            avatar: headImgUrl,
            deptName: dept.deptName,
            deptId: dept.deptId,
            permissions: permissions, // ['dashboard', 'sys', 'project', 'taskcenter'],
            roles: roles // && roles.length > 0 ? roles : ['default']
          }

          // const roleObj = {
          //   'id': 'admin',
          //   'name': '管理员',
          //   'describe': '拥有所有权限',
          //   'status': 1,
          //   'creatorId': 'system',
          //   'createTime': 1497160610259,
          //   'deleted': 0,
          //   'permissions': []
          // }

          // const permissions = []

          // TODO:待调整为服务端获取权限
          // result.role.forEach(roleCode => {
          //   const hasPermission = rolePermissions.supperAdminPermission.permissions.filter(s => {
          //     return s.for.indexOf(roleCode) > -1
          //   })
          //  permissions = permissions.concat(hasPermission).filter(function (item) {
          //     if (this[item.permissionId]) {
          //       return false
          //     } else {
          //       this[item.permissionId] = true
          //       return true
          //     }
          //   }, {})
          // })

          // roleObj.permissions = permissions
          // result.role = roleObj

          // if (result.role && result.role.permissions.length > 0) {
          //   const role = result.role
          //   role.permissions = result.role.permissions
          //   role.permissions.map(per => {
          //     if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
          //       const action = per.actionEntitySet.map(action => { return action.action })
          //       per.actionList = action
          //     }
          //   })
          //   role.permissionList = role.permissions.map(permission => { return permission.permissionId })
          //   commit('SET_ROLES', result.role)
          //   commit('SET_INFO', result)
          // } else {
          //   reject(new Error('getInfo: roles must be a non-null array !'))
          // }

          commit('SET_ROLES', userInfo.roles)
          commit('SET_INFO', userInfo)
          commit('SET_PERMISSIONS', userInfo.permissions)

          commit('SET_NAME', { name: userInfo.name, welcome: welcome() })
          commit('SET_AVATAR', userInfo.avatar)

          resolve(userInfo)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          // resolve()
        }).catch(() => {
          // resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', false)
          storage.remove(ACCESS_TOKEN)
          resolve()
        })
      })
    }

  }
}

export default user
