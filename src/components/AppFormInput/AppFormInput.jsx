const AppFormInput = ({ type='text', ...props }) => {

    return (
        <div className="form-group mt-2">
            <input 
                { ...props } 
                className="form-control" 
            />
            {props.error ? 
                (
                    <p className="alert alert-danger mb-0 p-0 py-1">{props.error}</p>
                ) : null
            }
        </div>
    );
};

export default AppFormInput;
