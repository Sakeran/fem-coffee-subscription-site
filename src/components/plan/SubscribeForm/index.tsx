import { Component, For } from "solid-js";

import formData from "./formData.json";

import { SubscribeDrawer } from "./SubscribeDrawer";
import { OptionGroup } from "./OptionGroup";
import { OptionSelector } from "./OptionSelector";

export const SubscribeForm: Component = () => {
  const handleSelection = (fieldId, option) => {
    console.log(fieldId, option);
  };

  return (
    <section>
      <div class="wrapper">
        <div class="hidden">
          <OptionSelector />
        </div>
        <div class="flex flex-col gap-24 md:gap-25 lg:gap-22">
          <For
            each={formData}
            children={(optionGroup) => (
              <SubscribeDrawer id={optionGroup.id} title={optionGroup.title}>
                <OptionGroup
                  {...optionGroup}
                  onSelect={(option) => handleSelection(optionGroup.id, option)}
                />
              </SubscribeDrawer>
            )}
          />
        </div>
      </div>
    </section>
  );
};
