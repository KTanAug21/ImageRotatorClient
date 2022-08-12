import { Container } from "react-bootstrap"
import { Upload } from "./pages/Upload"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Upload />}></Route>
      </Routes>
    </Container>
  )
}

export default App
