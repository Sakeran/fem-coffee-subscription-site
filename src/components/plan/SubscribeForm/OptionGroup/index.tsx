import { Component, createSignal, For } from "solid-js";

import { Option } from "./Option";

export const OptionGroup: Component<{
  id: string;
  title: string;
  options: { label: string; text: string }[];
  currentValue: string | undefined;
  onSelect: (value: string) => void;
}> = (props) => {

  const select = (value: string) => {
    if (props.currentValue === value) return;
    props.onSelect(value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Focus on next element
    if (
      e.key == "ArrowRight" ||
      e.key == "Right" ||
      e.key == "ArrowDown" ||
      e.key == "Down"
    ) {
      e.preventDefault();

      const target = e.target as HTMLElement;
      const next = target.nextElementSibling as HTMLElement | null;
      if (next) {
        next.focus();
      } else {
        const first = target.parentElement.firstChild as HTMLElement;
        first.focus();
      }
      return;
    }

    // Focus on previous element
    if (
      e.key == "ArrowLeft" ||
      e.key == "Left" ||
      e.key == "ArrowUp" ||
      e.key == "Up"
    ) {
      e.preventDefault();

      // Focus on previous element
      const target = e.target as HTMLElement;
      const previous = target.previousElementSibling as HTMLElement | null;
      if (previous) {
        previous.focus();
      } else {
        const last = target.parentElement.lastElementChild as HTMLElement;
        last.focus();
      }
      return;
    }
  };

  return (
    <div
      class="flex flex-col gap-4 md:flex-row md:gap-2 lg:gap-6"
      id={props.id + "-options"}
      aria-label={props.title}
      role="radiogroup"
      onKeyDown={handleKeyDown}
    >
      <For
        each={props.options}
        children={(opt) => (
          <Option
            data={opt}
            group={props.id}
            isSelected={props.currentValue === opt.label}
            onSelect={select}
          />
        )}
      />
    </div>
  );
};
