import './AppHeader.css';

export const AppHeader = () => {

    return (
        <header 
            className="sticky-top bg-dark text-light px-3 py-2 text-center"
        >
            <div 
                className={`container d-flex flex-column flex-sm-row justify-content-center align-items-center`}
            >
                <div className="d-flex justify-content-start align-items-center py-2">
                    <img 
                        alt="TravelAgency icon" 
                        title="TravelAgency icon" 
                        src="/src/assets/img/icon-hot-air-balloon.svg" 
                        className="icon-company"
                    />
                    <p className="text-company mb-0">TravelAgency</p>
                </div>
            </div>
        </header>
    );
};
