const proxyConfig = {
  // '/api': {
  //   target: 'https://sit-creditmis.huinongyun.cn',
  //   // pathRewrite: { '^/api-cm': 'app-creditmid-service' },
  //   ws: false,
  //   changeOrigin: true
  // }
  '/api-test': {
    target: 'http://127.0.0.1:8080',
    pathRewrite: { '^/api-test': '' },
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
    target: 'https://sit-creditmis.huinongyun.cn',
    // pathRewrite: { '^/api-cm': 'app-creditmid-service' },
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
    target: 'https://sit-creditmis.huinongyun.cn',
    ws: false,
    changeOrigin: true
  },
  '/api-user': {
    target: 'https://sit-creditmis.huinongyun.cn',
    // pathRewrite: { '^/api-crm': '' },
    ws: false,
    changeOrigin: true
  },
  '/api-file': {
    target: 'https://sit-creditmis.huinongyun.cn',
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
    target: 'https://sit-creditmis.huinongyun.cn',
    ws: false,
    changeOrigin: true
  }
}

module.exports = proxyConfig
