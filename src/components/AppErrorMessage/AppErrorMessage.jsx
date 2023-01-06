import React from 'react';

const AppErrorMessage = ({ message }) => {

    return (
        <div className="w-100 p-1 d-flex justify-content-center align-items-center">
            <div className="w-100 alert alert-danger d-flex justify-content-center align-items-center m-0 p-1" role="alert">
                <span className="p-0">
                    <img 
                        alt="Error icon" 
                        title="Error icon" 
                        src="/src/assets/img/warning-exclamation-triangle.svg" 
                        width="24" 
                        height="24" 
                        style={{ filter: "invert(40%) sepia(100%) saturate(400%) hue-rotate(-50deg) brightness(55%) contrast(2)" }}
                    />
                </span>
                <p className="m-0 ms-2 p-0">
                    { message }
                </p>
            </div>
        </div>
    );
};

export default AppErrorMessage;
