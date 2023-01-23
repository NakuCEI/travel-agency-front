import { useState, useRef, useEffect } from 'react'; // Importación de hooks de react
import { useAuthStore } from '../../store/hooks'; // Importación de hook de manejo de usuario
import { useScrollPosition } from '../../hooks'; // Importación de hook de control de posición de scroll
import { AUTH_AUTHORIZED } from '../../store/constants'; // Importación de constante de usuario autorizado
import { Navbar } from './Navbar/Navbar'; // Importación de componente de navegación
import { TopScrollButton } from './TopScrollButton/TopScrollButton'; // Importación de componente de botón scroll to top
import { HeaderLogo } from './HeaderLogo/HeaderLogo'; // Importación de componente para el logo del header
import './AppHeader.css'; // Importación de estilos de la cabecera

// Componente AppHeader
export const AppHeader = () => {
    // useState para almacenar el estado de visibilidad del botón scroll to top
    const [topBtnVisible, setTopBtnVisible] = useState(false);
    // Constante para el estado de autentificación del usuario
    const {status} = useAuthStore();
    // Referencia del elemento header
    const headerRef = useRef();
    // Referencia del contenido del elemento header
    const headerContentRef = useRef();
    // Constante para guardar el valor de la posición del scroll
    const scrollPosition = useScrollPosition();

    // Método para calcular la visibilidad del botón scroll to top según la posición de scroll (si ésta es mayor que la altura de la cabecera es true)
    const checkTopButtonStatus = () => {
        (scrollPosition > headerRef.current.offsetHeight) ? setTopBtnVisible(true) : setTopBtnVisible(false);
    };

    // useEffect para comprobar el estado del botón scroll to top con cada cambio del scroll
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
