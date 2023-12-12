import TextIcon from 'components/shared/TextIcon';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';
import { IoMenu } from 'react-icons/io5';

interface NavBarProps {

}


const Navbar: React.FC<NavBarProps> = ({  }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.nav
      className="fixed z-20 h-5 top-4 w-11/12 md:max-w-screen-xl mx-auto inset-x-0 inset-y-0"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <div className=" bg-neutral-50 p-4 flex items-center justify-between rounded-full">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-center">
            <motion.img
              src="/logo.png" // Replace with your logo image path
              alt="Logo"
              className="h-8 mr-4"
              initial="hidden"
              animate="visible"
              variants={variants}
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <div className="lg:hidden items-center space-x-4 transition-all [font-size:var(--step--1)] md:[font-size:var(--step-0)]">
            <Link href={"/login"}>
              <button className="text-neutral-800 bg-neutral-100 py-2 px-3 rounded-lg hover:bg-neutral-200 duration-75 ease-in">
                Login
              </button>
            </Link>

            <Link href={"/signup"}>
              <button className="text-neutral-50 bg-slate-900 py-2 px-3 rounded-full hover:bg-slate-800 duration-75 ease-in">
                Sign Up
              </button>    
            </Link>
          </div>


          {/* Sign Up, Login, Menu Links */}
          <div className="hidden lg:flex items-center space-x-4 transition-all [font-size:var(--step-0)]">
          <Link href={"/login"}>
              <button className="text-neutral-800 bg-neutral-100 py-2 px-3 rounded-md hover:bg-neutral-200 duration-75 ease-in">
                Login
              </button>
            </Link>

            <Link href={"/signup"}>
              <button className="text-neutral-50 bg-slate-900 py-2 px-3 rounded-full hover:bg-slate-800 duration-75 ease-in">
                Sign Up
              </button>    
            </Link>

            <Link href={"/"}>
              <button className="mr-4 text-neutral-900 hover:bg-neutral-200 rounded-lg duration-100 ease-out">
                <TextIcon LeftIcon={IoMenu} className="w-8 h-8 p-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>

    </motion.nav>
  );
};

export default Navbar;
