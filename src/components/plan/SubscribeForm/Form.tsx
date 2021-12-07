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
  const focusOnOptions = (id: FieldID, click?: boolean) => {
    revealOption(id);

    let selected = document.querySelector(
      `#${id}-options > [aria-checked="true"]`
    );
    if (!selected) {
      selected = document.querySelector(`#${id}-options > *:first-child`);
    }

    if (!(selected instanceof HTMLElement)) return;

    selected.scrollIntoView();
    if (!click) {
      selected.focus({ preventScroll: true });
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
          onSelect={(v, isClicked) => {
            setOptionValue("method", v);
            focusOnOptions("coffee", isClicked);
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
          onSelect={(v, isClicked) => {
            setOptionValue("coffee", v);
            focusOnOptions("weight", isClicked);
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
          onSelect={(v, isClicked) => {
            setOptionValue("weight", v);
            revealOption("grind");
            if (isCapsuleMethod()) {
              focusOnOptions("frequency", isClicked);
            } else {
              focusOnOptions("grind", isClicked);
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
          onSelect={(v, isClicked) => {
            setOptionValue("grind", v);
            focusOnOptions("frequency", isClicked);
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
          onSelect={(v, isClicked) => {
            setOptionValue("frequency", v);
            if (!isClicked) {
              const submit = document.getElementById("create-plan");
              if (submit) submit.focus();
            }
          }}
        />
      </Drawer>
    </div>
  );
};
