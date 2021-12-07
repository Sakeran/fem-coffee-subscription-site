import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";

import {
  formState,
  getOptionValue,
  isCapsuleMethod,
  optionHasValue,
} from "./formState";
import { SummaryPhrase } from "./SummaryPhrase";



export const Summary: Component = () => {
  return (
    <div class="py-8 px-6 md:py-7 md:px-11 lg:px-16 | bg-prose bg-cover bg-summary lg:bg-summary-lg rounded-10 text-cream text-6 font-serif font-black">
      <h3 class="text-base font-sans font-normal uppercase opacity-50">
        Order Summary
      </h3>
      <SummaryPhrase class="block mt-2" />
    </div>
  );
};
