import { Header, Footer, BigCard, Carousel, BackGround } from "./components"
import { DataProvider } from "./global/contexts/DataContext"

const App = () => {

  return (
    <DataProvider>
      <BackGround />
      <Header />
      <BigCard />
      <Carousel />
      <Footer />
    </DataProvider>
  )
}

export default App