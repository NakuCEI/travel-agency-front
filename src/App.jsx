import { AppFooter, AppHeader, AppMain } from "./layout"
import { HomePage } from "./pages"

function App() {

  return (
    <>
      <AppHeader />
      <AppMain>
        <HomePage />
      </AppMain>
      <AppFooter />
    </>
  )
}

export default App
