import { HashRouter, Route, Routes } from "react-router-dom";
import CharacterDetail from "./assets/components/CharactersDetail";
import Characters from "./assets/components/Characters";
import UserInput from "./assets/components/UserInput";
import ProtectedRoutes from "./assets/components/ProtectedRoutes";
import "./styles.css";
import Walter from "./assets/components/Walter";


function App() {
  return (
    <HashRouter>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<UserInput />} />
          <Route path="walter" element={<Walter />} />
          
          <Route element={<ProtectedRoutes />}>
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
