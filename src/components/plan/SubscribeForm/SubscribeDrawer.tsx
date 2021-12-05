import { Component, createSignal } from "solid-js";

import Styles from "../SubscribeForm/SubscribeDrawer.module.scss";

export const SubscribeDrawer: Component<{
  id: string;
  title: string;
  disabled?: boolean;
  children?: Component | Component[];
}> = (props) => {
  const [expanded, setExpanded] = createSignal(false);

  let toggleRef: HTMLButtonElement;

  const isExpanded = () => expanded() && !props.disabled;

  const onToggle = () => {
    if (props.disabled) return;
    setExpanded((exp) => !exp);
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key !== "Esc" && e.key !== "Escape") return;

    e.preventDefault();
    setExpanded(false);
    toggleRef.focus();
  }

  return (
    <div
      id={props.id}
      classList={{ [Styles.disabled]: props.disabled }}
      onKeyDown={handleEscape}
      >
      <button
        id={`${props.id}-toggle`}
        class="w-full flex justify-between items-center text-gray focus-within:text-prose outline-none"
        aria-expanded={expanded()}
        aria-controls={`${props.id}-content`}
        onClick={onToggle}
        ref={toggleRef}
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
        id={`${props.id}-content`}
        data-visible={isExpanded()}
        class={Styles.content}
      >
        <div class={Styles.inner}>
          <div class="pt-8 md:pt-10 lg:pt-14">{props.children}</div>
        </div>
      </div>
    </div>
  );
};
