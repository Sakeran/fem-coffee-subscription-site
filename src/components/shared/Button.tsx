import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";

const classes = `inline-block
min-w-[13.75rem]
px-2
py-4
rounded-md
|
bg-primary
disabled:bg-disabled
text-cream text-base-lg
font-serif
text-center
hover:bg-primary-600
focus-within:bg-primary-600
|
transition-colors
ease-in-out
duration-150`;

type ButtonProps = {
  children?: Component[] | Component;

  // Button Props
  disabled?: boolean;
  onClick?: (e: Event) => void;

  // Link Props
  href?: string;
};

const AsButton: Component<ButtonProps> = (props: ButtonProps) => {
  return (
    <button class={classes} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

const AsLink: Component<ButtonProps> = (props: ButtonProps) => {
  return (
    <a class={classes} href={props.href || "#"}>
      {props.children}
    </a>
  );
};

export const Button: Component<ButtonProps> = (props: ButtonProps) => {
  return (
    <Dynamic
      {...props}
      component={props.href ? AsLink : AsButton}
    ></Dynamic>
  );
};
