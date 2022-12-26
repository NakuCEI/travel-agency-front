import './TopScrollButton.css';

export const TopScrollButton = ({ visible }) => {

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    };

    return (
        <button 
            className={`top_button ${visible ? 'top_button_visible' : ''}`} 
            onClick={(e) => scrollToTop(e)}
        >
        </button>
    );
};
