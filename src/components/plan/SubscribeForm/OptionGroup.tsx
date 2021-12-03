import { Component, createSignal, For } from "solid-js";

const Option: Component<{
  data: { label: string; text: string };
  groupId: string;
  idx: number;
  isSelected: boolean;
}> = (option) => {
  const bg = () => {
    if (option.isSelected) {
      return "bg-primary text-white focus-within:outline-primary";
    }
    return "bg-cream-200 hover:bg-accent focus-within:bg-accent outline-none";
  };

  const labelID = `${option.groupId}-${option.idx}`;

  return (
    <div
      role="radio"
      tabindex="0"
      aria-checked={option.isSelected}
      aria-labelledby={labelID}
      data-option-idx={option.idx}
      class={`${bg()} p-6 rounded-lg transition-colors cursor-pointer`}
    >
      <label id={labelID} class="block text-6 font-serif font-black leading-tight">
        {option.data.label}
      </label>
      <p class="mt-2">{option.data.text}</p>
    </div>
  );
};

export const OptionGroup: Component<{
  id: string;
  title: string;
  options: { label: string; text: string }[];
  onSelect?: (option: { label: string; text: string }) => void;
}> = (props) => {
  const [selectedIdx, setSelectedIdx] = createSignal(-1);

  const select = (id: number) => {
    if (id === selectedIdx()) return;
    setSelectedIdx(id);
    if (props.onSelect) {
      props.onSelect(props.options[id]);
    }
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();

    // Click might be on a child element (paragraph)
    // Select the containing div.
    let target = e.target as HTMLElement;
    while (target && !target.hasAttribute("data-option-idx")) {
      target = target.parentElement;
    }
    if (!target) return;

    // Select the targeted div.
    const idx = target.getAttribute("data-option-idx");
    select(parseInt(idx));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Activate current element.
    if (e.key == " " || e.key == "Enter") {
      e.preventDefault();

      const target = e.target as HTMLElement;
      const idx = target.getAttribute("data-option-idx");
      select(parseInt(idx));
    }

    // Focus on next element
    if (
      e.key == "ArrowRight" ||
      e.key == "Right" ||
      e.key == "ArrowDown" ||
      e.key == "Down"
    ) {
      e.preventDefault();

      // Focus on next element
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
      aria-label={props.title}
      role="radiogroup"
      class="space-y-4"
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      <For
        each={props.options}
        children={(opt, i) => (
          <Option
            data={opt}
            groupId={props.id}
            idx={i()}
            isSelected={selectedIdx() == i()}
          />
        )}
      />
    </div>
  );
};
