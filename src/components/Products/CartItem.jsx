import { useState } from "react";
import { getProductById } from "../../helpers";
import AppFieldButtons from "../AppFieldButtons/AppFieldButtons";
import AppFormInputDateTime from "../AppFormInputDateTime/AppFormInputDateTime";

const startDateId = 'startDate';
const endDateId = 'endDate';

export const CartItem = ({ product, removeItem, setItemTotalPrice }) => {

    const { reservation, amount, start, end } = product;
    const info = getProductById(reservation) || null;
    const { id, name, price, url } = info;

    const [quantity, setQuantity] = useState(amount/price);
    const [itemPrice, setItemPrice] = useState(price);
    const [startDateSelected, setStartDateSelected] = useState(start);
    const [endDateSelected, setEndDateSelected] = useState(end);

    const checkQuantity = (num) => {
        if (num > 0 && num <= 10) {
            setQuantity(num);
            setItemPrice(num * price);
            const newProduct = {...product};
            newProduct.amount = num * price;
            setItemTotalPrice(newProduct);
        }
    };

    const checkDate = (param) => {
        const newProduct = {...product};
        if (param.dateid === startDateId) {
            setStartDateSelected(param.date);
            newProduct.start = param.date;
        }
        if (param.dateid === endDateId) {
            setEndDateSelected(param.date);
            newProduct.end = param.date;
        }
        setItemTotalPrice(newProduct);
    };

    return (
        <div id={id} className="card rounded-0 mb-4 p-0">
            <div className="card-body p-0">
                <div className="h-100 row d-flex justify-content-between align-items-center pb-3 pb-md-0">
                    <div className="col-12 col-sm-6 col-md-3 pe-sm-0">
                        <img src={url} alt={name} className="img-fluid" />
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 px-4 ps-sm-2 pe-sm-0 px-md-2 px-lg-4 mt-4 mt-sm-0 d-flex flex-column align-self-start">
                        <p className="lead fw-normal mb-0">{name}</p>
                        <div className="d-flex flex-column justify-content-between align-items-start">
                            <AppFormInputDateTime 
                                dateId={startDateId} 
                                dateValue={startDateSelected} 
                                dateLabel="Departure" 
                                onChangeDate={checkDate} 
                            />
                            <AppFormInputDateTime 
                                dateId={endDateId} 
                                dateValue={endDateSelected} 
                                dateLabel="Arrival" 
                                onChangeDate={checkDate} 
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
                            <button onClick={() => removeItem(product._id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
