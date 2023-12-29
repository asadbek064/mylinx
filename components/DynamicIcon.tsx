import * as faIcons from 'react-icons/fa';
import * as siIcons from 'react-icons/si';

type FaIconNames = keyof typeof faIcons;
type SiIconNames = keyof typeof siIcons;

export type IconType = 'Fa' | 'Si';

type AllIconNames = FaIconNames | SiIconNames; 

type DynamicIconProps = {
  icon: AllIconNames; 
  size?: string | number;
  color?: string;
  iconSet?: IconType; // Specify the icon set (fa or si)
};

const DynamicIcon = ({ icon, size, color, iconSet = 'Fa' }: DynamicIconProps) => {
  let selectedIcon;

  if (iconSet === 'Fa') {
    selectedIcon = faIcons[icon as FaIconNames]; 
  } else {
    selectedIcon = siIcons[icon as SiIconNames];
  }

  if (!selectedIcon) {
    // Handle case when icon is not found
    return null;
  }

  const Icon = selectedIcon;

  return <Icon color={color || 'black'} size={size} />;
};

export default DynamicIcon;
