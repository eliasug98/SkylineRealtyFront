import React from 'react';

const Footer = () => {
    return (
        <footer className="p-6 bg-[rgb(33,33,33)] text-white h-auto">
            <div className='flex flex-col lg:flex-row justify-between items-start'>
                <div className="flex items-center gap-2 mb-4 md:mb-0 w-full md:w-1/4"> {/* Ajustar el ancho aquí */}
                    <img src='/img/property-logo.png' alt='property logo' className="h-24 rounded-full" />
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">About Skyline</h2>
                    <p className="text-sm mt-4 opacity-50">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus amet vero sint eius nemo vitae nisi ad sit, earum numquam quae debitis praesentium? Animi, voluptatibus illo cupiditate officia cumque totam?
                    </p>
                </div>
                <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0"> {/* Ajustar el ancho aquí */}

                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Subscribe to Newsletter</h2>
                        <div className="flex items-center mt-4">
                            <input type="email" placeholder="Enter your email" className="opacity-50 p-2 rounded-l-md border bg-transparent" />
                            <button className="bg-amber-600 text-black hover:text-white font-medium px-4 py-2 hover:bg-slate-700 rounded-r-md border border-amber-600">Send</button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Follow Us</h2>
                        <div className='flex gap-6 mt-6'>
                            <a href="https://www.facebook.com" className='opacity-50 hover:opacity-100'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 320 512"><path fill="#ffffff" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" /></svg>
                            </a>
                            <a href="https://www.twitter.com" className='opacity-50 hover:opacity-100'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 512 512"><path fill="#ffffff" d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" /></svg>
                            </a>
                            <a href="https://www.linkedin.com" className='opacity-50 hover:opacity-100'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 448 512"><path fill="#ffffff" d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" /></svg>
                            </a>
                            <a href="https://www.instagram.com" className='opacity-50 hover:opacity-100'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 448 512"><path fill="#ffffff" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="w-full my-4 border-gray-600" />
            <div className="text-sm text-center opacity-50">
                © Skyline Realty - 2024. All rights reserved
            </div>
        </footer>
    );
};

export default Footer;