import { Avatar, Box, Button, Center, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

const LandingExamples = () => {
  const [selectedUser, setSelectedUser] = useState<{ username: string; pfp: string } | null>(null)

  const handleMouseEnter = (user: { username: string; pfp: string }) => {
    if (window.innerWidth < 768) return
    setSelectedUser(user)
  }
  const handleMouseLeave = () => {
    setSelectedUser(null)
  }

  return (
    <VStack spacing={{ base: 4, lg: 2 }}>
      {/* <Heading fontSize={{ base: '3xl', md: '4xl', lg: '6xl' }} textAlign="center">
        heading
      </Heading> */}

      <Button
        bg="#38A169"
        _hover={{ bg: '#2F855A' }}
        _active={{ bg: '#38A169' }}
        transitionDuration="300ms"
        rounded="18px"
        fontSize={{ base: 'xl', lg: '2xl' }}
        py={{ base: 6, lg: 7 }}
        px={{ base: 8, lg: 24 }}
        fontWeight="medium"
        w={{ base: 'full', lg: '75%' }}
        color="white"
        as="a"
        href="/signup"
      >
        Build your link now
      </Button>
    </VStack>
  )
}

export default LandingExamples
