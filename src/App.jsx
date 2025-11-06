import { Slide, ToastContainer } from 'react-toastify'
import AppRouter from './router'

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="buttom-right"
        transition={Slide}
        autoClose={3000}
      />
    </>

  )
}

export default App