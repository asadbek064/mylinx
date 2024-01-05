import { Heading, VStack, Text, Input, Button } from '@chakra-ui/react'
import router from 'next/router'

import { TUser } from 'types/user'

type PlanDataProps = {
  user: TUser
  setUser: (user: TUser) => void
}

const Plandata = ({ user, setUser }: PlanDataProps) => {
  return (
    <VStack align="left" border="1px" borderColor="gray.200" rounded="lg" p={4}>
      <Heading fontSize="2xl">Your Plan data</Heading>
      <VStack align="left" spacing={2}>
        <Text fontWeight="semibold" pb={1}>
        </Text>
        <Button
          colorScheme="green"
          onClick={() => { router.push('/account')}} 
        >
          Manage Subscription 
        </Button>
      </VStack>
    </VStack>
  )
}
export default Plandata
