import { Routes, Route } from 'react-router-dom';
import History from './pages/History';
import Statistics from './pages/Statistics';
import './App.scss'

function App() {

  return (
    <div className='container main-wrapper'>
      <Routes>
        <Route path='/historico'    element={ <History /> }></Route>
        <Route path='/estatisticas' element={ <Statistics /> }></Route>
      </Routes>
    </div>
  )
}

export default App
