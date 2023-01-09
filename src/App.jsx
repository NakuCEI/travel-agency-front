import { AppModal } from './components/AppModal/AppModal';
import { AppForms } from './components/AppForms/AppForms';
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
        <AppForms />
      </AppModal>
    </>
  );
};

export default App;
