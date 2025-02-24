import { useState, useEffect } from "react";

interface LoginFormProps {
  setLoggedIn: (value: boolean) => void;
  setAuthenticated: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  setLoggedIn,
  setAuthenticated,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "username") {
      setUsername(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // console.log("User Logged in successfully");
        setLoggedIn(true);
        localStorage.setItem("token", data.token);
        setAuthenticated(true);
      }
      // else {
      //   console.log("Login failed:", data.message);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <button type="button" onClick={() => setLoggedIn(false)}>
        You don't have an account? Go to Sign Up
      </button>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        required
        onChange={handleInputChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        onChange={handleInputChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
