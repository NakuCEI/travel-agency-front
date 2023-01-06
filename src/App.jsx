import { AppModal } from './components/AppModal/AppModal';
import { LoginForm } from './components/LoginForm/LoginForm';
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
        <LoginForm />
      </AppModal>
    </>
  );
};

export default App;
