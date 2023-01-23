// Método para centralizar las variables de entorno del archivo .env
export const getEnvs = () => {
    return {
        VITE_API_URL: import.meta.env.VITE_API_URL
    }
};
