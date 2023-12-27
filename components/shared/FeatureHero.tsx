import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Link from 'next/link';
import { useEffect } from 'react';

export interface FeatureHero {
  heading: string;
  subHeading: string;
  buttonTitle: string;
  buttonLink: string;
  heroImage: string;
  bgColor: string;
  color: string;
  leftSide: boolean;
  buttonColor: string;
  buttonHoverColor:string;
}

interface FeatureHeroProp {
  data: FeatureHero
}

const FeatureHero: React.FC<FeatureHeroProp> = ({ data }) => {
  const controlsHeading = useAnimation();
  const controlsSubHeading = useAnimation();
  const controlsButton = useAnimation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controlsHeading.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
      });
      controlsSubHeading.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' },
      });
      controlsButton.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.4, ease: 'easeOut' },
      });
    }
  }, [controlsHeading, controlsSubHeading, controlsButton, inView]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      className="py-16"
      style={{ backgroundColor: data.bgColor }}
    >
      <div style={{ backgroundColor: data.bgColor }} className="py-16">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          {data.leftSide ? (
            <>
              <div className="md:mr-12  place-self-center lg:col-span-7">
                <div className={`max-w-2xl mb-4 font-extrabold tracking-tight leading-tight [font-size:var(--step-4)] md:[font-size:var(--step-5)]  text-[${data.color}]`}>
                    {data.heading}
                </div>
                <div className={`max-w-2xl mb-6 font-light text-[${data.color}] lg:mb-8 [font-size:var(--step--1)] md:[font-size:var(--step-1)] font-normal`}>
                    {data.subHeading}
                </div>

                {data.buttonTitle.length > 0 ? (
                   <Link href={data.buttonLink}>
                      <div className={`inline-flex items-center px-5 py-4  font-medium text-center [font-size:var(--step-1)] md:[font-size:var(--step-2)] text-white rounded-full bg-${data.buttonColor}-600 hover:bg-${data.buttonColor}-700 ease-in-out duration-150 focus:ring-4 focus:ring-primary-300`}>
                        {data.buttonTitle}
                      </div>
                    </Link>
                   
                ): ('')}
              </div>

              <div className="hidden lg:mt-0 lg:col-span-4 lg:flex">
                <img
                  src="https://placehold.co/500x500"
                  alt="mockup"
                />
              </div>
            </>
          ) : (
            <>
              <div className="hidden lg:mt-0 lg:col-span-4 lg:flex">
                <img
                  src="https://placehold.co/500x500"
                  alt="mockup"
                />
              </div>
            
              <div className="md:ml-12 place-self-center lg:col-span-7">
                <div className={`max-w-2xl mb-4 font-extrabold tracking-tight leading-tight [font-size:var(--step-4)] md:[font-size:var(--step-5)]  text-[${data.color}]`}>
                    {data.heading}
                </div>
                <div className={`max-w-2xl mb-6 font-light text-[${data.color}] lg:mb-8 [font-size:var(--step--1)] md:[font-size:var(--step-1)] font-normal`}>
                    {data.subHeading}
                </div>

                {data.buttonTitle.length > 0 ? (
                   <Link href={data.buttonLink}>
                      <div className={`inline-flex items-center px-5 py-4  font-medium text-center [font-size:var(--step-1)] md:[font-size:var(--step-2)] text-white rounded-full bg-[${data.buttonColor}] hover:bg-[${data.buttonHoverColor}] ease-in-out duration-150 focus:ring-4 focus:ring-primary-300`}>
                        {data.buttonTitle}
                      </div>
                    </Link>
                   
                ): ('')}
              </div>

    
            </>
          )}
        </div>
      </div>
      </motion.div>
  )
}

export default FeatureHero

