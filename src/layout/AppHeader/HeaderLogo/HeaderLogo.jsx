import { Link } from 'react-router-dom'; // Importación de elemento de enlace de navegación
import { ROUTE_HOME } from '../../../router/constants'; // Importación de constante de la Home
import './HeaderLogo.css'; // Importación de estilos

// Constante para la ruta de la imagen del logo
const logoImage = '../../../assets/img/icon-hot-air-balloon.svg';

// Componente HeaderLogo
export const HeaderLogo = () => {

    return (
        <Link to={ROUTE_HOME} className="header-logo-link d-flex justify-content-start align-items-center py-2">
            <img 
                alt="TravelAgency icon" 
                title="TravelAgency icon" 
                src={logoImage} 
                className="icon-company" 
            />
            <p className="text-company mb-0">TravelAgency</p>
        </Link>
    );
};
