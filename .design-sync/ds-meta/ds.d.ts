// Type contract for the design-sync bundle. Mirrors the props of each storied
// component (see src/common/components/<Name>/<Name>.tsx). Hand-authored: the
// app is built as a Vite app, not a typed library, so there is no emitted .d.ts
// to ship. Keep these in sync with the component sources — see
// .design-sync/NOTES.md "Re-sync risks".
import type { FC, ReactNode } from "react";

export interface ArticleProps {
  title: string;
  tags: string[];
  description: string;
  githubUrl?: string;
  homeUrl?: string;
  className?: string;
}
export declare const Article: FC<ArticleProps>;

export interface CommonLayoutProps {
  title: string;
  tags: string[];
  description: string;
  githubUrl?: string;
  children?: ReactNode;
}
export declare const CommonLayout: FC<CommonLayoutProps>;

export interface DescriptionProps {
  children: ReactNode;
}
export declare const Description: FC<DescriptionProps>;

export interface GitHubProps {
  url: string;
  className?: string;
}
export declare const GitHub: FC<GitHubProps>;

export interface HomeProps {
  url: string;
  className?: string;
}
export declare const Home: FC<HomeProps>;

export interface IconLinkProps {
  url: string;
  iconSrc: string;
  ariaLabel: string;
  className?: string;
  iconClassName?: string;
  eventName?: string;
}
export declare const IconLink: FC<IconLinkProps>;

export interface TagsProps {
  tags: string[];
}
export declare const Tags: FC<TagsProps>;

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}
export declare const Button: FC<ButtonProps>;

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  ariaLabel?: string;
  className?: string;
}
export declare const Checkbox: FC<CheckboxProps>;

export interface ControlPanelProps {
  children: ReactNode;
  className?: string;
}
export declare const ControlPanel: FC<ControlPanelProps>;

export interface FieldsetProps {
  legend: string;
  children: ReactNode;
  className?: string;
}
export declare const Fieldset: FC<FieldsetProps>;

export interface RadioOption {
  value: string;
  label: string;
}
export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}
export declare const RadioGroup: FC<RadioGroupProps>;

export interface SelectOption {
  value: string;
  label: string;
}
export interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}
export declare const Select: FC<SelectProps>;

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
export declare const Slider: FC<SliderProps>;

export interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  mode?: "numeric" | "decimal";
  label?: string;
  formatValue?: (value: number) => string;
  className?: string;
}
export declare const Stepper: FC<StepperProps>;
