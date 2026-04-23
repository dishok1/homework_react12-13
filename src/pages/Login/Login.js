import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Style from "./Login.module.scss";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3030/users");
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email && user.name === name,
      );

      if (foundUser) {
        await fetch("http://localhost:3030/auth", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isLogged: true, currentUser: foundUser }),
        });

        onLogin(true);
        navigate("/");
      } else {
        setError("Користувача не знайдено або дані невірні!");
      }
    } catch (err) {
      setError("Помилка з'єднання з сервером");
    }
  };

  return (
    <div className={Style.loginPage}>
      <form onSubmit={handleSubmit} className={Style.loginForm}>
        <h1>Вхід в систему</h1>
        {error && <p className={Style.errorMessage}>{error}</p>}

        <input
          type="text"
          placeholder="Ваше ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Електронна пошта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Увійти</button>

        <p className={Style.text}>
          Немає акаунту? <Link to="/registration">Зареєструватися</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
