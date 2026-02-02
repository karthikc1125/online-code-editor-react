import "./landing.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  function handleStart() {
    navigate('/home');
  }

  return (
    <div className="landing">
      {/* Hero */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>
          Online Code Editor
          <span>Build. Run. Share.</span>
        </h1>

        <p>
          A modern, distraction-free online code editor built for developers
          who love speed, elegance, and control.
        </p>

        <div className="actions">
          <button type="button" className="primary" onClick={handleStart}>
            Start Coding
          </button>
          <a
            href="https://github.com/Ashrithhn/online-code-editor-react"
            target="_blank"
            rel="noreferrer"
            className="secondary"
          >
            View on GitHub
          </a>
        </div>
      </motion.section>

      {/* Features */}
      <section className="features">
        {[
          {
            title: "Live Editing",
            desc: "Instant feedback with smooth real-time updates as you type.",
            icon: "</>",
          },
          {
            title: "Fast Execution",
            desc: "Optimized runtime for blazing-fast code execution.",
            icon: "⚡",
          },
          {
            title: "Secure Sandbox",
            desc: "Your code runs in a safe, isolated environment.",
            icon: "🔒",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            className="feature"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <span className="icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </motion.div>
        ))}
      </section>

      <footer>
        © 2026 Codehere — Crafted with precision
      </footer>
    </div>
  );
}
