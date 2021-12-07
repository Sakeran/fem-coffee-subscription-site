import { Component } from "solid-js";

import { SummaryPhrase } from "./SummaryPhrase";

import { Button } from "../../shared/Button";

//pointer-events-none hidden

export const SummaryModal: Component<{
  visible: boolean;
  onClose: () => void;
}> = (props) => {
  const outerStyles = () => {
    let classes = "z-50 fixed top-0 right-0 bottom-0 left-0 transition-opacity";
    if (!props.visible) {
      classes += " opacity-0 pointer-events-none";
    }

    return classes;
  };

  let modalRef: HTMLDivElement;

  const close = (e?: Event) => {
    if (e) {
      e.preventDefault();
    }

    if (props.onClose) {
      props.onClose();
    }
  };

  const handleCapture = (e: KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Esc") {
      close();
    }

    if (e.key === "Tab") {
      if (!(e.target instanceof Node)) return;

      if (e.target instanceof HTMLButtonElement) {
        return e.preventDefault();
      }
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (e.target instanceof Node && !modalRef.contains(e.target)) {
      close();
    }
  };

  return (
    <div class={outerStyles()} onKeyDown={handleCapture} onClick={handleClick}>
      <div class="absolute top-0 bottom-0 left-0 right-0 bg-black/50 | flex items-center">
        <div class="wrapper">
          <div
            ref={modalRef}
            class="bg-cream rounded-lg overflow-hidden max-w-[33.75rem]"
          >
            <div class="px-6 py-7 | text-cream text-7 font-serif font-black | bg-prose bg-cover bg-modal">
              <h2 id="order-summary" tabindex="-1" class="focus:outline-none">
                Order Summary
              </h2>
            </div>
            <div class="pt-10 pb-6 px-6 md:p-14">
              <SummaryPhrase class="text-gray text-6 font-serif font-black" />
              <p class="mb-6 md:mb-8 md:mt-2 | text-base-sm">
                Is this correct? You can proceed to checkout or go back to plan
                seletion if something is off. Subscription discount codes can
                also be redeemed at the checkout.
              </p>
              {/* Price+Button for tablet and up */}
              <div class="hidden md:flex md:items-center md:gap-3">
                <p class="text-8 font-serif font-black">$14.00/mo</p>
                <Button onClick={close}>Checkout</Button>
              </div>
              {/* Combined button for mobile */}
              <div class="max-w-max mx-auto md:hidden">
                <Button>
                  <span class="mx-4">Checkout - $14.00/mo</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
