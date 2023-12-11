const LandingHeroFull = () => {
    return (
       <>
    <section className="bg-white dark:bg-gray-900 py-12">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
                <div className="max-w-3xl mb-4 font-extrabold tracking-tight leading-none [font-size:var(--step-5)] md:[font-size:var(--step-7)] text-primary-500">
                    The TikTok bio link to rule them all
                </div>
                <div className="max-w-3xl mb-6 font-light text-white lg:mb-8 [font-size:var(--step-1)]">
                    Make the most of your TikTok bio link by not limiting it to just one destination. Mylinx assists in maximizing your Instagram account's potential.
                </div>
                
                <div className="flex flex-col xl:flex-row xl:space-x-4 space-y-4 xl:space-y-0">
                    <div className="">
                        <input
                            type="text"
                            className="rounded-lg bg-no-repeat border-1 border-solid box-border py-8 h-12 md:pl-[8rem] w-full block text-2xl hover:border-neutral-400 border-2 active:border-spacing-1 border-[#000000] ease-in-out duration-100"
                            placeholder="yourname"
                            spellCheck="false"
                            style={{
                                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="130" height="50"><text x="10" y="40" style="font: bold 24px Arial; fill:%23262626;">mylinx.cc/</text></svg>')`,
                                backgroundRepeat: 'no-repeat',
                                paddingLeft: '8rem' 

                            }}
                        />
                    </div>

                    <div className="w-full">
                        <a href="#" className="inline-flex items-center px-5 py-5 md:py-4 font-medium text-center text-2xl text-white rounded-full bg-primary-600 hover:bg-primary-500 ease-in-out duration-100 focus:ring-4 focus:ring-primary-300">
                            Claim your Mylinx
                        </a>
                    </div>
                </div>        
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src="https://placehold.co/600x500" alt="mockup" />
            </div>                
        </div>
    </section>
</>
    );
};

export default LandingHeroFull;
