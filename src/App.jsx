import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ShowUser from "./pages/ShowUser";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/show-user" element={<ShowUser />} />
    </Routes>
  );
};

export default App;