import { Header, Footer } from "./components";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TheIssue from "./pages/TheIssue";
import FindParking from "./pages/FindParking";
import { getMetricsOnce } from "./services/api";
import "./App.css";

function App() {
  // Dev-only smoke test: triggers the API call once and logs
  useEffect(() => {
    if (import.meta.env.DEV) {
      getMetricsOnce()
        .then((data) => console.log("[App] Metrics loaded", data))
        .catch((err) => console.error("[App] Metrics error", err));
    }
  }, []);
  return (
    <BrowserRouter basename="/parksync">
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
