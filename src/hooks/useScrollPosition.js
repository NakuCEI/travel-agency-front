import { useEffect, useState } from 'react'; // Importación de hooks de react

// Constante para el nombre de evento scroll
const scrollEvent = 'scroll';

// Hook useScrollPosition
export const useScrollPosition = () => {

    // useSate para almacenar el valor de la posición de scroll
    const [scrollPosition, setScrollPosition] = useState(0);

    // useEffect para calcular el valor de la posición de scroll
    useEffect(() => {
        // Método para actualizar el valor de la posición de scroll
        const updatePosition = () => {
            setScrollPosition(window.pageYOffset);
        }
        // Asignación de listener al window del evento scroll
        window.addEventListener(scrollEvent, updatePosition);
        // Invocación al método para actualizar la posición del scroll
        updatePosition();

        // Eliminación de listener del window del evento scroll
        return () => window.removeEventListener(scrollEvent, updatePosition);
    }, []);

    // Exposición del valor del scroll
    return scrollPosition;
};
