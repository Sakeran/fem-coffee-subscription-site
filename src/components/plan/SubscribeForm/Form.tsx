import { Component } from "solid-js";

import { Drawer } from "./Drawer";
import { OptionGroup } from "./OptionGroup";

import {
  formState,
  setOptionValue,
  revealOption,
  isCapsuleMethod,
  getFrequencyOptions,
  FieldID,
} from "./formState";

export const Form: Component = () => {
  const focusOnOptions = (id: FieldID) => {
    revealOption(id);
    const target: HTMLDivElement | undefined = document.querySelector(
      `#${id}-options > *:first-child`
    );
    if (target) {
      target.scrollIntoView();
      target.focus({ preventScroll: true });
    }
  };

  return (
    <div class="flex flex-col gap-24 md:gap-25">
      <Drawer
        title={formState.method.optionTitle}
        expanded={formState.method.isRevealed}
      >
        <OptionGroup
          id="method"
          title={formState.method.optionTitle}
          currentValue={formState.method.currentValue}
          options={formState.method.options}
          onSelect={(v) => {
            setOptionValue("method", v);
            focusOnOptions("coffee");
          }}
        />
      </Drawer>
      <Drawer
        title={formState.coffee.optionTitle}
        expanded={formState.coffee.isRevealed}
      >
        <OptionGroup
          id="coffee"
          title={formState.coffee.optionTitle}
          currentValue={formState.coffee.currentValue}
          options={formState.coffee.options}
          onSelect={(v) => {
            setOptionValue("coffee", v);
            focusOnOptions("weight");
          }}
        />
      </Drawer>
      <Drawer
        title={formState.weight.optionTitle}
        expanded={formState.weight.isRevealed}
      >
        <OptionGroup
          id="weight"
          title={formState.weight.optionTitle}
          currentValue={formState.weight.currentValue}
          options={formState.weight.options}
          onSelect={(v) => {
            setOptionValue("weight", v);
            revealOption("grind");
            if (isCapsuleMethod()) {
              focusOnOptions("frequency");
            } else {
              focusOnOptions("grind");
            }
          }}
        />
      </Drawer>
      <Drawer
        title={formState.grind.optionTitle}
        disabled={isCapsuleMethod()}
        expanded={formState.grind.isRevealed}
      >
        <OptionGroup
          id="grind"
          title={formState.grind.optionTitle}
          currentValue={formState.grind.currentValue}
          options={formState.grind.options}
          onSelect={(v) => {
            setOptionValue("grind", v);
            focusOnOptions("frequency");
          }}
        />
      </Drawer>
      <Drawer
        title={formState.frequency.optionTitle}
        expanded={formState.frequency.isRevealed}
      >
        <OptionGroup
          id="frequency"
          title={formState.frequency.optionTitle}
          currentValue={formState.frequency.currentValue}
          options={getFrequencyOptions()}
          onSelect={(v) => setOptionValue("frequency", v)}
        />
      </Drawer>
    </div>
  );
};
