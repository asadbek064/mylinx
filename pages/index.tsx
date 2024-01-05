import { VStack } from '@chakra-ui/react'

import { NextSeo } from 'next-seo'

import { useEffect } from 'react'
import { trackClientEvent } from 'lib/posthog'
import { PosthogEvents } from 'consts/posthog'

import LandingFooter from 'components/Landing/LandingFooter'
import LandingHeroFull from 'components/Landing/LandingHeroFull'
import FeatureHero from 'components/shared/FeatureHero'
import { LANDING_FEATURES } from "consts/landingpage";

const Home = () => {
  useEffect(() => {
    trackClientEvent({ event: PosthogEvents.HIT_LANDING })
  }, [])
  return (
    <>
      <NextSeo
        title="Mylinx - Simple & Free Link-In-Bio"
        description="Mylinx is an opensource Linktree alternative that allows you to share all your links in one place. Add custom domains, view click statistics and more."
        canonical="https://mylinx.cc"
      />
       <LandingHeroFull />

       <div className='flex flex-col'>
        <FeatureHero data={LANDING_FEATURES[0]} />
        <FeatureHero data={LANDING_FEATURES[1]} />
        {/* <LandingAnalytics /> */}
        <FeatureHero data={LANDING_FEATURES[2]} />
        </div>


        

      <VStack
        minH={{ base: '80vh', lg: '90vh' }}
        justify="space-between"
        spacing={{ base: 20, lg: 48 }}
        mt={{ base: 52, lg: 60 }}
        color="black"
      >
        <VStack spacing={22}>
          {/* <LandingAnalytics /> */}
          <LandingFooter />
        </VStack>
      </VStack>
    </>
  )
}

export default Home
