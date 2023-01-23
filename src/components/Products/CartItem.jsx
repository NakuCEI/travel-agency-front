import { useEffect, useState } from 'react'; // Importación de hooks de react
import { getProductById } from '../../helpers'; // Importación de método para buscar producto por id
import AppFieldButtons from '../AppFieldButtons/AppFieldButtons'; // Importación de componente de cantidad de producto
import AppFormInputDateTime from '../AppFormInputDateTime/AppFormInputDateTime'; // Importación de componente de fecha de producto

// Constantes de textos
const deleteText = 'Borrar';
const startDateName = 'startDate';
const endDateName = 'endDate';

// Componente CartItem
// Recibe como parámetro el producto del carrito de compra, el evento para eliminarlo y el evento para actualizarlo
export const CartItem = ({ product, removeItem, updateProduct }) => {

    // Desestructuración de valores del producto
    const { reservation, amount, start, end } = product;
    // Constante para almacenar la información del producto
    const info = getProductById(reservation) || null;
    // Desestructuración de valores de la información del producto
    const { id, name, price, url } = info;
    // useSate para almacenar la cantidad del producto
    const [quantity, setQuantity] = useState(amount/price);
    // useSate para guardar la fecha inicial del producto
    const [startDateSelected, setStartDateSelected] = useState(start);
    // useSate para guardar la fecha final del producto
    const [endDateSelected, setEndDateSelected] = useState(end);
    // useSate para guardar la validez de la fecha inicial del producto
    const [validDateStart, setValidDateStart] = useState(false);
    // useSate para guardar la validez de la fecha final del producto
    const [validDateEnd, setValidDateEnd] = useState(false);

    // Método para comprobar las cantidades del producto
    // Actualiza el valor en base de datos
    const checkQuantity = (num) => {
        if (num > 0 && num <= 10) {
            const priceValue  = num * price;
            const newProduct = {...product};
            newProduct.amount = priceValue;
            setQuantity(num);
            updateProduct(newProduct);
        }
    };

    // Método para comparar la validez de las fechas
    const compareDates = (date, field) => {
        if (field === startDateName) {
            setValidDateStart(new Date(date) < new Date(endDateSelected));
        } else if (field === endDateName) {
            setValidDateEnd(new Date(date) > new Date(startDateSelected));
        }
    };

    // Método para asignar las fechas del producto
    // Actualiza el valor en base de datos
    const checkDate = (param) => {
        const newProduct = {...product};
        if (param.dateName === startDateName) {
            setStartDateSelected(param.date);
            newProduct.start = param.date;
        }
        if (param.dateName === endDateName) {
            setEndDateSelected(param.date);
            newProduct.end = param.date;
        }
        updateProduct(newProduct);
    };

    // Método para comparar la validez de las fechas
    const setDateValidation = () => {
        compareDates(startDateSelected, startDateName);
        compareDates(endDateSelected, endDateName);
    };
    
    // useEffect a ejecutar cuando cambian los valores de fechas
    useEffect(() => {
        setDateValidation();
    }, [startDateSelected, endDateSelected]);

    return (
        <div id={id} className="card rounded-0 mb-4 p-0">
            <div className="card-body p-0">
                <div className="h-100 row d-flex justify-content-between align-items-center pb-3 pb-md-0">
                    <div className="col-12 col-sm-6 col-md-3 pe-sm-0">
                        <img src={url} alt={name} className="img-fluid" />
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 px-4 ps-sm-2 pe-sm-0 px-md-2 px-lg-4 mt-4 mt-sm-0 mt-md-2 d-flex flex-column align-self-start">
                        <p className="lead fw-normal mb-0">{name}</p>
                        <div className="d-flex flex-column justify-content-between align-items-start">
                            <AppFormInputDateTime 
                                dateName={startDateName} 
                                dateValue={startDateSelected} 
                                dateLabel="Salida" 
                                onChangeDate={checkDate} 
                                error={!validDateStart} 
                            />
                            <AppFormInputDateTime 
                                dateName={endDateName} 
                                dateValue={endDateSelected} 
                                dateLabel="Llegada" 
                                onChangeDate={checkDate} 
                                error={!validDateEnd} 
                            />
                        </div>
                    </div>
                    <div className="col col-md-3 px-4 px-md-0 mt-4 mt-md-0 d-flex flex-md-column justify-content-between align-items-center">
                        <AppFieldButtons 
                            quantity={quantity} 
                            checkQuantity={checkQuantity} 
                        />
                        <div className="my-md-2 text-center">
                            <h5 className="mb-0">{quantity * price} €</h5>
                        </div>
                        <div className="text-end">
                            <button onClick={() => removeItem(product._id)} className="btn btn-danger btn-sm">{deleteText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
