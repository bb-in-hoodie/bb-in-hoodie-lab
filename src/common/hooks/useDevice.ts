import { useSyncExternalStore } from "react";

export type Device = "pc" | "mobile";

// keep this query in sync with the media-pc mixin in src/common/styles/mixins.scss
const DESKTOP_QUERY = "(min-width: 768px) and (min-height: 501px)";

let desktopMediaQueryList: MediaQueryList | undefined;

function getDesktopMediaQueryList() {
  desktopMediaQueryList ??= window.matchMedia(DESKTOP_QUERY);
  return desktopMediaQueryList;
}

function subscribe(callback: () => void) {
  const mediaQueryList = getDesktopMediaQueryList();
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getSnapshot(): Device {
  return getDesktopMediaQueryList().matches ? "pc" : "mobile";
}

function useDevice() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

export default useDevice;
