import { Component, onMount } from "solid-js";
import { Portal } from "solid-js/web";

import {
  formState,
  setFormState,
  revealOption,
  setOptionValue,
  FieldID,
} from "./formState";

import { Drawer } from "./Drawer";
import { OptionGroup } from "./OptionGroup";

import { OptionSelector } from "./OptionSelector";

export const SubscribeForm: Component = () => {
  onMount(() => {
    // "method" is expanded by default
    revealOption("method");
  });

  const focusOnOptions = (id: string) => {
    const target: HTMLDivElement | undefined = document.querySelector(
      `#${id}-options > *:first-child`
    );
    if (target) {
      target.scrollIntoView();
      target.focus();   
    }
  };

  return (
    <section>
      <div class="wrapper | lg:grid lg:grid-cols-12 lg:gap-16">
        <div class="hidden lg:block lg:col-span-3">
          <OptionSelector formState={formState} />
        </div>
        <div class="flex flex-col gap-24 md:gap-25 lg:gap-22 lg:col-span-8 lg:col-start-5">
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
                revealOption("coffee");
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
                revealOption("weight");
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
                if (formState.method.currentValue == "Capsule") {
                  revealOption("frequency");
                  focusOnOptions("frequency");
                } else {
                  focusOnOptions("grind");
                }
              }}
            />
          </Drawer>
          <Drawer
            title={formState.grind.optionTitle}
            disabled={formState.method.currentValue === "Capsule"}
            expanded={formState.grind.isRevealed}
          >
            <OptionGroup
              id="grind"
              title={formState.grind.optionTitle}
              currentValue={formState.grind.currentValue}
              options={formState.grind.options}
              onSelect={(v) => {
                setOptionValue("grind", v);
                revealOption("frequency");
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
              options={formState.frequency.options}
              onSelect={v => setOptionValue("frequency", v)}
            />
          </Drawer>
        </div>
      </div>
      <Portal children>
        <div class="z-50 fixed top-0 right-0 bottom-0 left-0 pointer-events-none hidden">
          PORTAL
        </div>
      </Portal>
    </section>
  );
};
