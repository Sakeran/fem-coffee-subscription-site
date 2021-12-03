import { Component, For } from "solid-js";

import formData from "./formData.json";

import { SubscribeDrawer } from "./SubscribeDrawer";
import { OptionGroup } from "./OptionGroup";

const OptionSelectorLabel: Component<{
  id: string;
  text: string;
  active?: boolean;
  completed?: boolean;
}> = (props) => {

  const styles = () => {
    return props.active ? "" : "opacity-40";
  }

  const idStyles = () => {
    return props.completed ? "text-primary" : "text-gray";
  }

  return (
    <li class={`${styles()} text-6 font-serif font-black py-6 border-b border-gray`}>
      <span class={`${idStyles()} inline-block mr-6`}>{props.id}</span> <span>{props.text}</span>
    </li>
  );
};

const OptionSelector: Component = () => {
  return (
    <ul>
      <OptionSelectorLabel id="01" text="Preferences" completed />
      <OptionSelectorLabel id="02" text="Bean Type" />
      <OptionSelectorLabel id="03" text="Quantity" />
      <OptionSelectorLabel id="04" text="Grind Option" />
      <OptionSelectorLabel id="05" text="Deliveries" active />
    </ul>
  );
};

export const SubscribeForm: Component = () => {
  const handleSelection = (fieldId, option) => {
    console.log(fieldId, option);
  };

  return (
    <section>
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
    </section>
  );
};
