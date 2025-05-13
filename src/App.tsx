import './App.css'
import LayoutPage from './layoutPage'

const App = () => {

  return (
    <LayoutPage title='Головна сторінка'>
      <div className="App">
        <a href="/login">Логін</a>
        <a href="/register">Реєстрація</a>
      </div>
    </LayoutPage>

  )
}

export default App
