import classNames from "classnames/bind";
import { type KeyboardEvent, type ReactNode, useRef, useState } from "react";

import { trackEvent } from "@/common/helpers/analytics";

import styles from "./Tabs.module.scss";

const cx = classNames.bind(styles);

type TabType = "description" | "controls";

export interface TabItem {
  tabType: TabType;
  label: string;
  panel: ReactNode;
}

interface Props {
  tabs: TabItem[];
}

function Tabs({ tabs }: Props) {
  const [activePanel, setActivePanel] = useState<TabType | null>(null);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([
    /* filled per tab via the ref callback in the button map below */
  ]);

  const selectTab = (tabType: TabType, shouldFocus = false) => {
    const nextPanel = activePanel === tabType ? null : tabType;
    setActivePanel(nextPanel);
    trackEvent("panel_toggle", {
      panel: tabType,
      action: nextPanel === null ? "hide" : "show",
    });

    if (shouldFocus) {
      const index = tabs.findIndex((tab) => tab.tabType === tabType);
      tabRefs.current[index]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // a single tab has nowhere to move to, so avoid self-targeted toggling
    if (tabs.length < 2) {
      return;
    }

    const currentIndex = Math.max(
      tabs.findIndex((tab) => tab.tabType === activePanel),
      0, // fallback
    );

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      selectTab(tabs[(currentIndex + 1) % tabs.length].tabType, true);
      return;
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      selectTab(
        tabs[(currentIndex - 1 + tabs.length) % tabs.length].tabType,
        true,
      );
      return;
    }
  };

  return (
    <div className={cx("tabs")}>
      <div
        role="tablist"
        aria-label="Panels"
        onKeyDown={handleKeyDown}
        className={cx("tablist")}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.tabType === activePanel;

          return (
            <button
              key={tab.tabType}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={getTabId(tab.tabType)}
              aria-selected={isActive}
              aria-controls={getPanelId(tab.tabType)}
              tabIndex={
                isActive || (activePanel === null && index === 0) ? 0 : -1
              }
              onClick={() => selectTab(tab.tabType)}
              className={cx("tab-button", { active: isActive })}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className={cx("panels")}>
        {tabs.map((tab) => {
          const isActive = tab.tabType === activePanel;

          return (
            <div
              key={tab.tabType}
              role="tabpanel"
              id={getPanelId(tab.tabType)}
              aria-labelledby={getTabId(tab.tabType)}
              aria-hidden={!isActive}
              className={cx("panel", tab.tabType, { active: isActive })}
            >
              {tab.panel}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;

function getTabId(tabType: TabType) {
  return `tab-${tabType}`;
}

function getPanelId(tabType: TabType) {
  return `panel-${tabType}`;
}
