import React from 'react';

const AppFieldButtons = ({ quantity, checkQuantity }) => {

    return (
        <div className="d-flex justify-content-between align-items-center">
            <button 
                className="btn btn-dark px-2 d-flex justify-content-center align-items-center" 
                style={{ width: 20, height: 20, lineHeight: '0.125', fontSize: '1.25rem' }} 
                disabled={quantity <= 1}
                onClick={() => checkQuantity(quantity - 1)}
            >
                -
            </button>

            <input 
                readOnly 
                type="text" 
                id="quantity" 
                name="quantity" 
                className="form-control form-control-sm mx-2"  
                style={{ width: 40, textAlign: 'center' }} 
                value={quantity} 
                onChange={() => checkQuantity(quantity - 1)}
            />

            <button 
                className="btn btn-dark px-2 d-flex justify-content-center align-items-start" 
                style={{ width: 20, height: 20, lineHeight: '0.125', fontSize: '1.25rem' }} 
                disabled={quantity >= 10}
                onClick={() => checkQuantity(quantity + 1)}
            >
                +
            </button>
        </div>
    );
};

export default AppFieldButtons;
