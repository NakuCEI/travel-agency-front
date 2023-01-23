import { useState } from 'react'; // Importación de hook de react
import Spinner from '../Spinner/Spinner'; // Importación de componente Spinner

// Componente AppImage
// Recibe como parámetros las propiedades asignadas a una imagen
const AppImage = ({ ...props }) => {

    // useSatet para registrar cuando se ha cargado la imagen
    const [loading, setLoading] = useState(true);

    // En un <div> se muestra el Spinner mientras se carga la imagen y una vez cargada se quita el Spinner
    return (
        <>
            <div 
                className={`w-100 h-100 pt-5 mb-2 ${loading ? 'd-flex' : 'd-none'} flex-column justify-content-center align-items-center`}
            >
                <Spinner />
            </div>
            <div className={`w-100 ps-0 pe-0 ${loading ? 'd-none' : 'd-flex'} flex-column justify-content-start align-items-center`}>
                <img 
                    {...props}
                    alt={props.alt || ""}
                    onLoad={() => setLoading(false)} 
                />
            </div>
        </>
    );
};

export default AppImage;
