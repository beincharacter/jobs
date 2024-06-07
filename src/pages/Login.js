import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
            <div className="relative flex flex-col items-center w-screen h-screen overflow-y-auto custom-scrollbar">

                {/* on scroll header */}
                <header className={`fixed top-0 right-0 flex space-x-8 text-lg rounded-full border border-[#ffffff28] p-4 mt-4 items transition-transform duration-500 w-fit left-1/2 -translate-x-1/2 bg-blue-200 text-black ${isVisible ? '-translate-y-52' : 'translate-y-0'}`}>
                    <nav className="cursor-pointer hover p-1">Home</nav>
                    <nav className="cursor-pointer hover p-1">Jobs</nav>
                    <nav className="cursor-pointer hover p-1">About</nav>
                    <nav className="cursor-pointer hover p-1">Contacts</nav>
                </header>

                {/* on load header */}
                <header className="flex justify-between items-center p-4 w-full pt-4 bg-[#FFFF82] text-black">
                    <div className="flex items-center">
                        <img src="https://via.placeholder.com/32" alt="Logo" className="h-8 w-8 mr-2" />
                        {/* <div className="text-black text-lg">Logo</div> */}
                    </div>
                    <div className="flex space-x-8 text-black text-lg rounded-full border border-[#ffffff28] p-4">
                        <nav className="cursor-pointer hover p-1">Home</nav>
                        <nav className="cursor-pointer hover p-1">Jobs</nav>
                        <nav className="cursor-pointer hover p-1">About</nav>
                        <nav className="cursor-pointer hover p-1">Contacts</nav>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="h-8 w-8 mr-2" />
                        {/* <div className="text-black text-lg">User</div> */}
                    </div>
                </header>

                <div className="flex w-full h-[600px] bg-[#FFFF82] min-h-[600px] text-black p-4" ref={cardRef}>
                    <span>Connect. Collaborate. Conquer Your Career</span>
                    <div></div>
                </div>
                
            </div>
        </>
    );
};
