import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import TasksManager from "./components/TasksManager";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <main>
      {authenticated ? (
        <div>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
          <TasksManager />
        </div>
      ) : loggedIn ? (
        <LoginForm
          setLoggedIn={setLoggedIn}
          setAuthenticated={setAuthenticated}
        />
      ) : (
        <SignUpForm setLoggedIn={setLoggedIn} />
      )}
    </main>
  );
}

export default App;
