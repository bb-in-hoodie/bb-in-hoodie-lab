import classNames from "classnames/bind";
import { type KeyboardEvent, type PointerEvent as ReactPointerEvent, useRef } from "react";

import { clamp } from "@/common/helpers/math";

import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

export interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  className?: string;
}

function Slider({ label, value, min, max, step, onChange, formatValue, className }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const applyPointer = (clientX: number) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const rect = track.getBoundingClientRect();
    const t = clamp((clientX - rect.left) / rect.width, 0, 1);
    let next = min + t * (max - min);
    if (step) {
      next = Math.round(next / step) * step;
    }
    onChange(clamp(next, min, max));
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    applyPointer(e.clientX);
    const move = (ev: PointerEvent) => applyPointer(ev.clientX);
    const up = () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const delta = step ?? (max - min) / 100;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      onChange(clamp(value + delta, min, max));
      e.preventDefault();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      onChange(clamp(value - delta, min, max));
      e.preventDefault();
    }
  };

  const fill = `${((clamp(value, min, max) - min) / (max - min)) * 100}%`;

  return (
    <div className={cx("slider", className)}>
      <div className={cx("header")}>
        <span className={cx("label")}>{label}</span>
        <span className={cx("value")}>{formatValue ? formatValue(value) : value}</span>
      </div>
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={formatValue ? formatValue(value) : undefined}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        className={cx("track-area")}
      >
        <div className={cx("track")} />
        <div className={cx("fill")} style={{ width: fill }} />
        <div className={cx("thumb")} style={{ left: fill }} />
      </div>
    </div>
  );
}

export default Slider;
