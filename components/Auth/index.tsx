import { useEffect, useState } from 'react';
import Script from 'next/script';
import { motion, Transition } from 'framer-motion';

import {
  Button,
  Heading,
  HStack,
  VStack,
  Text,
  Box,
  Input,
  Center,
  useToast,
  Link,
  background,
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import { signIn } from 'next-auth/react'

import { IoIosArrowBack } from 'react-icons/io'
import { FaArrowRight, FaGithub, FaGoogle } from 'react-icons/fa'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { trackClientEvent } from 'lib/posthog'
import { PosthogEvents } from 'consts/posthog'

const PROVIDERS = [
  { name: 'Google', icon: FaGoogle, color: 'blue.500' },
  { name: 'Github', icon: FaGithub, color: 'gray.800' },
]

const AuthComponent = ({ isLogin }: { isLogin: boolean }) => {
  const toast = useToast()

  const [email, setEmail] = useState<string>('')
  const [emailLoading, setEmailLoading] = useState<boolean>(false)
  const [googleLoading, setGoogleLoading] = useState<boolean>(false)
  const [githubLoading, setGithubLoading] = useState<boolean>(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const validateDebouncer = debounce((name) => {
    validate(name)
  }, 150)

  const validate = async (name: string) => {
    if (!name || name.length < 3) {
      setIsValid(false)
      return false
    }

    if (!name.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setIsValid(false)
      return false
    }

    setIsValid(true)
    setEmail(name)
    return true
  }

  const authSocial = async (provider: string) => {
    const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL

    if (provider === 'google') setGoogleLoading(true)
    if (provider === 'github') setGithubLoading(true)

    await signIn(provider, {
      callbackUrl: `${BASE_URL}/edit`,
    })

    setTimeout(() => {
      if (provider === 'google') setGoogleLoading(false)
      if (provider === 'github') setGithubLoading(false)
    }, 200)
  }

  const authEmail = async () => {
    const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;

    setEmailLoading(true)

    const isValid = await validate(email)
    if (!isValid) {
      setEmailLoading(false)
      toast({ title: 'Invalid email', status: 'error', duration: 3000 })
      return
    }

    await signIn('email', {
      email,
      callbackUrl: `${BASE_URL}/edit`,
    })

    setTimeout(() => {
      setEmailLoading(false)
    }, 500)
  }

  useEffect(() => {
    trackClientEvent({ event: PosthogEvents.HIT_AUTH })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.25 }}
    >
    <>
      <NextSeo title={`${isLogin ? 'Log in' : 'Sign up'} | mylinx`} />
      
      <Center px={{ base: 5, md: 8 }} pt={{ base: '7rem', md: '15rem' }}>

        <div className="w-full bg-cover bg-center absolute z-20" id="fog-wp"></div>

        <VStack spacing={6} w="35rem" align="left">
          <VStack spacing={1} align="left">
            <Heading fontSize={{ base: '3xl', md: '4xl' }} color="black">
              {isLogin ? 'Log in to mylinx' : 'Create a mylinx'}
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'lg' }} color="gray.600">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <Link href={isLogin ? '/signup' : '/login'} color="blue.500">
                {isLogin ? 'Create one' : 'Log in'}
              </Link>
            </Text>
          </VStack>

          <VStack spacing={3}>
            <Input
              as={motion.input}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: '150ms',
                type: 'easeIn'
              }} 

              _hover={{ bg: 'gray.100' }}
              _focus={{
                bg: 'gray.100',
                borderColor: isValid === null ? 'gray.500' : isValid ? 'green.500' : 'red.500',
              }}
              borderColor={isValid === null ? 'gray.300' : isValid ? 'green.600' : 'red.500'}
              transitionDuration="250ms"
              onChange={(e) => {
                validateDebouncer(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') authEmail()
              }}
              placeholder="hermanmillar@example.com"
            />
            <Button
             as={motion.button}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.15}}

              style={{backgroundColor: "#22c55e"}}
               w="full"
              textColor="white"
              _hover={isValid !== false && !emailLoading ? { opacity: 0.8 } : {}}
              _active={isValid !== false && !emailLoading ? { opacity: 0.5 } : {}}
              transition="0.15s"
              onClick={authEmail}
              isLoading={emailLoading}
              isDisabled={isValid === null ? false : isValid === false ? true : false}
            >
              Continue <Box as={FaArrowRight} pl={2} size="20px" />
            </Button>
          </VStack>

          <HStack>
            <Box bg="gray.300" w="full" h="1px" />
            <Text px={8}>or</Text>
            <Box bg="gray.300" w="full" h="1px" />
          </HStack>

          <VStack spacing={3}>
            {PROVIDERS.map((item, i) => (
              <Button
               as={motion.button}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.15}}

                key={i}
                bg={item.color}
                textColor="white"
                w="full"
                _hover={!googleLoading && !githubLoading ? { opacity: 0.8 } : {}}
                _active={!googleLoading && !githubLoading ? { opacity: 0.5 } : {}}
                onClick={() => authSocial(item.name.toLowerCase())}
                isLoading={item.name.toLowerCase() === 'google' ? googleLoading : githubLoading}
              >
                <Box as={item.icon} color="white" size="20px" />
                <Text pl={2}> Continue with {item.name}</Text>
              </Button>
            ))}
          </VStack>
          <Text fontSize="sm" color="gray.500">
            By continuing, you agree to mylinx's{' '}
            <Link href="/tos.pdf" color="blue.500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy.pdf" color="blue.500">
              Privacy Policy
            </Link>
            .
          </Text>
        </VStack>
      </Center>
    </>
    </motion.div>
  )
}
export default AuthComponent
