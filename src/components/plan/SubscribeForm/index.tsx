import { Component } from "solid-js";

import formData from "./formData.json";

import { SubscribeDrawer } from "./SubscribeDrawer";
import { OptionGroup } from "./OptionGroup";

export const SubscribeForm: Component = () => {
  return (
    <section>
      <SubscribeDrawer id={formData[0].id} title={formData[0].title}>
        <OptionGroup {...formData[0]}></OptionGroup>
      </SubscribeDrawer>
    </section>
  );
};
