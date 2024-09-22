import {React, Suspense, lazy} from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));

// OR
// import About from React.lazy(() => "./components/About");

// To set the path using the window object : (not the right way)
// window.locaation.href = "/";

// Note : useNavigate hook must be used inside/within the "<BrowserRouter> </BrowserRouter>", or else useNavigate hook will not work

function App() {
  return (
    <div>
      <BrowserRouter>
        <div style={{ backgroundColor: "black", color: "white" }}>
          <div
            style={{
              padding: "10px",
            }}
          >
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                listStyle: "none",
                cursor: "pointer",
              }}
            >
              <li>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading....</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<div>Loading....</div>}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<div>Loading....</div>}>
                <Contact />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;