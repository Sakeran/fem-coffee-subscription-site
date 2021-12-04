import { Component } from "solid-js";

const OptionSelectorLabel: Component<{
  id: string;
  text: string;
  active?: boolean;
  completed?: boolean;
}> = (props) => {
  const styles = () => {
    return props.active ? "" : "opacity-40";
  };

  const idStyles = () => {
    return props.completed ? "text-primary" : "text-gray";
  };

  return (
    <li
      class={`${styles()} text-6 font-serif font-black py-6 border-b border-gray`}
    >
      <span class={`${idStyles()} inline-block mr-6`}>{props.id}</span>{" "}
      <span>{props.text}</span>
    </li>
  );
};

export const OptionSelector: Component = () => {
  return (
    <ul>
      <OptionSelectorLabel id="01" text="Preferences" completed />
      <OptionSelectorLabel id="02" text="Bean Type" />
      <OptionSelectorLabel id="03" text="Quantity" />
      <OptionSelectorLabel id="04" text="Grind Option" />
      <OptionSelectorLabel id="05" text="Deliveries" active />
    </ul>
  );
};
