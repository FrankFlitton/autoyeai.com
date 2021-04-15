// import SeedSelector from '../components/seedSelector'
import { GeneratorProvider } from '../state/generator'
import Header from '../components/header'
import KanyeSelectorWrapper from '../components/kanyeSelectorWrapper'

function App() {
  return (
    <div className="App">
      <GeneratorProvider>
        <Header />
        {/* <SeedSelector /> */}
        <KanyeSelectorWrapper />
      </GeneratorProvider>
    </div>
  );
}

export default App;
