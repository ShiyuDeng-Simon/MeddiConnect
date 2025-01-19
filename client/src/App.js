import './App.css';
import Conversation from './pages/Conversation'
import { styled } from "@mui/system";
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import Prescriptions from './pages/Prescriptions';
import LlmInterface from './pages/llmInterface';

import {
  Paper
} from "@mui/material";
const Container = styled(Paper)(({ theme }) => ({
  height: "95vh",
  display: "flex",
  flexDirection: "column",
  WebkitOverflowScrolling: "touch",
  borderRadius: 16,
  overflow: "hidden",
  overflowX: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  background: "#f9f9f9",
  padding: "0px",
}));

function App() {
  return (
    <div className="App">
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/conversation" element={<Conversation />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/llmInterface" element={<LlmInterface />} />
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
