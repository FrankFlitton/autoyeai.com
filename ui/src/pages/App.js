import { AppContainer } from '../components/grid'
import { GeneratorProvider } from '../state/generator'
import Header from '../components/header'
import KanyeSelectorWrapper from '../components/kanyeSelectorWrapper'
import SplashScreen from '../components/splashScreen'

function App() {
  return (
    <AppContainer className="App">
      <GeneratorProvider>
        <Header />
        {/* <SeedSelector /> */}
        <SplashScreen />
        <KanyeSelectorWrapper />
      </GeneratorProvider>
    </AppContainer>
  );
}

export default App;
