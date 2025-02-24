import { useState, useEffect } from "react";

interface SignUpFormProps {
  setLoggedIn: (value: boolean) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ setLoggedIn }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "username") {
      setUsername(value);
    } else if (id === "password") {
      setPassword(value);
    } else if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (response.ok) {
        console.log("User registered successfully");
        setLoggedIn(true);
      } else {
        const errorData = await response.json();
        console.log(errorData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <h1>Sign Up</h1>
      <button type="button" onClick={() => setLoggedIn(true)}>
        Do you have an account? Go to Login
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
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        required
        onChange={handleInputChange}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
