import { Link } from "react-router-dom";

const ErrorPage = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>Упс! Щось пішло не так на сервері.</h1>
    <Link to="/">Повернутися на головну</Link>
  </div>
);
export default ErrorPage;
