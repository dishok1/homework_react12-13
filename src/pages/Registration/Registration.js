import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Style from "./Registration.module.scss"; 

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const newUser = { name, email };

    try {
      // 1. Перевіряємо, чи немає вже користувача з таким email
      const checkRes = await fetch(`http://localhost:3030/users?email=${email}`);
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        setError("Користувач з такою поштою вже існує!");
        setLoading(false);
        return;
      }

      // 2. Якщо все ок — реєструємо
      const res = await fetch("http://localhost:3030/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        navigate("/login");
      }
    } catch (err) {
      setError("Помилка з'єднання з сервером");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.card}>
        <h2 className={Style.title}>Створити акаунт</h2>
        <p className={Style.subtitle}>Приєднуйтесь до нашого списку справ</p>

        <form onSubmit={handleSubmit} className={Style.form}>
          <div className={Style.inputGroup}>
            <label>Ваше ім'я</label>
            <input
              type="text"
              placeholder="Введіть ім'я"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={Style.inputGroup}>
            <label>Електронна пошта</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <div className={Style.errorMessage}>{error}</div>}

          <button type="submit" className={Style.button} disabled={loading}>
            {loading ? "Реєстрація..." : "Зареєструватися"}
          </button>
        </form>

        <p className={Style.footerText}>
          Вже маєте акаунт? <Link to="/login">Увійти</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
