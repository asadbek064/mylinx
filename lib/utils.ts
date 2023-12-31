import { Device } from 'types/utils'

export const getDeviceType = (userAgent?: string): Device => {
  let deviceType = Device.UNKNOWN

  if (!userAgent) return deviceType

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    deviceType = Device.TABLET
  } else if (
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Acceleration|(HPwOS|webOS|BrowserNG|BB10|xoom|P160U|SCH-I800|Nexus 10)/i.test(
      userAgent
    )
  ) {
    deviceType = Device.MOBILE
  } else if (
    /Chrome|Firefox|Safari|Opera|MSIE|Edge|IEMobile|Windows Phone|Trident/i.test(userAgent)
  ) {
    deviceType = Device.DESKTOP
  }

  return deviceType
}

export function cleanPrismaData(obj: any) {
  for (const key in obj) {
    if (typeof obj[key] === 'bigint') {
      obj[key] = Number(obj[key])
    } else if (obj[key] instanceof Date) {
      obj[key] = obj[key].toISOString()
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      cleanPrismaData(obj[key])
    }
  }

  return obj
}


export const randomID = (length: number = 8): string => {
  let result:string = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let counter = 0;

  while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * 62));
      counter += 1;
  }

  return result;
}
