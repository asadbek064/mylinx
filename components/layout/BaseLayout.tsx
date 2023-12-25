import React, { useEffect, useState } from "react";
import Navbar from "../partials/Navbar"
import { usePathname } from 'next/navigation'

interface BaseLayoutProps {
  showFooter?: boolean;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
}) => {
  const pathname = usePathname();

  const [path, setPath] = useState(pathname || '');
  useEffect(() => {
    setPath(pathname)
  }, [pathname])
  
  return (
    <main>
      {path === '/' && <Navbar />}
      <div className="app">{children}</div>

    </main>
  );
};

export default BaseLayout;
