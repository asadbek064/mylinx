import { Button, Center, Heading, HStack, Image, Link, Text, VStack, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'

const Verify = () => {
  const router = useRouter()
  return (
    <Center px={{ base: 5, md: 8 }} pt={{ base: '7rem', md: '12rem' }}>
      <Box
        pos="absolute"
        top="0"
        left="0"
        px={{ base: 0, md: 8 }}
        py={4}
        cursor="pointer"
        onClick={() => router.back()}
      >
        <HStack
          _hover={{ background: 'gray.100' }}
          rounded="full"
          p={2}
          px={4}
          transitionDuration="300ms"
        >
          <IoIosArrowBack color="#374051" />
          <Text fontSize="md" fontWeight="bold" color="gray.700">
            Back
          </Text>
        </HStack>
      </Box>
      <VStack align="left" spacing={6} w="40rem">
        <Image src="/logo.png" alt="mylinx Logo"  />
        <VStack spacing={1} align="left">
          <Heading fontSize={{ base: '3xl', md: '4xl' }} color="black">
            We sent you an email!
          </Heading>
          <Text fontSize={{ base: 'sm', md: '2xl' }} color="gray.700">
            Check your inbox for an email from <Link color="blue.500">auth@mylinx.cc</Link>{' '}
            and click on the verification link. If you can't find the email, it might be in your spam folder. :)
          </Text>
        </VStack>
      </VStack>
    </Center>
  )
}

export default Verify
