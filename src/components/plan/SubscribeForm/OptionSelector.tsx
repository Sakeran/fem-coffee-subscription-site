import { Component } from "solid-js";

import { Store } from "solid-js/store";
import { FieldID, formState, IOptionState, revealOption } from "./formState";

const OptionSelectorLabel: Component<{
  id: string;
  text: string;
  disabled?: boolean;
  labelColor?: string;
  opacity?: number;
  border?: boolean;
  onClick?: () => void;
}> = (props) => {
  const opacity = {
    25: "opacity-25",
    40: "opacity-40",
    100: "opacity-100",
  };

  const getOpacity = (v) => {
    return opacity[v] || "opacity-100";
  };

  const getBorder = () => {
    if (props.border) return "border-b border-gray/25 pb-6 mb-6";
    return "";
  };

  return (
    <li class={`${getBorder()}`}>
      <button
        disabled={props.disabled}
        class={`${getOpacity(
          props.opacity
        )} hover:opacity-60 focus-within:opacity-60 transition-opacity`}
        onClick={props.onClick}
      >
        <span class={`${props.labelColor || ""} inline-block mr-6`}>
          {props.id}
        </span>
        <span>{props.text}</span>
      </button>
    </li>
  );
};

export const OptionSelector: Component<{
  formState: Store<Record<FieldID, IOptionState>>;
}> = (props) => {
  const handleClick = (id: FieldID) => () => {
    revealOption(id);
    const target: HTMLDivElement | undefined = document.querySelector(`#${id}-options > *:first-child`);
    if (target) {
      target.scrollIntoView();
      target.focus();
    }
  }

  return (
    <ul class="sticky top-6 left-0 | text-6 font-serif font-black leading-tight">
      <OptionSelectorLabel
        id="01"
        text="Preferences"
        labelColor="text-primary"
        onClick={handleClick("method")}
        border
        opacity={props.formState.method.currentValue ? 40 : 100}
      />
      <OptionSelectorLabel
        id="02"
        text="Bean Type"
        onClick={handleClick("coffee")}
        border
        opacity={
          props.formState.method.currentValue &&
          !props.formState.coffee.currentValue
            ? 100
            : 40
        }
      />
      <OptionSelectorLabel
        id="03"
        text="Quantity"
        onClick={handleClick("weight")}
        border
        opacity={
          props.formState.method.currentValue &&
          props.formState.coffee.currentValue &&
          !props.formState.weight.currentValue
            ? 100
            : 40
        }
      />
      <OptionSelectorLabel
        id="04"
        text="Grind Option"
        disabled={formState.method.currentValue === "Capsule"}
        onClick={handleClick("grind")}
        border
        opacity={
          props.formState.method.currentValue == "Capsule"
            ? 25
            : props.formState.method.currentValue &&
              props.formState.coffee.currentValue &&
              props.formState.weight.currentValue &&
              !props.formState.grind.currentValue
            ? 100
            : 40
        }
      />
      <OptionSelectorLabel
        id="05"
        text="Deliveries"
        onClick={handleClick("frequency")}
        opacity={
          props.formState.method.currentValue &&
          props.formState.coffee.currentValue &&
          props.formState.weight.currentValue &&
          (props.formState.grind.currentValue ||
            props.formState.method.currentValue == "Capsule")
            ? 100
            : 40
        }
      />
    </ul>
  );
};
