// Componente AppFormInput
// Recibe como parámetros las props de un elemento input
const AppFormInput = ({ ...props }) => {

    return (
        <div className="form-group mt-2">
            <input 
                { ...props } 
                type={props.type ? props.type : 'text'}
                className="form-control" 
            />
        </div>
    );
};

export default AppFormInput;
