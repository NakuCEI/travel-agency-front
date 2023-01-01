import { AppModal } from './components/AppModal/AppModal';
import { AppFooter, AppHeader, AppMain } from './layout';
import { AppRouter } from './router/AppRouter';

function App() {

  return (
    <>
      <AppHeader />
      <AppMain>
        <AppRouter />
      </AppMain>
      <AppFooter />
      <AppModal>
        <div>
          CONTENIDO MODAL
        </div>
      </AppModal>
    </>
  );
};

export default App;
