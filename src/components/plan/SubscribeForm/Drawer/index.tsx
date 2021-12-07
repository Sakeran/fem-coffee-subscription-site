import { children, Component } from "solid-js";

import Styles from "./Drawer.module.scss";

export const Drawer: Component<{
  title: string;
  disabled?: boolean;
  expanded: boolean;
  children?: Component | Component[];
  onToggle?: () => void;
}> = (props) => {
  const isExpanded = () => !props.disabled && props.expanded;
  const content = children(() => props.children);

  let toggle: HTMLButtonElement;

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" || e.key == "Esc") {
      e.preventDefault();
      if (props.onToggle) props.onToggle();
      if (!props.expanded) toggle.focus();
    }
  }

  return (
    <div classList={{ [Styles.disabled]: props.disabled }} onKeyDown={handleEscape}>
      <button ref={toggle} onClick={() => props.onToggle && props.onToggle()} class="w-full flex justify-between items-center text-gray focus-visible:text-prose outline-none">
        <span class="text-6 font-serif font-black leading-tigher text-left transition-colors">
          {props.title}
        </span>{" "}
        <span class={Styles.icon} data-visible={isExpanded()}>
          <img
            class="option-drawer-icon"
            src="/assets/plan/desktop/icon-arrow.svg"
            alt=""
          />
        </span>
      </button>
      <div data-visible={isExpanded()} class={Styles.content}>
        <div class={Styles.inner}>
          <div class="pt-8 md:pt-10 lg:pt-14">{content()}</div>
        </div>
      </div>
    </div>
  );
};
