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
    setExpanded(exp => !exp);
  };

  return (
    <div id={`option-${props.id}`} classList={{[Styles.disabled]: props.disabled}}>
      <button
        class="w-full flex justify-between items-center"
        aria-expanded={expanded()}
        aria-controls={`option-${props.id}-content`}
        onClick={onToggle}
      >
        <span class="text-gray text-6 font-serif font-black leading-tigher text-left">{props.title}</span>{" "}
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
        <div class={Styles.inner}>{props.children}</div>
      </div>
    </div>
  );
};
