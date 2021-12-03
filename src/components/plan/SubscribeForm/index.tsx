import { Component } from "solid-js";

import { SubscribeDrawer } from "./SubscribeDrawer";

export const SubscribeForm: Component = () => {
  return (
    <section>
      <SubscribeDrawer id="drink-type" title="How do you drink your coffee?">
        <p>TODO</p>
      </SubscribeDrawer>

      <SubscribeDrawer id="coffee-type" title="What type of coffee?">
        <p>TODO</p>
      </SubscribeDrawer>

      <SubscribeDrawer id="weight" title="How much would you like?">
        <p>TODO</p>
      </SubscribeDrawer>
      
      <SubscribeDrawer id="weight" title="Want us to grind them?">
        <p>TODO</p>
      </SubscribeDrawer>
    </section>
  );
};
