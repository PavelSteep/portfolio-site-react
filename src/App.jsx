import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ленивые импорты
const Layout = React.lazy(() => import("./components/Layouts/Layout"));
const Home = React.lazy(() => import("./pages/home/Home"));
const About = React.lazy(() => import("./pages/About/About"));
const Contact = React.lazy(() => import("./pages/contact/Contact"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
