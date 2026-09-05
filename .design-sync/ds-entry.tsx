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
export { default as Button } from "@/common/components/form/Button/Button";
export { default as Checkbox } from "@/common/components/form/Checkbox/Checkbox";
export { default as ControlPanel } from "@/common/components/form/ControlPanel/ControlPanel";
export { default as Fieldset } from "@/common/components/form/Fieldset/Fieldset";
export { default as RadioGroup } from "@/common/components/form/RadioGroup/RadioGroup";
export { default as Select } from "@/common/components/form/Select/Select";
export { default as Slider } from "@/common/components/form/Slider/Slider";
export { default as Stepper } from "@/common/components/form/Stepper/Stepper";
export { default as GitHub } from "@/common/components/GitHub/GitHub";
export { default as Home } from "@/common/components/Home/Home";
export { default as IconLink } from "@/common/components/IconLink/IconLink";
export { default as Tabs } from "@/common/components/Tabs/Tabs";
export { default as Tags } from "@/common/components/Tags/Tags";
