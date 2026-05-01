import { Route, Routes } from "react-router";

import Testing from "@/pages/3d/Testing";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/3d/testing" element={<Testing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
