// Library barrel for design-sync: re-exports every storied component so the
// converter can bundle them into window.<Global>.<Name>. Built by
// .design-sync/vite.ds.config.ts (cfg.buildCmd) into .design-sync/ds-dist/.
//
// Base styles ship in the bundle CSS so designs render on-brand: remote fonts
// first (so the @import lands at the top of the emitted CSS), then the app's
// global resets / theme (dark background, base typography, ul/button resets).
import "./ds-meta/ds-base.css";
import "@/common/styles/globals.scss";

export { default as Article } from "@/common/components/Article/Article";
export { default as CommonLayout } from "@/common/components/CommonLayout/CommonLayout";
export { default as Description } from "@/common/components/Description/Description";
export { default as GitHub } from "@/common/components/GitHub/GitHub";
export { default as Home } from "@/common/components/Home/Home";
export { default as IconLink } from "@/common/components/IconLink/IconLink";
export { default as Tags } from "@/common/components/Tags/Tags";
