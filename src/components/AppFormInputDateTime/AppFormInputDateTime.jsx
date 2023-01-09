import React from 'react';

const AppFormInputDateTime = ({ dateId, dateLabel, dateValue, onChangeDate }) => {

    const convertDate = (paramDate) => {
        return new Date(paramDate).toISOString().slice(0, -8);
    };

    const checkDate = ({target}) => {
        const objDate = {
            dateid: dateId, 
            date: target.value 
        };
        onChangeDate(objDate);
    };

    return (
        <div className="w-100 d-flex flex-sm-column flex-md-row justify-content-between align-items-start mx-1 mt-1">
            <label htmlFor={dateId} className="me-1">{dateLabel}: </label>
            <input 
                type="datetime-local" 
                id={dateId} 
                className="form-control p-0 w-auto" 
                min={new Date().toISOString().slice(0, -8)} 
                defaultValue={convertDate(dateValue)} 
                onChange={checkDate} 
            />
        </div>
    );
};

export default AppFormInputDateTime;
