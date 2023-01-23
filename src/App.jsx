import { AppModal } from './components/AppModal/AppModal'; // Componente modal con el formulario
import { AppForms } from './components/AppForms/AppForms'; // Formulario para registro de usuarios
import { AppFooter, AppHeader, AppMain } from './layout'; // Elementos del layout de la aplicación
import { AppRouter } from './router/AppRouter'; // Módulo para renderizar los contenidos de las rutas

/*
  App - Aplicación
*/
function App() {

  return (
    <>
      <AppHeader />
      <AppMain>
        <AppRouter />
      </AppMain>
      <AppFooter />
      <AppModal>
        <AppForms />
      </AppModal>
    </>
  );
};

export default App;
