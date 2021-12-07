import { Component } from "solid-js";
import { Dynamic, PropAliases } from "solid-js/web";

import { getOptionValue, isCapsuleMethod, optionHasValue } from "./formState";

const Highlight: Component<{ children?: Component }> = (props) => {
  return <span class="text-primary">{props.children}</span>;
};

const Placeholder: Component = () => {
  return (
    <span class="inline-block min-w-[4ch] border-b-2 border-primary"></span>
  );
};

const IDrinkMyCoffeeAs: Component = () => {
  const placeholder = () => (
    <>
      I drink my coffee <Placeholder />,
    </>
  );
  const withCapsules = () => (
    <>
      I drink my coffee using <Highlight>Capsules</Highlight>,
    </>
  );
  const displayDefault = () => (
    <>
      I drink my coffee as <Highlight>{getOptionValue("method")}</Highlight>,
    </>
  );

  const phrase = () => {
    const method = getOptionValue("method");

    if (!method) return placeholder;
    if (method === "Capsule") return withCapsules;
    return displayDefault;
  };

  return <Dynamic component={phrase()} />;
};

const WithBeanType: Component = () => {
  const placeholder = () => (
    <>
      with a <Placeholder /> type of bean.
    </>
  );
  const normal = () => (
    <>
      with a <Highlight>{getOptionValue("coffee")}</Highlight> type of bean.
    </>
  );

  const phrase = () => {
    return optionHasValue("coffee") ? normal : placeholder;
  };

  return <Dynamic component={phrase()} />;
};

const TheWeight: Component = () => {
  const placeholder = () => (
    <>
      <Placeholder />
      <Highlight>g</Highlight>{" "}
    </>
  );
  const normal = () => (
    <>
      <Highlight>{getOptionValue("weight")}</Highlight>{" "}
    </>
  );

  const phrase = () => {
    return optionHasValue("weight") ? normal : placeholder;
  };

  return <Dynamic component={phrase()} />;
};

const TheGrind: Component = () => {
  const placeholder = () => (
    <>
      ground ala <Placeholder />,{" "}
    </>
  );
  const normal = () => (
    <>
      ground ala <Highlight>{getOptionValue("grind")}</Highlight>,{" "}
    </>
  );
  const disabled = <></>;

  const phrase = () => {
    if (isCapsuleMethod()) return disabled;
    return optionHasValue("grind") ? normal : placeholder;
  };

  return <Dynamic component={phrase()} />;
};

const TheFrequency: Component = () => {
  const placeholder = () => (
    <>
      sent to me <Placeholder />
    </>
  );
  const normal = () => (
    <>
      sent to me <Highlight>{getOptionValue("frequency")}</Highlight>.
    </>
  );

  const phrase = () => {
    return optionHasValue("frequency") ? normal : placeholder;
  };

  return <Dynamic component={phrase()} />;
};

export const SummaryPhrase: Component<{ class?: string }> = (props) => {
  return (
    <q class={props.class}>
      <IDrinkMyCoffeeAs /> <WithBeanType /> <TheWeight />
      <TheGrind /> <TheFrequency />
    </q>
  );
};
