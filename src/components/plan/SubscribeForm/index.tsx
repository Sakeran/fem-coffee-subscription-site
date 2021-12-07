import { Component, createSignal, onMount } from "solid-js";
import { Portal } from "solid-js/web";

import { formCompleted, revealOption } from "./formState";

import { Form } from "./Form";
import { OptionSelector } from "./OptionSelector";
import { Summary } from "./Summary";
import { Button } from "../../shared/Button";
import { SummaryModal } from "./SummaryModal";

export const SubscribeForm: Component = () => {
  const [modalVisible, setModalVisible] = createSignal(false);

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
          <div class="mt-14 | flex justify-center lg:justify-end">
            <Button
              id="create-plan"
              disabled={!formCompleted()}
              onClick={() => {
                setModalVisible(true);
                const modal = document.getElementById("order-summary");
                if (modal) {
                  modal.focus();
                }
              }}
            >
              Create my plan!
            </Button>
          </div>
        </div>
      </div>
      <Portal children>
        <SummaryModal visible={modalVisible()} onClose={() => setModalVisible(false)} />
      </Portal>
    </section>
  );
};
