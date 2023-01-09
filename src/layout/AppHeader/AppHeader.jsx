import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../../store/hooks';
import { useScrollPosition } from '../../hooks';
import { AUTH_AUTHORIZED } from '../../store/constants';
import { Navbar } from './Navbar/Navbar';
import { TopScrollButton } from './TopScrollButton/TopScrollButton';
import { HeaderLogo } from './HeaderLogo/HeaderLogo';
import './AppHeader.css';

export const AppHeader = () => {
    
    const [topBtnVisible, setTopBtnVisible] = useState(false);
    const {status} = useAuthStore();
    const headerRef = useRef();
    const headerContentRef = useRef();
    const scrollPosition = useScrollPosition();

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
                className={`container d-flex flex-column flex-sm-row justify-content-${(status === AUTH_AUTHORIZED) ? 'between' : 'evenly'} align-items-center`}
            >
                <HeaderLogo />
                <Navbar />
            </div>
            <TopScrollButton visible={ topBtnVisible } />
        </header>
    );
};
