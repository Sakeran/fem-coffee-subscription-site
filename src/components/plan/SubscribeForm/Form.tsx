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
  getOptionValue,
  toggleOption,
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

  const focusOnNext = (clicked) => {
    if (!getOptionValue("method")) {
      return focusOnOptions("method", clicked);
    }

    if (!getOptionValue("coffee")) {
      return focusOnOptions("coffee", clicked);
    }

    if (!getOptionValue("weight")) {
      return focusOnOptions("weight", clicked);
    }

    if (!getOptionValue("grind") && !isCapsuleMethod()) {
      return focusOnOptions("grind", clicked);
    }
    
    if (!getOptionValue("frequency")) {
      return focusOnOptions("frequency", clicked);
    }

    if (!clicked) {
      const submit = document.getElementById("create-plan");
      if (submit) submit.focus();
    }
  };

  return (
    <div class="flex flex-col gap-24 md:gap-25">
      <Drawer
        title={formState.method.optionTitle}
        expanded={formState.method.isRevealed}
        onToggle={() => toggleOption("method")}
      >
        <OptionGroup
          id="method"
          title={formState.method.optionTitle}
          currentValue={formState.method.currentValue}
          options={formState.method.options}
          onSelect={(v, isClicked) => {
            setOptionValue("method", v);
            focusOnNext(isClicked);
          }}
        />
      </Drawer>
      <Drawer
        title={formState.coffee.optionTitle}
        expanded={formState.coffee.isRevealed}
        onToggle={() => toggleOption("coffee")}
      >
        <OptionGroup
          id="coffee"
          title={formState.coffee.optionTitle}
          currentValue={formState.coffee.currentValue}
          options={formState.coffee.options}
          onSelect={(v, isClicked) => {
            setOptionValue("coffee", v);
            focusOnNext(isClicked);
          }}
        />
      </Drawer>
      <Drawer
        title={formState.weight.optionTitle}
        expanded={formState.weight.isRevealed}
        onToggle={() => toggleOption("weight")}
      >
        <OptionGroup
          id="weight"
          title={formState.weight.optionTitle}
          currentValue={formState.weight.currentValue}
          options={formState.weight.options}
          onSelect={(v, isClicked) => {
            setOptionValue("weight", v);
            focusOnNext(isClicked);
          }}
        />
      </Drawer>
      <Drawer
        title={formState.grind.optionTitle}
        disabled={isCapsuleMethod()}
        expanded={formState.grind.isRevealed}
        onToggle={() => toggleOption("grind")}
      >
        <OptionGroup
          id="grind"
          title={formState.grind.optionTitle}
          currentValue={formState.grind.currentValue}
          options={formState.grind.options}
          onSelect={(v, isClicked) => {
            setOptionValue("grind", v);
            focusOnNext(isClicked);
          }}
        />
      </Drawer>
      <Drawer
        title={formState.frequency.optionTitle}
        expanded={formState.frequency.isRevealed}
        onToggle={() => toggleOption("frequency")}
      >
        <OptionGroup
          id="frequency"
          title={formState.frequency.optionTitle}
          currentValue={formState.frequency.currentValue}
          options={getFrequencyOptions()}
          onSelect={(v, isClicked) => {
            setOptionValue("frequency", v);
            focusOnNext(isClicked);
          }}
        />
      </Drawer>
    </div>
  );
};
