import React from "react";
import PlanBrowsingPage from "./components/PlanBrowsingPage";
import ChatBot from "./components/chatbot"; // <-- Import the chatbot

import "./App.css";

function App() {
  return (
    <div className="App">
      <PlanBrowsingPage />
      <ChatBot /> {/* <-- Render the chatbot here */}
    </div>
  );
}

export default App;
