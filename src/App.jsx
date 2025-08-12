import { Header, Footer } from "./components";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TheIssue from "./pages/TheIssue";
import FindParking from "./pages/FindParking";
import { getMetricsOnce } from "./services/api";
import "./App.css";

function App() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      getMetricsOnce()
        .then((data) => console.log("[App] Metrics loaded", data))
        .catch((err) => console.error("[App] Metrics error", err));
    }
  }, []);

  useEffect(() => {
  const elements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/the-issue" element={<TheIssue />} />
        <Route path="/find-parking" element={<FindParking />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
