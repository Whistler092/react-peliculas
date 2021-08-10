import { CSSProperties } from "react";

export default function Button(props: buttonProps) {
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
      style={props.style}
      className={props.className}
    >
      {props.children}
    </button>
  );
}

interface buttonProps {
  children: React.ReactNode;
  onClick?(): void;
  type: "button" | "submit";
  disabled: boolean;
  className: string;
  style: CSSProperties;
}

Button.defaultProps = {
  type: "button",
  disabled: false,
  className: "btn btn-primary",
  style: null
};
