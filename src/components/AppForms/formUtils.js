export const formValuesNotEmpty = (list) => {
    console.log('list: ', list);
    const itemList = [];
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        console.log('element: ', element);
        if (element.classList.contains("form-control")) {
            const hasValue = (element && element.value && element.value.trim().length > 0) ? true : false;
            console.log('hasValue: ', hasValue);
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
    console.log('value: ', value);
    /*const validMail = !/\S+@\S+\.\S+/.test(value);
    console.log('validMail: ', validMail);
    return validMail; */
    const isValidLength = value.trim().length > 3;
    const isValidMail = !/\S+@\S+\.\S+/.test(value);
    console.log('isValidLength: ', isValidLength);
    console.log('isValidMail: ', isValidMail);
    return (isValidLength && isValidMail) ? null : 'Incorrect email'
};

export const validationPassLength = (value) => {
    console.log('value: ', value);
    /*const validPass = value.length < 6 || value.length > 10;
    console.log('validPass: ', validPass);
    return validPass; */
    const isValidLength = value.length >= 6 || value.length <= 10;
    console.log('isValidLength: ', isValidLength);
    return isValidLength ? 'Incorrect password' : null
};