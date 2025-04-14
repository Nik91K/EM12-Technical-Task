import './App.css'
import LayoutPage from './layoutPage'

const App = () => {
  return (
    <LayoutPage title='Головна'>
      <div className="App">
        <a href="/login">Логін</a>
        <a href="/register">Реєстрація</a>
      </div>
    </LayoutPage>

  )
}

export default App
