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

////////////////////
// Misc
////////////////////

const frequencyCosts = {
  "250g": {
    "Every week": "7.20",
    "Every 2 weeks": "9.60",
    "Every month": "12.00",
  },
  "500g": {
    "Every week": "13.00",
    "Every 2 weeks": "17.50",
    "Every month": "22.00",
  },
  "1000g": {
    "Every week": "22.00",
    "Every 2 weeks": "32.00",
    "Every month": "42.00",
  },
};


// Gets the parameterized set of options for the Frequency group,
// depending on the weight.
export const getFrequencyOptions = () => {
  const opts = formState.frequency.options;
  const weight = formState.weight.currentValue || "250g";

  return opts.map(({ label, text }) => {
    const cost = frequencyCosts[weight][label];

    const newText = `$${cost} ${text}`;

    return { label, text: newText };
  });
};

const calculateMonthlyCost = (weight: string, frequency: string) => {
  const error = "$00.00";

  if (!weight || !frequency) return error;

  const weightOpts = frequencyCosts[weight];
  if (!weightOpts) return error;

  const val: string = weightOpts[frequency];
  if (!val) return error;

  const monthly = parseFloat(val) * 4;

  return `$${monthly.toFixed(2)}`;
};

export const getMonthlyCost = () => {
  return calculateMonthlyCost(getOptionValue("weight"), getOptionValue("frequency"));
}
