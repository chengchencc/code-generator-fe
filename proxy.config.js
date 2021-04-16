const proxyConfig = {
  // '/api': {
  //   target: 'http://10.10.20.11',
  //   // pathRewrite: { '^/api-cm': 'app-creditmid-service' },
  //   ws: false,
  //   changeOrigin: true
  // }
  '/api-grt': {
    target: 'http://127.0.0.1:8080',
    pathRewrite: { '^/api-grt': '' },
    ws: false,
    changeOrigin: true
  },
  '/api-sample': {
    target: 'http://127.0.0.1:8888',
    pathRewrite: { '^/api-sample': '' },
    ws: false,
    changeOrigin: true
  },
  '/api-cm': {
    target: 'http://10.10.20.11',
    pathRewrite: { '^/api-cm': 'app-creditmid-service-chengch' },
    ws: false,
    changeOrigin: true
  },
  // '/api-cm': {
  //     target: 'http://127.0.0.1:5555',
  //     pathRewrite: { '^/api-cm': '' },
  //     ws: false,
  //     changeOrigin: true
  // },
  '/api-uaa': {
    target: 'http://10.10.20.11',
    ws: false,
    changeOrigin: true
  },
  '/api-user': {
    target: 'http://10.10.20.11',
    // pathRewrite: { '^/api-crm': '' },
    ws: false,
    changeOrigin: true
  },
  '/api-file': {
    target: 'http://10.10.20.11',
    // pathRewrite: { '^/api-crm': '' },
    ws: false,
    changeOrigin: true
  },
  '/ae': {
    target: 'https://sit-custaud.huinongyun.cn',
    ws: false,
    changeOrigin: true
  },
  '/custaud': {
    target: 'https://sit-custaud.huinongyun.cn',
    ws: false,
    changeOrigin: true
  },
  '/kkfileview': {
    target: 'http://10.10.20.11',
    ws: false,
    changeOrigin: true
  }
}

module.exports = proxyConfig
