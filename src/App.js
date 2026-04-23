import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const Home = lazy(() => import("./pages/Home/Home"));
const ToDo = lazy(() => import("./components/ToDo/ToDo"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Login = lazy(() => import("./pages/Login/Login"));
const Registration = lazy(() => import("./pages/Registration/Registration"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3030/auth")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setIsAuthenticated(data.isLogged);
      })
      .catch(() => {
        console.log("Помилка авторизації, ставимо false");
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        >
          <Route index element={<Home />} />

          <Route
            path="login"
            element={<Login onLogin={setIsAuthenticated} />}
          />
          <Route
            path="registration"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Registration />
            }
          />
          <Route path="error-page" element={<ErrorPage />} />
          <Route path="not-found-page" element={<NotFound />} />

          <Route element={<PrivateRoute isAllowed={isAuthenticated} />}>
            <Route path="todo-list" element={<ToDo />} />
            <Route path="todo-list/:id" element={<ToDo />} />
            <Route path="about" element={<About />} />
          </Route>

          <Route path="*" element={<Navigate to="/not-found-page" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
