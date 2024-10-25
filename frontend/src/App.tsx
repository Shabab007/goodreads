// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BookDetails from "./pages/BookDetails";
import Layout from "./Layout";

import { UserProvider } from "./context/UserContext";
import RequireUser from "./components/RequiredUser";
import CreateUser from "./pages/CreateUser";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Route for user creation page */}
          <Route path="/create-user" element={<CreateUser />} />

          {/* Protected routes */}
          <Route element={<RequireUser />}>
            <Route path="/" element={<Layout><MainPage /></Layout>} />
            <Route path="/books/:id" element={<Layout><BookDetails /></Layout>} />
            {/* other protected routes */}
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
