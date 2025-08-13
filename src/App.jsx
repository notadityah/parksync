import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header, Footer } from "./components";
import Home from "./pages/Home";
import TheIssue from "./pages/TheIssue";
import FindParking from "./pages/FindParking";
import { getMetricsOnce } from "./services/api";
import "./App.css";

/** 路由切换时滚到顶部 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/** 让 .fade-in 元素在可见时添加 .visible
 *  - 初次加载 & 路由切换时扫描
 *  - 通过 MutationObserver 监听后续新增的 .fade-in（例如数据加载后才渲染的内容）
 */
function FadeInObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    const observeAll = () => {
      document.querySelectorAll(".fade-in:not(.visible)").forEach((el) => io.observe(el));
    };

    // 1) 立即扫描一次
    observeAll();

    // 2) 监听后续 DOM 变更（例如 TheIssue 数据加载完成后插入的内容）
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "childList") {
          m.addedNodes.forEach((node) => {
            if (!(node instanceof HTMLElement)) return;
            if (node.matches?.(".fade-in") && !node.classList.contains("visible")) {
              io.observe(node);
            }
            // 也处理其子孙节点
            node.querySelectorAll?.(".fade-in:not(.visible)").forEach((el) => io.observe(el));
          });
        }
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}

function App() {
  // 开发环境下验证一次 API 是否可用
  useEffect(() => {
    if (import.meta.env.DEV) {
      getMetricsOnce()
        .then((data) => console.log("[App] Metrics loaded", data))
        .catch((err) => console.error("[App] Metrics error", err));
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <FadeInObserver />
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
