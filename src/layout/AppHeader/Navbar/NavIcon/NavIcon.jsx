import './NavIcon.css';

export const NavIcon = ({alt, title, src, iconClick}) => {

    return (
        <div className="navicon-wrapper" onClick={iconClick}>
            <div className="navicon-icon">
                <img alt={alt} title={title ? title : alt} src={src} />
            </div>
        </div>
    );
};
