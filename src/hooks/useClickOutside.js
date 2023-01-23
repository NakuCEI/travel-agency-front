import { useEffect } from 'react'; // Importación de hook de react

// Constante para el nombre de evento mousedown
const mousedownEvent = 'mousedown';

// Hook useClickOutside
// Recibe como parámetros la referencia del elemento, el evento a ejecutar y si está activo
export const useClickOutside = (refs, handler, isActive) => {

    // useEffect que se ejecuta si el elemento está activo
    useEffect(() => {

        // Si está activo el elemento
        if (isActive) {
            // Método para registrar las pulsaciones en el elemento
            const handleClickOutside = (event) => {
                // Si no existe evento a ejecutar (parámetro de entrada), o no hay "event" o el "event" no contiene "target" se sale del useEffect
                if (!handler || !event || !event.target) return;
                
                // Si el elemento pulsado está fuera del navegador se sale del useEffect
                if (
                    event.target === document.getElementsByTagName('html')[0] &&
                    event.clientX >= document.documentElement.offsetWidth
                ) {
                    return;
                };
                
                // Variable para registrar si se pulsa en los elementos de referencia que se pasan por parámetro 
                let containedToAnyRefs = false;
                
                // Bucle para recorrer los elementos de referencia
                for (const rf of refs) {
                    // Se comprueba si el elemento pulsado es una de las referencias
                    if (rf && rf.current && rf.current.contains(event.target)) {
                        containedToAnyRefs = true;
                        break;
                    }
                }
                
                // Si no hay referencias pulsadas significa que se ha pulsado fuera por lo que sejecuta el evento de entrada en los parámetros
                if (!containedToAnyRefs) {
                    handler();
                }
            };
    
            // Asignación de listener al document del evento mousedown
            document.addEventListener(mousedownEvent, handleClickOutside);
            // Invocación al método para ejecutar la comprobación de elemento pulsado
            handleClickOutside();
    
            // Eliminación de listener al document del evento mousedown
            return () => document.removeEventListener(mousedownEvent, handleClickOutside);
        }

    }, [isActive]);
};
