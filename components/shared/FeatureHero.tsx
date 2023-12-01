import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { IoMdArrowRoundForward } from "react-icons/io";

export interface FeatureHero {
  heading: string;
  subHeading: string;
  buttonTitle: string;
  buttonLink: string;
  heroImage: string;
  color: string;
  bgColor: string;
  leftSide: boolean;
}

interface FeatureHeroProp {
  data: FeatureHero
}

const FeatureHero: React.FC<FeatureHeroProp> = ({ data }) => {
  return (
    <>
      <div style={{ backgroundColor: data.bgColor }} className="py-12">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          {data.leftSide ? (
            <>
              <div className="mr-auto place-self-center lg:col-span-7">
                <div className={`max-w-3xl mb-4 text-5xl font-extrabold tracking-tight leading-none md:text-6xl xl:text-7xl text-[${data.color}]`}>
                    {data.heading}
                </div>
                <div className={`max-w-3xl mb-6 font-light text-[${data.color}] lg:mb-8 md:text-xl lg:text-2xl`}>
                    {data.subHeading}
                </div>
              </div>

              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img
                  src="https://media.tenor.com/TKq6Fn71XPgAAAAd/seriously-seriously-cat.gif"
                  alt="mockup"
                />
              </div>

              {data.buttonTitle.length > 0 ? (
                    <Link href={data.buttonLink}>
                    <Button  rightIcon={<IoMdArrowRoundForward />} className="text-neutral-900" colorScheme="green" size="lg"  variant='solid'>
                        {data.buttonTitle}
                </Button>
                </Link>
            ): ('')}
            </>
          ) : (
            <>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img
                  src="https://media.tenor.com/TKq6Fn71XPgAAAAd/seriously-seriously-cat.gif"
                  alt="mockup"
                />
              </div>
              <div className="mr-auto place-self-center lg:col-span-7">
              <div className="mr-auto place-self-center lg:col-span-7">
                <div className={`max-w-3xl mb-4 text-5xl font-extrabold tracking-tight leading-none md:text-6xl xl:text-7xl text-[${data.color}]`}>
                    {data.heading}
                </div>
                    <div className={`max-w-3xl mb-6 font-light text-[${data.color}] lg:mb-8 md:text-xl lg:text-2xl`}>
                        {data.subHeading}
                    </div>
              </div>

                {data.buttonTitle.length > 0 ? (
                    <Link href={data.buttonLink}>
                    <Button  rightIcon={<IoMdArrowRoundForward />} className="text-neutral-900" colorScheme="green" size="lg"  variant='solid'>
                        {data.buttonTitle}
                    </Button>
                    </Link>
                ): ('')}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default FeatureHero
