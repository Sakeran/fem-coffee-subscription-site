import { Component } from "solid-js";

export const Option: Component<{
  data: { label: string; text: string };
  group: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
}> = (props) => {
  const bg = () => {
    if (props.isSelected) {
      return "bg-primary text-white focus-within:outline-primary";
    }
    return "bg-cream-200 hover:bg-accent focus-within:bg-accent outline-none";
  };

  const labelID = `${props.group}-${props.data.label}`;

  const handleClick = (e: Event) => {
    e.preventDefault();
    props.onSelect(props.data.label);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Activate current element.
    if (e.key == " " || e.key == "Enter") {
      e.preventDefault();
      props.onSelect(props.data.label);
    }
  };

  return (
    <div
      role="radio"
      tabindex="0"
      aria-checked={props.isSelected}
      aria-labelledby={labelID}
      class={`${bg()} p-6 w-full md:min-h-[250px] rounded-lg transition-colors cursor-pointer`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <label
        id={labelID}
        class="block text-6 font-serif font-black leading-tight cursor-pointer"
      >
        {props.data.label}
      </label>
      <p class="mt-2">{props.data.text}</p>
    </div>
  );
};
