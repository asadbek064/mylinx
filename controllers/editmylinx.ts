import prisma from 'util/ssr/prisma'

import { TUser } from 'types/user'

export const updateMylinxEmail = async (userId: string, email: string) => {
  await prisma.mylinxDraft.updateMany({
    where: { userId },
    data: { email },
  })

  await prisma.mylinxProd.updateMany({
    where: { userId },
    data: { email },
  })

  await prisma.user.update({
    where: { id: userId },
    data: { email },
  })
}

export const updateDraftMylinx = async (userId: string, userData: TUser) => {
  await prisma.mylinxDraft.updateMany({
    where: { userId },
    data: {
      username: userData.username || undefined,
      name: userData.name === '' ? null : userData.name || undefined,
      description: userData.description === '' ? null : userData.description || undefined,
      pfp: userData.pfp || undefined,
      blurpfp: userData.blurpfp || undefined,
      theme: userData.theme || undefined,
      customFont: userData.customFont || undefined,
      customColor: userData.customColor || undefined,
      seoTitle: userData.seoTitle === '' ? null : userData.seoTitle || undefined,
      seoDescription: userData.seoDescription === '' ? null : userData.seoDescription || undefined,
      redirectLink: userData.redirectLink === '' ? null : userData.redirectLink || undefined,
      shouldRedirect: userData.shouldRedirect || false,
      links: (userData.links as any) || undefined,
      icons: userData.icons || undefined,
      vcf: userData.vcf || undefined,
    },
  })
}

export const syncDraftToProd = async (userId: string) => {
  const draftData = await prisma.mylinxDraft.findFirst({
    where: { userId },
  })

  if (draftData) {
    await prisma.mylinxProd.updateMany({
      where: { userId },
      data: {
        username: draftData.username,
        name: draftData.name,
        description: draftData.description,
        pfp: draftData.pfp,
        blurpfp: draftData.blurpfp,
        theme: draftData.theme,
        customFont: draftData.customFont,
        customColor: draftData.customColor,
        seoTitle: draftData.seoTitle,
        seoDescription: draftData.seoDescription,
        redirectLink: draftData.redirectLink,
        shouldRedirect: draftData.shouldRedirect,
        links: draftData.links || undefined,
        icons: draftData.icons || undefined,
        vcf: draftData.vcf || undefined,
      },
    })
  }
}
