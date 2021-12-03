import { Component, createSignal } from "solid-js";

import Styles from "../SubscribeForm/SubscribeDrawer.module.scss";

export const SubscribeDrawer: Component<{
  id: string;
  title: string;
  disabled?: boolean;
  children?: Component | Component[];
}> = (props) => {
  const [expanded, setExpanded] = createSignal(false);

  const isExpanded = () => expanded() && !props.disabled;

  const onToggle = () => {
    if (props.disabled) return;
    setExpanded((exp) => !exp);
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key !== "Esc" && e.key !== "Escape") return;

    e.preventDefault();
    setExpanded(false);
    document.getElementById(`option-${props.id}-toggle`).focus();
  }

  return (
    <div
      id={`option-${props.id}`}
      classList={{ [Styles.disabled]: props.disabled }}
      onKeyDown={handleEscape}
      >
      <button
        id={`option-${props.id}-toggle`}
        class="w-full flex justify-between items-center text-gray focus-within:text-prose outline-none"
        aria-expanded={expanded()}
        aria-controls={`option-${props.id}-content`}
        onClick={onToggle}
      >
        <span class="text-6 font-serif font-black leading-tigher text-left transition-colors">
          {props.title}
        </span>{" "}
        <span class={Styles.icon} data-visible={expanded()}>
          <img
            class="option-drawer-icon"
            src="/assets/plan/desktop/icon-arrow.svg"
            alt=""
          />
        </span>
      </button>
      <div
        id={`option-${props.id}-content`}
        data-visible={isExpanded()}
        class={Styles.content}
      >
        <div class={Styles.inner}>
          <div class="pt-8">{props.children}</div>
        </div>
      </div>
    </div>
  );
};
