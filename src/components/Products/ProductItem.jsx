
export const ProductItem = ({ id, name, description, price, url }) => {

    return (
        <article id={id} className="col-md-4 mb-3">
            <div className="card mb-3 h-100" style={{maxWidth: '540px'}}>
                <img src={url} alt={name} className="card-img-top img-fluid" style={{maxHeight: '165px'}} />
                <div className="card-body h-100 d-flex flex-column justify-content-between">
                    <div>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><b>Precio: </b>{price} €</p>
                    </div>
                    <div className="d-grid">
                        MÁS INFO
                    </div>
                </div>
            </div>
        </article>
    );
};
