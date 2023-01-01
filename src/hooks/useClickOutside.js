import { useEffect } from 'react';

const mousedownEvent = 'mousedown';

const useClickOutside = (refs, handler, isActive) => {

    useEffect(() => {

        if (isActive) {
            const handleClickOutside = (event) => {
                if (!handler || !event || !event.target) return;
    
                if (
                    event.target === document.getElementsByTagName('html')[0] &&
                    event.clientX >= document.documentElement.offsetWidth
                ) {
                    return;
                };
    
                let containedToAnyRefs = false;
    
                for (const rf of refs) {
                    if (rf && rf.current && rf.current.contains(event.target)) {
                        containedToAnyRefs = true;
                        break;
                    }
                }
    
                if (!containedToAnyRefs) {
                    handler();
                }
            };
    
            document.addEventListener(mousedownEvent, handleClickOutside);
            handleClickOutside();
    
            return () => document.removeEventListener(mousedownEvent, handleClickOutside);
        }

    }, [isActive]);
};

export default useClickOutside;
