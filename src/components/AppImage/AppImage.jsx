import { useState } from 'react';
import Spinner from '../Spinner/Spinner';

const AppImage = ({ ...props }) => {

    const [loading, setLoading] = useState(true);

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
