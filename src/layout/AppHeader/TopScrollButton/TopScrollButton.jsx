import './TopScrollButton.css'; // Importación de estilos 

// Componente TopScrollButton
// Recibe un valor booleano 
export const TopScrollButton = ({ visible }) => {

    // Método para mover el scroll a la parte superior de la página
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
