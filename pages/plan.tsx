import { Price, PriceInterval, Product, Subscription } from '@prisma/client'
import classNames from 'classnames'
import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

import getStripe from 'util/getStripe'
import { prisma } from 'util/ssr'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { IoIosArrowBack, IoIosCheckmark } from 'react-icons/io'
import { Button } from '@chakra-ui/react'

type Props = {
  products: (Product & { prices: Price[] })[]
}

const Page: NextPage<Props> = ({ products }) => {
  const [subscription, setSubscription] = useState<Subscription>()
  const { status } = useSession()
  const router = useRouter()

  const [billingInterval, setBillingInterval] = useState<PriceInterval>('month')
  const [activeAccordion, setActiveAccordion] = useState<boolean>(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (status === 'authenticated') {
        const res = await fetch('/api/user/subscription')

        const data = await res.json()

        if (data.subscription) {
          setSubscription(data.subscription)
        }
      }
    })()

    setMobile(isMobile)
  }, [status, isMobile])

  const handlePricingClick = useCallback(
    async (priceId: string) => {
      if (status !== 'authenticated') {
        return router.push('/login')
      }

      if (subscription) {
        return router.push('/account')
      }

      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          price: priceId,
        }),
      })

      const data = await res.json()

      const stripe = await getStripe()

      stripe?.redirectToCheckout({ sessionId: data.sessionId })
    },
    [status, router, subscription]
  )

  return (
    <div className="bg-white">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12">
          <Button
            className="space-x-2"
            onClick={() => {
              router.back()
            }}
          >
            <IoIosArrowBack />
            <span>Back</span>
          </Button>
        </div>

        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="[font-size:var(--step-3)] md:[font-size:var(--step-4)] font-extrabold text-gray-800 sm:text-center">
            Find the plan for you
          </h1>
          <div className="[font-size:var(--step--0)] md:[font-size:var(--step--1)] pt-2 text-gray-600 sm:text-center">
            You can change at anytime
          </div>

          <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex sm:mt-8 space-x-2">
            <button
              onClick={() => setBillingInterval('month')}
              type="button"
              className={classNames(
                'relative w-1/2  py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-lime-500 focus:z-10 sm:w-auto sm:px-8 rounded-lg',
                {
                  'bg-white border-gray-200 shadow-sm rounded-md text-gray-900':
                    billingInterval === 'month',
                  'bg-transparent': billingInterval !== 'month',
                }
              )}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              type="button"
              className={classNames(
                'relative w-1/2 bg-white  py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-lime-500 focus:z-10 sm:w-auto sm:px-8 rounded-lg',
                {
                  'bg-white border-gray-200 shadow-sm rounded-md text-gray-900':
                    billingInterval === 'year',
                  'bg-transparent': billingInterval !== 'year',
                }
              )}
            >
              Yearly billing
            </button>
          </div>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
          {products
            .sort(
              (a, b) =>
                a?.prices?.find((one) => one.interval === billingInterval)?.unitAmount! -
                b?.prices?.find((one) => one.interval === billingInterval)?.unitAmount!
            )
            .map((product, index) => {
              const price: Price = (product as any)?.prices?.find(
                (one: Price) => one.interval === billingInterval
              )

              if (!price) {
                return null
              }

              return (
                <div
                  key={product.name}
                  className={classNames(
                    'border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200',
                    {
                      'ring-lime-500 ring-2': subscription?.priceId === price.id,
                    }
                  )}
                >
                  <div className="p-6">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">{product.name}</h2>
                    <p className="mt-4 text-sm text-gray-500">{product.description}</p>
                    <p className="mt-8">
                      <span className="text-4xl font-extrabold text-gray-900">
                        ${price.unitAmount! / 100}
                      </span>{' '}
                      <span className="text-base font-medium text-gray-500">
                        {billingInterval === 'month' && <>/month</>}
                        {billingInterval === 'year' && <>/year</>}
                      </span>
                    </p>
                    <a
                      onClick={() => handlePricingClick(price.id)}
                      className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white bg-primary-500 border border-lime rounded-md hover:bg-primary-600 hover:cursor-pointer duration-150 ease-in"
                    >
                      Get {product.name}
                    </a>
                  </div>
                  <div className="px-6 pb-8">
                    <div className="mt-2">
                      <div className="transition-all duration-300 ease-in-out">
                        {mobile ? (
                          <>
                            <button
                              onClick={() => setActiveAccordion(!activeAccordion)}
                              className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:lime-indigo-500"
                            >
                              <span>Everything in {product.name}</span>
                              <span className="flex items-center">
                                {activeAccordion ? <FaChevronUp /> : <FaChevronDown />}
                              </span>
                            </button>

                            {activeAccordion && (
                              <ul
                                role="list"
                                className={`mt-3 space-y-2 ${
                                  activeAccordion ? 'block' : 'hidden'
                                } duration-300 ease-in-out`}
                              >
                                {product.name === 'Starter' && (
                                  <>
                                    {[
                                      'Customizable themes, buttons and fonts',
                                      'Clicks and views for past 90 days',
                                      'Spotlight, schedule and animate links',
                                      'Collect email and phone numbers',
                                      'Remove the Mylinx logo',
                                      'Priority support, response time 24 hours',
                                    ].map((feature, idx) => (
                                      <li
                                        key={idx}
                                        className="pl-8 border-l-2 border-gray-200 flex flex-row space-x-2 py-1"
                                      >
                                        <IoIosCheckmark />
                                        <span className="text-md text-gray-700">{feature}</span>
                                      </li>
                                    ))}
                                  </>
                                )}

                                {product.name === 'Pro' && (
                                  <>
                                    {[
                                      'Enhanced customization of themes',
                                      'Clicks and views for past 365 days',
                                      'Integrations with Mailchimp, Google Analytics and more',
                                      'Automatically embed your latest Tweet or YouTube video',
                                    ].map((feature, idx) => (
                                      <li
                                        key={idx}
                                        className="pl-8 border-l-2 border-gray-200 flex flex-row space-x-2 py-1"
                                      >
                                        <IoIosCheckmark />
                                        <span className="text-md text-gray-700">{feature}</span>
                                      </li>
                                    ))}
                                  </>
                                )}
                              </ul>
                            )}
                          </>
                        ) : (
                          <>
                            <span>Everything in {product.name}</span>
                            <ul role="list" className={`mt-3 space-y-2 duration-300 ease-in-out`}>
                              {product.name === 'Starter' && (
                                <>
                                  {[
                                    'Customizable themes, buttons and fonts',
                                    'Clicks and views for past 90 days',
                                    'Spotlight, schedule and animate links',
                                    'Collect email and phone numbers',
                                    'Remove the Mylinx logo',
                                    'Priority support, response time 24 hours',
                                  ].map((feature, idx) => (
                                    <li
                                      key={idx}
                                      className="pl-8 border-l-2 border-gray-200 flex flex-row space-x-2 py-1"
                                    >
                                      <IoIosCheckmark />
                                      <span className="text-md text-gray-700">{feature}</span>
                                    </li>
                                  ))}
                                </>
                              )}

                              {product.name === 'Pro' && (
                                <>
                                  {[
                                    'Enhanced customization of themes',
                                    'Clicks and views for past 365 days',
                                    'Integrations with Mailchimp, Google Analytics and more',
                                    'Automatically embed your latest Tweet or YouTube video',
                                  ].map((feature, idx) => (
                                    <li
                                      key={idx}
                                      className="pl-8 border-l-2 border-gray-200 flex flex-row space-x-2 py-1"
                                    >
                                      <IoIosCheckmark />
                                      <span className="text-md text-gray-700">{feature}</span>
                                    </li>
                                  ))}
                                </>
                              )}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const products = await prisma?.product.findMany({
    where: {
      active: true,
    },
    include: {
      prices: {
        where: {
          active: true,
        },
      },
    },
  })

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}

export default Page
