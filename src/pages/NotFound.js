
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "72px", margin: "0" }}>404</h1>
      <h2>Упссс! Сторінку не знайдено</h2>
      <p>Здається, ви зайшли кудись не туди.</p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#3498db",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        Повернутися Додому
      </Link>
    </div>
  );
};

export default NotFound;
