import { useCallback, useContext, useEffect, useState } from 'react'
import { AppContainer } from '../components/grid'
import { GeneratorContext } from '../state/generator'
import Header from '../components/header'
import Footer from '../components/footer'
import KanyeSelectorWrapper from '../components/kanyeSelectorWrapper'
import SplashScreen from '../components/splashScreen'

function App() {

  const { dark } = useContext(GeneratorContext)
  const [ darkTheme, setDarkTheme ] = useState(dark)

  const setTheme = useCallback(() => {
    setDarkTheme(dark)
  }, [dark])

  useEffect(() => {
    setTheme()
  }, [dark, setDarkTheme, setTheme])

  return (
    <AppContainer className="App" dark={darkTheme}>
      <Header />
      {/* <SeedSelector /> */}
      <SplashScreen />
      <KanyeSelectorWrapper />
      <Footer />
    </AppContainer>
  );
}

export default App;
