import { AppContainer } from '../components/grid'
import { GeneratorProvider } from '../state/generator'
import Header from '../components/header'
import KanyeSelectorWrapper from '../components/kanyeSelectorWrapper'

function App() {
  return (
    <AppContainer className="App">
      <GeneratorProvider>
        <Header />
        {/* <SeedSelector /> */}
        <KanyeSelectorWrapper />
      </GeneratorProvider>
    </AppContainer>
  );
}

export default App;
