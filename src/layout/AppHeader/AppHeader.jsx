import { useState, useRef, useEffect } from 'react';
import useScrollPosition from '../../hooks/useScrollPosition';
import { TopScrollButton } from './TopScrollButton/TopScrollButton';
import './AppHeader.css';

export const AppHeader = () => {
    
    const [topBtnVisible, setTopBtnVisible] = useState(false);
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
            className="sticky-top bg-dark text-light px-3 py-2 text-center"
        >
            <div 
                ref={headerContentRef} 
                className={`container d-flex flex-column flex-sm-row justify-content-center align-items-center`}
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
            </div>
            <TopScrollButton visible={ topBtnVisible } />
        </header>
    );
};