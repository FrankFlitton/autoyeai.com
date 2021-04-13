import SeedSelector from '../components/seedSelector'
import { GeneratorProvider } from '../state/generator'

function App() {
  return (
    <div className="App">
      <GeneratorProvider>
        <SeedSelector />
      </GeneratorProvider>
    </div>
  );
}

export default App;
