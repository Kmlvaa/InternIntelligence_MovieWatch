import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Layout from './Layout/Layout';
import MovieDetails from './Pages/MovieDetails';
import TVshowsDetails from './Pages/TVshowsDetails';

function App() {
  return (
    <div className="from-zinc-800 via-neutral-700 via-neutral-800 to-zinc-950 w-full h-full">
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />}/>
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<TVshowsDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
