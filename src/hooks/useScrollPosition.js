import { useEffect, useState } from 'react';

const scrollEvent = 'scroll';

const useScrollPosition = () => {

    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {

        const updatePosition = () => {
            setScrollPosition(window.pageYOffset);
        }

        window.addEventListener(scrollEvent, updatePosition);
        updatePosition();

        return () => window.removeEventListener(scrollEvent, updatePosition);
    }, []);

    return scrollPosition;
};

export default useScrollPosition;
