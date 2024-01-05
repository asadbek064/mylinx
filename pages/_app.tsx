import 'styles/globals.css'
import '@fontsource-variable/lexend';

import { createContext, ReactElement, ReactNode, useEffect, useState } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { TUser } from 'types/user'
import { initializePostHog } from 'lib/posthog'
import BaseLayout from 'components/layout/BaseLayout';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode }
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

export const UserContext = createContext({})
export const MylinxProdContext = createContext({})

const theme = extendTheme({
  fonts: {
    heading: `'Lexend Variable', sans-serif`,
    body: `'Lexend Variable', sans-serif`,
  },
  shadows: { outline: 'none' } 
})


const App = ({ Component, pageProps: { session, ...otherProps } }: AppPropsWithLayout) => {
  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => <BaseLayout>{page}</BaseLayout>);
    
  const [user, setUser] = useState<TUser | null>(null)
  const [mylinxProd, setMylinxProd] = useState<TUser | null>(null)

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
    <React.Fragment>
      <ChakraProvider theme={theme}>
        {getLayout(
          <UserContext.Provider value={{ user, setUser }}>
            <MylinxProdContext.Provider value={{ mylinxProd, setMylinxProd }}>
              <SessionProvider session={session}>
                <Component {...otherProps} />
              </SessionProvider>
            </MylinxProdContext.Provider>
          </UserContext.Provider>
        )}
      </ChakraProvider>
    </React.Fragment>
  )
}

export default App
