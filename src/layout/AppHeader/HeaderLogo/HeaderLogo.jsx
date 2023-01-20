import { Link } from 'react-router-dom';
import { ROUTE_HOME } from '../../../router/constants';
import './HeaderLogo.css';

const logoImage = '../../../assets/img/icon-hot-air-balloon.svg';

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
