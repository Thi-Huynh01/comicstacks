import logo from './logo.svg';
import './App.css';
import Rect from "react";
import ComicsList from './components/ComicsList';
import ComicDetail from "./components/ComicsDetail"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<index/>} />
        <Route path="/comics/" element={<ComicsList />} />
        <Route path="/comics/:slug" element={<ComicDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
