import 'styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import Head from 'next/head'
import type { AppProps } from 'next/app'

import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  return <div>
    <Head>
      <title>Redis Todos</title>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>

    <main className="md:w-96 mx-4 md:mx-auto mt-4">
      <h1 className="font-bold text-5xl text-center">todos</h1>
      <Component {...pageProps} />
    </main>
  </div>
}
