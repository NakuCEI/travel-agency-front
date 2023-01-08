import { useEffect, useState } from 'react';

export const useForm = (initialForm = {}, onSubmit) => {

    const [formState, setFormState] = useState(initialForm);

    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formState);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm, 
        handleSubmit
    };
};