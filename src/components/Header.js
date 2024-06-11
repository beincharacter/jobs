import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms/User";

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const userData = useRecoilValue(userAtom);
    const setUser = useSetRecoilState(userAtom);
    const prevIsVisible = useRef(isVisible);
    const cardRef = useRef(null);
    const observer = useRef(null);
    const navigate = useNavigate();


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

    const handleLogout = () => {
        localStorage.clear("user");
        navigate("/");
        setUser({});
        setDropdownVisible(false);
    };

    const handleUserIconClick = (event) => {
        setDropdownVisible(p => !p);
        event.stopPropagation();
    };

    const handleDocumentClick = (event) => {
        setDropdownVisible(false);
        event.stopPropagation();
    };

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <>
            {/* On scroll header */}
            <header className={`fixed top-0 right-0 flex space-x-8 text-lg rounded-full border border-[#00000028] p-4 mt-4 transition-transform duration-500 w-fit left-1/2 -translate-x-1/2 bg-[#FFFF82] text-black ${isVisible ? '-translate-y-52' : 'translate-y-0'}`}>
                <nav className="cursor-pointer hover">Home</nav>
                <nav className="cursor-pointer hover">Jobs</nav>
                <nav className="cursor-pointer hover">About</nav>
                <nav className="cursor-pointer hover">Contacts</nav>
            </header>

            {/* On load header */}
            <header className="flex justify-between items-center p-4 w-full bg-[#FFFF82] text-black">
                <div className="flex items-center">
                    <img src="https://via.placeholder.com/32" alt="Logo" className="h-8 w-8 mr-2" />
                </div>
                <div className="flex space-x-8 text-lg rounded-full border border-[#ffffff28] p-4">
                    <nav className="cursor-pointer hover">Home</nav>
                    <nav className="cursor-pointer hover">Jobs</nav>
                    <Link to="/about" className="cursor-pointer hover">About</Link>
                    <nav className="cursor-pointer hover">Contacts</nav>
                </div>
                <div className="flex items-center relative">
                    <FontAwesomeIcon icon={faUser} className="h-8 w-8 mr-2 cursor-pointer" onClick={handleUserIconClick} />
                    {userData.email && dropdownVisible &&
                        <div className="absolute p-2 border top-[110%] right-0 border border-black rounded-md bg-white">
                            <ul>
                                <li className="flex w-max hover-yellow">{userData.name}</li>
                                <li className="flex w-max hover-yellow">Setting</li>
                                <li className="flex w-max hover-yellow" onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>}
                </div>
            </header>
        </>
    );
};

export default Header;
