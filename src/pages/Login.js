import React, { useEffect, useRef, useState } from "react";

export const Login = () => {
    const cardRef = useRef(null);
    const observer = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const prevIsVisible = useRef(isVisible);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        const callback = (entries) => {
            entries.forEach(entry => {
                const currentIsVisible = entry.isIntersecting;
                if (prevIsVisible.current !== currentIsVisible) {
                    setIsVisible(currentIsVisible);
                    prevIsVisible.current = currentIsVisible;
                }
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

                {/* on scroll header   */}
                <header className={`fixed top-0 right-0 flex space-x-8 text-lg rounded-full border border-[#ffffff28] p-4 mt-4 items transition-transform duration-500 w-fit left-1/2 -translate-x-1/2 bg-blue-200 text-black  ${isVisible ? '-translate-y-52' : 'translate-y-0'}`}>
                    <nav className="cursor-pointer hover p-1">Home</nav>
                    <nav className="cursor-pointer hover p-1">Jobs</nav>
                    <nav className="cursor-pointer hover p-1">About</nav>
                    <nav className="cursor-pointer hover p-1">Contacts</nav>
                </header>

                {/* on load header  */}
                <header className="flex justify-between items-center p-4 w-full pt-4">
                    <div className="flex items-center">
                        <img src="path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                        <div className="text-white text-lg">Logo</div>
                    </div>
                    <div className="flex space-x-8 text-white text-lg rounded-full border border-[#ffffff28] p-4">
                    <nav className="cursor-pointer hover p-1">Home</nav>
                    <nav className="cursor-pointer hover p-1">Jobs</nav>
                    <nav className="cursor-pointer hover p-1">About</nav>
                    <nav className="cursor-pointer hover p-1">Contacts</nav>
                    </div>
                    <div className="flex items-center">
                        <img src="path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                        <div className="text-white text-lg">User</div>
                    </div>
                </header>

                <div className="flex w-9/12 h-[600px] min-h-[600px] border border-[#63484828] text-white p-4 rounded-lg"
                    ref={cardRef}
                >
                    <span></span>
                    <div></div>
                </div>

                <div className="flex w-9/12 h-[600px] min-h-[600px] border border-[#ffffff28] text-white p-4 rounded-lg">
                    <span></span>
                    <div></div>
                </div>

                <div className="flex w-9/12 h-[600px] min-h-[600px] border border-[#ffffff28] text-white p-4 rounded-lg">
                    <span></span>
                    <div></div>
                </div>
            </div>
        </>
    );
};
