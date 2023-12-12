import React from "react";
import Navbar from "../partials/Navbar"

interface BaseLayoutProps {
  showHeader?: boolean;
  showFooter?: boolean;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  showHeader = true,
}) => {
  return (
    <main>
      {showHeader && <Navbar />}

      <div className="app">{children}</div>

    </main>
  );
};

export default BaseLayout;
