import { AllIconKeys, FaIconKey, TIcon } from 'types/user'
import DynamicIcon, { IconType } from 'components/DynamicIcon'
import ICON_OPTIONS from 'consts/icons'

const Icon = ({ icon: iconProp }: { icon: TIcon }) => {
  const icon = ICON_OPTIONS.find((option) => option.name === iconProp.name);

  
  return <DynamicIcon size="40" icon={icon?.icon as AllIconKeys} iconSet={icon?.iconSet as IconType}   />
}

export default Icon
