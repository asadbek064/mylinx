import { MouseEvent } from 'react'

import { Flex } from '@chakra-ui/react'

import { TIcon, AllIconKeys } from 'types/user'
import ICON_OPTIONS from 'consts/icons'
import { THEMES } from 'consts/themes'
import DynamicIcon, { IconType } from 'components/DynamicIcon'
import { getDeviceType } from 'lib/utils'

type LinksProps = { icon: TIcon; theme: string; userId: string; isPreview?: boolean }

const Icon = ({ icon, theme, userId, isPreview }: LinksProps) => {
  const style = THEMES[theme as keyof typeof THEMES]
  const iconKey = ICON_OPTIONS.find((option) => option.name === icon.name);

  const handleRedirect = async (e: MouseEvent<HTMLDivElement>) => {
    if (isPreview) return
    e.preventDefault()

    const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;

    fetch(BASE_URL + '/api/analytics/hitlink', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mylinxId: userId,
        linkURL: icon.url,
        linkTitle: icon.name,
        referrer: document.referrer || '',
        deviceType: getDeviceType(window.navigator.userAgent),
      }),
    })

    if (icon.url) window.open(icon.url, '_blank')
  }

  return (
    <Flex
      as="a"
      w="fit"
      _hover={{ opacity: 0.8 }}
      _active={{ transform: 'scale(0.95)', opacity: 0.75 }}
      transitionDuration="0.2s"
      cursor="pointer"
      onClick={handleRedirect}
      href={icon.url || ''}
    >
      <DynamicIcon size={24} color={style.icons} icon={iconKey?.icon as AllIconKeys} iconSet={iconKey?.iconSet as IconType} />
    </Flex>
  )
}

export default Icon
