import { Component, onMount } from "solid-js";
import { Portal } from "solid-js/web";

import { revealOption } from "./formState";

import { Form } from "./Form";
import { OptionSelector } from "./OptionSelector";
import { Summary } from "./Summary";

export const SubscribeForm: Component = () => {
  onMount(() => {
    // "method" is expanded by default
    revealOption("method");
  });

  return (
    <section>
      <h2 class="sr-only">Create New Subscription</h2>
      <div class="wrapper | lg:grid lg:grid-cols-12 lg:gap-16">
        <div class="hidden lg:block lg:col-span-3">
          <OptionSelector />
        </div>
        <div class="lg:gap-22 lg:col-span-8 lg:col-start-5">
          <Form />
          <div class="mt-30 md: md:mt-35 lg:mt-22">
            <Summary />
          </div>
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
