import React, { useEffect, useRef, useState } from "react";
import ScrollReveal from 'scrollreveal';

export const Login = () => {
    const cardRef = useRef(null);
    const observer = useRef(null);
    const [ isVisible, setIsVisible ] = useState(true);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                setIsVisible(entry.isIntersecting);
            });
        };

        observer.current = new IntersectionObserver(callback, options);
        
        if (cardRef.current) {
            observer.current.observe(cardRef.current);
        }
        
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

    return (
        <>
            <div className="relative flex flex-col gap-[100px] items-center w-screen h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 overflow-y-auto custom-scrollbar">
                {/* Your content */}
                <header className={`flex space-x-8 text-white text-lg rounded-full border border-[#ffffff28] p-4 mt-4 items top-5 ${isVisible ? '-translate-y-52 absolute' : 'sticky translate-y-0' }`}>
                    <nav>Home</nav>
                    <nav>Jobs</nav>
                    <nav>About</nav>
                    <nav>Contacts</nav>
                </header>

                <header className="flex justify-between items-center p-4 w-full pt-8">
                    <div className="flex items-center">
                        <img src="path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                        <div className="text-white text-lg">Logo</div>
                    </div>
                    <div className="flex space-x-8 text-white text-lg rounded-full border border-[#ffffff28] p-4">
                        <nav>Home</nav>
                        <nav>Jobs</nav>
                        <nav>About</nav>
                        <nav>Contacts</nav>
                    </div>
                    <div className="flex items-center">
                        <img src="path/to/user-icon.png" alt="User Icon" className="h-8 w-8 ml-2" />
                    </div>
                </header>

                <div className="flex w-[500px] h-[600px] min-h-[600px] border border-[#63484828] text-white p-4 rounded-lg haha"
                    ref={cardRef}
                >
                    <span></span>
                    <div></div>
                </div>

                <div className="flex w-[500px] h-[600px] min-h-[600px] border border-[#ffffff28] text-white p-4 rounded-lg">
                    <span></span>
                    <div></div>
                </div>

                <div className="flex w-[500px] h-[600px] min-h-[600px] border border-[#ffffff28] text-white p-4 rounded-lg">
                    <span></span>
                    <div></div>
                </div>
            </div>
        </>
    );
};
