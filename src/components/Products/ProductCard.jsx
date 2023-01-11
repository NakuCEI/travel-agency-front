import { useEffect, useState } from 'react';
import { AUTH_AUTHORIZED } from '../../store/constants';
import { useAuthStore } from '../../store/hooks';
import AppImage from '../AppImage/AppImage';

const registerWarning = 'Debes estar registrado para poder comprar';
const priceText = 'Precio';
const addToCart = 'Añadir al carrito';
const goBack = 'Volver atrás';

export const ProductCard = ({ clickGoBack, clickAddToCart, ...props }) => {

    const { id, name, description, price, url } = props;
    const {status} = useAuthStore();
    const [isAuthorized, setIsAuthorized] = useState(false);

    const checkIsUserAuthorized = () => {
        setIsAuthorized(status === AUTH_AUTHORIZED);
    };

    useEffect(() => {
        checkIsUserAuthorized();
    }, [status]);

    return (
        <article id={id} className="col">
            <div className="card border-0">
                <div className="row g-0 h-100">
                    <div className="col-md-5 col-lg-6 p-0 pe-2">
                        <AppImage 
                            src={url} 
                            alt={name} 
                            className="img-fluid" 
                        />
                    </div>
                    <div className="col-md-7 col-lg-6">
                        <div className="card-body h-100 d-flex flex-column justify-content-between p-0 pt-4 pt-md-0 ps-md-4">
                            <div>
                                <h5 className="card-title">{name}</h5>
                                <p className="card-text custom-detail-paragraph">
                                    {description}
                                </p>
                                <p className="card-text"><b>{priceText}: </b>{price} €</p>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <button onClick={() => clickGoBack()} className='btn btn-secondary btn-sm'>{goBack}</button>
                                    <button 
                                        className={`btn btn-primary btn-sm ${isAuthorized ? '' : 'opacity-50'}`} 
                                        style={{ cursor: `${(isAuthorized) ? '' : 'default'}`}}
                                        disabled={!isAuthorized}
                                        onClick={() => clickAddToCart()} 
                                    >
                                        {addToCart}
                                    </button>
                                </div>
                                {
                                    !isAuthorized ?
                                        (
                                            <div className="mt-4 d-flex justify-content-center">
                                                <span className="w-100 badge bg-danger">{ registerWarning }</span>
                                            </div>
                                        )
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};
