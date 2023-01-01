import { useState, useRef, useEffect } from 'react';
import { useUiStore } from '../../hooks/useUiStore';
import useScrollPosition from '../../hooks/useScrollPosition';
import { Navbar } from './Navbar/Navbar';
import { TopScrollButton } from './TopScrollButton/TopScrollButton';
import { HeaderLogo } from './HeaderLogo/HeaderLogo';
import './AppHeader.css';

export const AppHeader = () => {
    
    const {openModal} = useUiStore();
    const [topBtnVisible, setTopBtnVisible] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const headerRef = useRef();
    const headerContentRef = useRef();
    const scrollPosition = useScrollPosition();

    const handleUserLogin = () => {
        console.log('handleUserLogin');
        setIsLogged(!isLogged);
        openModal();
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
                <HeaderLogo />
                <Navbar isLogged={isLogged} handleUserLogin={handleUserLogin} />
            </div>
            <TopScrollButton visible={ topBtnVisible } />
        </header>
    );
};
