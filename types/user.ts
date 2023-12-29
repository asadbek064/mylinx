import * as faIcons from 'react-icons/fa';
import * as siIcons from 'react-icons/si';

export type TUser = {
  id: string
  userId?: string
  email?: string
  createdAt: Date | string
  username?: string
  name: string
  description: string
  pfp: string
  blurpfp: string
  theme: string
  customFont?: string
  customColor?: string
  seoTitle?: string
  seoDescription?: string
  redirectLink?: string
  shouldRedirect?: boolean
  links: TLink[]
  icons: TIcon[]
  isNewUser: boolean
  vcf?: Vcf | null
  domains?: string[]
  isPreview?: boolean
}
export type TLink = {
  color?: string
  emoji?: string
  link: string
  title: string
  isPreview?: boolean
  value?: unknown
}

export type TIcon = {
  name: AllIconKeys
  url: string | null | undefined
  isPreview?: boolean
}

export type AllIconKeys = keyof typeof faIcons | keyof typeof siIcons;
export type FaIconKey = keyof typeof faIcons

export type TUserContext = {
  user: TUser | null
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>
}
export type TMylinxProdContext = {
  mylinxProd: TUser | null
  setMylinxProd: React.Dispatch<React.SetStateAction<TUser | null>>
}

export type Vcf = {
  firstName?: string
  lastName?: string
  birthday?: string
  email?: string
  phone?: string
  company?: string
  note?: string
}
