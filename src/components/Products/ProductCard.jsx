import AppImage from "../AppImage/AppImage";

export const ProductCard = ({ clickGoBack, clickAddToCart, ...props }) => {

    const { id, name, description, price, url } = props;

    return (
        <article id={id} className="col">
            <div className="card border-0">
                <div className="row g-0 h-100">
                    <div className="col-md-6 p-0 pe-2">
                        <AppImage 
                            src={url} 
                            alt={name} 
                            className="img-fluid" 
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body h-100 d-flex flex-column justify-content-between">
                            <div>
                                <h5 className="card-title">{name}</h5>
                                <p className="card-text">{description}</p>
                                <p className="card-text"><b>Precio: </b>{price} €</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <button onClick={() => clickGoBack()} className='btn btn-secondary btn-sm'>Go back</button>
                                <button onClick={() => clickAddToCart()} className='btn btn-primary btn-sm'>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};
