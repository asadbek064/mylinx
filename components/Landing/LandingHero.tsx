import { Button, Heading, Image, Link, Text, VStack } from '@chakra-ui/react'
const LandingHero = () => {
  return (
    <VStack spacing={4} align="center">
      <VStack spacing={0} align="center">
        <Heading fontSize={{ base: '2xl', md: '4xl', lg: '7xl' }}>The TikTok bio link to rule them all</Heading>
      </VStack>

      <Text
        color="gray.600"
        fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
        textAlign="center"
        pb={2}
      >
        Custom Domains. 9+ Themes. Detailed Analytics. Blazing Fast.
      </Text>

      <Button
        bg="#38A169"
        _hover={{ bg: '#2F855A' }}
        _active={{ bg: '#38A169' }}
        rounded="8px"
        fontSize="xl"
        fontWeight="medium"
        color="white"
        px={{ base: 8, md: 12, lg: 16 }}
        py={7}
        as="a"
        href="/signup"
      >
        Create your Mylinx
      </Button>
      <Link color="gray.500" fontSize="lg" textAlign="center" cursor={'pointer'} href="/login">
        Login
      </Link>
    </VStack>
  )
}

export default LandingHero
