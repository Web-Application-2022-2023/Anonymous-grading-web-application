import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadProject from "./pages/Uploadproject";
import ProjectList from "./pages/ProjectList";
import GradingProjects from "./pages/GradingProject";
import { StyledContainer } from "./components/Styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [userJWT, setUserJWT] = useState(localStorage.getItem('jwt'));
  return (
    <Router>
      <StyledContainer> 
        <Routes>
          <Route path="/signup" element={ <Signup/>}></Route>
          <Route path="/login" element={ <Login setUserJWT={setUserJWT}/>}></Route>
          <Route path="/dashboard" element={ <Dashboard/>}></Route>
          <Route path="/uploadProject" element={ <UploadProject/>}></Route>
          <Route path="/gradingProject" element={ <GradingProjects/>}></Route>
          <Route path="/projectList" element={ <ProjectList/>}></Route>
          <Route path="/" element={ <Home/>}></Route>
        </Routes>
      </StyledContainer>
    </Router>
    
    
  );
}

export default App;
