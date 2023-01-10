const AppFormInputDateTime = ({ dateName, dateLabel, dateValue, onChangeDate, error }) => {

    const convertDate = (paramDate) => {
        return new Date(paramDate).toISOString().slice(0, -8);
    };

    const getDateObject = (value) => {
        return {
            dateName: dateName, 
            date: value 
        };
    };

    const checkDate = ({target}) => {
        const objDate = getDateObject(target.value);
        onChangeDate(objDate);
    };

    return (
        <div className="w-100 d-flex flex-sm-column flex-md-row justify-content-between align-items-start mx-1 mt-1">
            <span className={`me-1 ${error ? 'text-danger' : ''}`}>{dateLabel}: </span>
            <input 
                type="datetime-local" 
                name={dateName} 
                className={`form-control px-1 py-0 w-auto ${error ? 'border border-danger text-danger' : ''}`} 
                min={new Date().toISOString().slice(0, -8)} 
                defaultValue={convertDate(dateValue)} 
                onChange={checkDate} 
            />
        </div>
    );
};

export default AppFormInputDateTime;
