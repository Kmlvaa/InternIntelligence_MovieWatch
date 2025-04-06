import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Layout from './Layout/Layout';

function App() {
  return (
    <div className="bg-mainBG w-full h-full">
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
