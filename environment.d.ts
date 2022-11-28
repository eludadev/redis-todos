declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production'
      REDIS_USERNAME: string
      REDIS_PASSWORD: string
      REDIS_HOST: string
      REDIS_PORT: string
    }
  }
}

export {}
