const LandingHeroFull = () => {
    return (
        <>
        <section className="bg-white dark:bg-gray-900 py-12">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-3xl mb-4 text-5xl font-extrabold tracking-tight leading-none md:text-6xl xl:text-7xl text-primary-500">The TikTok bio link to rule them all</h1>
                    <div className="max-w-3xl mb-6 font-light text-white  lg:mb-8 md:text-2xl lg:text:3xl ">Make the most of your TikTok bio link by not limiting it to just one destination. Mylinx assists in maximizing your Instagram account's potential.</div>
                    
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            className="border-1 outline-none
                            bg-no-repeat border-1 border-solid border-gray-500 box-border h-13  pl-[6.5rem] w-72 block text-lg
                            "
                            placeholder="Your page"
                            style={{
                                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50"><text x="10" y="32" style="font: bold 17px Arial; fill:%23171717;">mylinx.cc /</text></svg>')`,
                                backgroundRepeat: 'no-repeat',
                            }}      
                        />
                        
                        <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3  font-medium text-center text-lg text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 ">
                            Claim your page
                        </a>
                    </div>        
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img src="https://media.tenor.com/TKq6Fn71XPgAAAAd/seriously-seriously-cat.gif" alt="mockup" />
                </div>                
            </div>
        </section>
        </>
    );
};

export default LandingHeroFull;