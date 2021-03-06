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
focus-visible:bg-primary-600
focus-visible:outline-primary
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

  // id
  id?: string;
};

const AsButton: Component<ButtonProps> = (props: ButtonProps) => {
  const buttonProps: () => Record<string, unknown> = () => {
    const res: Record<string, unknown> = {
      class: classes,
    };
    if (props.id) res.id = props.id;
    if (props.onClick) res.onClick = props.onClick;
    if (props.disabled) res.disabled = props.disabled;

    return res;
  };
  return <button {...buttonProps()}>{props.children}</button>;
};

const AsLink: Component<ButtonProps> = (props: ButtonProps) => {
  const linkProps: () => Record<string, unknown> = () => {
    const res: Record<string, unknown> = {
      class: classes,
    };
    if (props.id) res.id = props.id;
    res.href = props.href ? props.href : "#";

    return res;
  };
  return (
    <a {...linkProps()}>{props.children}</a>
  );
};

export const Button: Component<ButtonProps> = (props: ButtonProps) => {
  return (
    <Dynamic {...props} component={props.href ? AsLink : AsButton}></Dynamic>
  );
};
