import { VStack, Heading, SimpleGrid, Center, Text, HStack, Button } from '@chakra-ui/react'
import { LANDING_DOMAINS } from 'consts/landingpage'

const LandingDomains = () => {
  return (
    <VStack spacing={8}>
      <VStack spacing={0} textAlign="center">
        <Heading fontSize={{ base: '3xl', md: '4xl', lg: '6xl' }}>Use our domain.</Heading>
        <Heading fontSize={{ base: '3xl', md: '4xl', lg: '6xl' }}>Or bring your own.</Heading>
      </VStack>
      <SimpleGrid columns={1} spacing={4} w="full">
        {LANDING_DOMAINS.map((domain) => (
          <Center
            bg={`#${domain.color}`}
            rounded="xl"
            alignContent="center"
            key={domain.text}
            py={{ base: 2, lg: 3 }}
            px={{ base: 2, lg: 12 }}
          >
            <Text color="gray.700" fontWeight="medium" fontSize={{ base: 'md', lg: '2xl' }}>
              {domain.text}
            </Text>
          </Center>
        ))}
      </SimpleGrid>
      <HStack w="100%" spacing={4}>
        <VStack
          bg="#BEE3F8"
          border={1}
          borderColor="#EEEEEE"
          rounded="xl"
          p={4}
          py={{ base: 16, lg: 24 }}
          w="full"
          spacing={0}
          borderWidth={4}
        >
          <Text fontSize={{ base: '2xl', lg: '5xl' }} fontWeight="bold">
            400ms
          </Text>
          <Text fontSize={{ base: 'sm', lg: 'lg' }}>Mylinx Loads Fast.</Text>
        </VStack>
        <VStack
          bg="#FEFCBF"
          border={1}
          borderColor="#EEEEEE"
          rounded="xl"
          p={4}
          w="full"
          py={{ base: 16, lg: 24 }}
          spacing={0}
          borderWidth={4}
        >
          <Text fontSize={{ base: '2xl', lg: '5xl' }} fontWeight="bold">
            9 Themes
          </Text>
          <Text fontSize={{ base: 'sm', lg: 'lg' }}>Mylinx Looks Elegant.</Text>
        </VStack>
      </HStack>
      <Button
        bg="#38A169"
        _hover={{ bg: '#2F855A' }}
        _active={{ bg: '#38A169' }}
        transitionDuration="300ms"
        rounded="18px"
        py={{ base: 6, lg: 7 }}
        fontSize={{ base: 'xl', lg: '2xl' }}
        fontWeight="medium"
        w="full"
        color="white"
        as="a"
        href="/signup"
      >
        Try it out for free
      </Button>
    </VStack>
  )
}

export default LandingDomains
