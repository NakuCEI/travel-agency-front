import { Link } from "react-router-dom";
import { ROUTE_DETAIL_LINK } from "../../router/constants";
import AppImage from "../AppImage/AppImage";

export const ProductItem = ({ id, name, description, price, url }) => {

    return (
        <article id={id} className="col-md-4 mb-3">
            <div className="card mb-3 h-100" style={{maxWidth: '540px'}}>
                <AppImage 
                    src={url} 
                    alt={name} 
                    className="card-img-top img-fluid" 
                />
                <div className="card-body h-100 d-flex flex-column justify-content-between">
                    <div>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text truncate-line-clamp">
                            {description}
                        </p>
                        <p className="card-text"><b>Precio: </b>{price} €</p>
                    </div>
                    <div className="d-grid">
                        <Link to={`${ROUTE_DETAIL_LINK}/${id}`} className='btn btn-dark btn-sm'>Ver más</Link>
                    </div>
                </div>
            </div>
        </article>
    );
};
