import React from "react";
import { createRoot } from "react-dom/client";

const App: React.FC = () => {
  return (
    <div style={{ color: "brown", fontSize: "100px", fontWeight: "700" }}>
      Hello, World
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
