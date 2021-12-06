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
    isRevealed: false
  };

  return state;
};

const initialState = Object.entries(formData).reduce(
  (acc: Record<FieldID, IOptionState>, [id, data]) => ({ ...acc, [id]: dataToState(id as FieldID, data) }),
  {} as Record<FieldID, IOptionState>
);

export const [formState, setFormState] = createStore(initialState);

////////////////////
// Getters
////////////////////

export const getOptionValue = (id: FieldID) => {
  return formState[id].currentValue;
}

// Getter for determining the next "active" field
// A field is active if it is not disabled, and all previous options
// have valid values.
const fieldOrder: FieldID[] = ["method", "coffee", "weight", "grind", "frequency"];
export const activeField = () => {

  const isFieldActive = (id: FieldID) => {
    for (const field of fieldOrder) {
      if (id === field) break;
      if (getOptionValue(field) !== undefined) return false;
    }

    return true;
  }

  for (const field of fieldOrder) {
    if (isFieldActive(field)) return field;
  }

  return "frequency";
}

////////////////////
// Setters
////////////////////

export const revealOption = (id: FieldID) => {
  setFormState(id, "isRevealed", true);
}

export const setOptionValue = (id: FieldID, value: string) => {
  setFormState(id, "currentValue", value);
}

