import { type ComponentType } from "react";
import { Route, Routes } from "react-router";

import { type RoutePath, ROUTES } from "@/common/routes/manifest";
import FBOParticles from "@/pages/3d/FBOParticles";
import NotFound from "@/pages/NotFound";

const COMPONENTS: Record<RoutePath, ComponentType> = {
  "/3d/fbo-particles": FBOParticles,
};

function App() {
  return (
    <Routes>
      {ROUTES.map(({ path }) => {
        const Component = COMPONENTS[path];
        return <Route key={path} path={path} element={<Component />} />;
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
