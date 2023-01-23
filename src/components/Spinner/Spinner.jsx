// Componente Spinner
// Recibe como parámetro el valor de "spnner oscuro" / "spinner claro"
const Spinner = ({ light = false }) => {
    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center my-2">
            <span className={`spinner-border ${light ? 'text-light' : ''}`}></span>
        </div>
    );
};

export default Spinner;
