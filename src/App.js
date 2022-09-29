import Header from './components/Header';
import Main from './components/Main';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <Main />
      </AuthContextProvider>
    </div>
  );
}

export default App;
