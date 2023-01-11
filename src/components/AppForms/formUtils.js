export const formValuesNotEmpty = (list) => {
    console.log('list: ', list);
    const itemList = [];
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.classList.contains("form-control")) {
            const hasValue = (element && element.value && element.value.trim().length > 0) ? true : false;
            const itemValidation = {
                name: element.name, 
                value: element.value, 
                valid: hasValue, 
                error: hasValue ? null : `El campo ${element.name} no puede estar vacío`
            }
            itemList.push(itemValidation);
        }
    }
    return itemList;
};

export const validationMail = (value) => {
    const isValidLength = value.trim().length > 3;
    const isValidMail = !/\S+@\S+\.\S+/.test(value);
    return (isValidLength && isValidMail) ? null : 'Email incorrecto'
};

export const validationPassLength = (value) => {
    const isValidLength = value.length >= 6 || value.length <= 10;
    return isValidLength ? 'Contraseña incorrecta' : null
};