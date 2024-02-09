if (typeof global.window === 'undefined') {
  global.window = {} as any
}

(global.window as any).injectedWeb3 = {
  web3hub: {
    version: '1.0.0',
    enable: async () => ({
      accounts: {
        get: async () => [
          {
            address: '123',
            name: 'Mocked Wallet',
            type: 'sr25519'
          }
        ]
      }
    })
  }
}

export { }
