import { createStore } from "solid-js/store";
import formData from "./formData.json";

export type FieldID = "method" | "coffee" | "weight" | "grind" | "frequency";

export interface IOptionState {
  id: FieldID;
  optionTitle: string;
  options: { label: string; text: string }[];
  currentValue: string | undefined;
  isRevealed: boolean;
}

const dataToState = (id: FieldID, data: any) => {
  const state: IOptionState = {
    id,
    optionTitle: data.title,
    options: data.options,
    currentValue: undefined,
    isRevealed: false,
  };

  return state;
};

const initialState = Object.entries(formData).reduce(
  (acc: Record<FieldID, IOptionState>, [id, data]) => ({
    ...acc,
    [id]: dataToState(id as FieldID, data),
  }),
  {} as Record<FieldID, IOptionState>
);

export const [formState, setFormState] = createStore(initialState);

////////////////////
// Getters
////////////////////

// Returns the current value of the field.
export const getOptionValue = (id: FieldID) => {
  return formState[id].currentValue;
};

// Returns true if the given field has a set value.
export const optionHasValue = (id: FieldID) => {
  return !!getOptionValue(id);
};

// Returns true if all of the given fields have set values
// (For use by the OptionSelector component to determine the correct stage)
export const allOptionsHaveValues = (...ids: FieldID[]) => {
  return ids.reduce((res, id) => res && optionHasValue(id), true);
};

// Returns true if "Capsule" is selected as the method.
export const isCapsuleMethod = () => {
  return getOptionValue("method") === "Capsule";
};

// Returns true if the form is completed
export const formCompleted = () => {
  if (isCapsuleMethod()) {
    return allOptionsHaveValues("coffee", "weight", "frequency");
  }
  return allOptionsHaveValues(
    "method",
    "coffee",
    "weight",
    "grind",
    "frequency"
  );
};

////////////////////
// Setters
////////////////////

export const revealOption = (id: FieldID) => {
  setFormState(id, "isRevealed", true);
};

export const setOptionValue = (id: FieldID, value: string) => {
  setFormState(id, "currentValue", value);
};
