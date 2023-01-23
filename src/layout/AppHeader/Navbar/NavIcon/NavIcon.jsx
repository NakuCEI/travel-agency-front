import './NavIcon.css'; // Importación de estilos

// Componente NavIcon
// Renderiza un icono con las propiedades de la imagen y el evento click que se le indique
export const NavIcon = ({alt, title, src, iconClick = null}) => {

    return (
        <div className="navicon-wrapper" onClick={iconClick ? () => iconClick() : null}>
            <div className="navicon-icon">
                <img alt={alt} title={title ? title : alt} src={src} />
            </div>
        </div>
    );
};
