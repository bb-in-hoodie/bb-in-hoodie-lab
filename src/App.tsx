import { type ComponentType, lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import { type RoutePath, ROUTES } from "@/common/routes/manifest";
import NotFound from "@/pages/NotFound";

const FBOParticles = lazy(() => import("@/pages/3d/FBOParticles"));

const COMPONENTS: Record<RoutePath, ComponentType> = {
  "/3d/fbo-particles": FBOParticles,
};

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {ROUTES.map(({ path }) => {
          const Component = COMPONENTS[path];
          return <Route key={path} path={path} element={<Component />} />;
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
