import 'styles/globals.css'
import { createContext, ReactElement, ReactNode, useEffect, useState } from 'react'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { TUser } from 'types/user'
import { initializePostHog } from 'lib/posthog'

type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode }
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

export const UserContext = createContext({})
export const MylinxProdContext = createContext({})

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  const [user, setUser] = useState<TUser | null>(null)
  const [kyteProd, setMylinxProd] = useState<TUser | null>(null)

  const getUserSession = async () => {
    if (!window.location.pathname.includes(`/edit`)) return
    console.log('%cGetting user session', 'color: white; background-color: black; font-size: 20px')
    const start = new Date().getTime()
    const getuser = await fetch('/api/auth/getuser')
    const { user, publishedMylinx, error } = await getuser.json()

    if (!user || error) {
      console.log('%cNo user found', 'color: white; background-color: black; font-size: 20px')
      return
    }

    setUser(user)
    setMylinxProd(publishedMylinx)

    console.log(
      `%cUser found in ${new Date().getTime() - start}ms`,
      'color: white; background-color: black; font-size: 20px'
    )
  }

  useEffect(() => {
    if (user === null) getUserSession()

    initializePostHog()
  }, [])

  return (
    <ChakraProvider theme={extendTheme({ shadows: { outline: 'none' } })}>
      {getLayout(
        <UserContext.Provider value={{ user, setUser }}>
          <MylinxProdContext.Provider value={{ kyteProd, setMylinxProd }}>
            <Component {...pageProps} />
          </MylinxProdContext.Provider>
        </UserContext.Provider>
      )}
    </ChakraProvider>
  )
}

export default App
