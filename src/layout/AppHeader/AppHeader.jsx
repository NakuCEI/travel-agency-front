import { useState, useRef, useEffect } from 'react';
import useScrollPosition from '../../hooks/useScrollPosition';
import { TopScrollButton } from './TopScrollButton/TopScrollButton';
import './AppHeader.css';
import { Navbar } from './Navbar/Navbar';

export const AppHeader = () => {
    
    const [topBtnVisible, setTopBtnVisible] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const headerRef = useRef();
    const headerContentRef = useRef();
    const scrollPosition = useScrollPosition();

    const handleUserLogin = () => {
        console.log('handleUserLogin');
        setIsLogged(!isLogged);
    };

    const checkTopButtonStatus = () => {
        (scrollPosition > headerRef.current.offsetHeight) ? setTopBtnVisible(true) : setTopBtnVisible(false);
    };

    useEffect(() => {
        checkTopButtonStatus();
    }, [scrollPosition]);

    return (
        <header 
            ref={headerRef} 
            className="sticky-top bg-dark text-light text-center"
        >
            <div 
                ref={headerContentRef} 
                className={`container d-flex flex-column flex-sm-row justify-content-${isLogged ? 'between' : 'evenly'} align-items-center`}
            >
                <div className="d-flex justify-content-start align-items-center py-2">
                    <img 
                        alt="TravelAgency icon" 
                        title="TravelAgency icon" 
                        src="/src/assets/img/icon-hot-air-balloon.svg" 
                        className="icon-company"
                    />
                    <p className="text-company mb-0">TravelAgency</p>
                </div>
                <Navbar isLogged={isLogged} />
            </div>
            {!isLogged && (<div className="d-flex justify-content-start align-items-center lh-1 shadow">
                <button 
                    className="w-100 btn btn-danger py-0 pb-1 rounded-0 lh-1" 
                    onClick={() => handleUserLogin()} 
                >
                    LOGIN
                </button>
            </div>)}
            <TopScrollButton visible={ topBtnVisible } />
        </header>
    );
};
