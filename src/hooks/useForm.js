import { useEffect, useState } from 'react'; // Importación de hooks de react

// Hook useForm
// Recibe el estado inicial del formulario
export const useForm = (initialForm = {}) => {
    // useSate para almacenar los valores del formulario
    const [formState, setFormState] = useState(initialForm);

    // useEffect para asignar valores del formulario con cada cambio en su estado
    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm]);

    // Método para recibir el cambio en un elemento de formulario
    const onInputChange = ({ target }) => {
        // Extracción de valores "name" y "value" del elemento
        const { name, value } = target;
        // Asignación en el estado del formulario
        setFormState({
            ...formState,
            [name]: value
        });
    };

    // Exposición de estado del formulario y evento onChange
    return {
        ...formState,
        onInputChange 
    };
};