
import {Routes, Route} from "react-router-dom";

import RedirectToEng from "./components/RedirectToEng"
import MainPage from './pages/MainPage/MainPage';
import PoetPage from "./pages/PoetPage/PoetPage";
import AboutPage from "./pages/AboutPage/AboutPage";

import './App.css';

function App() {
  return (
    <Routes>

      <Route path="/" element={ <RedirectToEng /> }></Route>
      <Route path="/:language" element={ <MainPage /> }></Route>
      <Route path="/:language/poets/:poetSlug" element={ <PoetPage /> }></Route>
      <Route path="/:language/about" element={ <AboutPage /> }></Route>
    </Routes>

  );
}

export default App;
