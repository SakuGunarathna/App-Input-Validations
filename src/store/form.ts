import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addCustomValidation, addPrimaryValidation } from "../utils/validation";
import { FieldType } from "../utils/enum";
import { Field } from "../utils/types";

export interface FormState {
  fields: { [key: string]: Field };
}

const initialState: FormState = {
  fields: {},
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addField: (
      state: FormState,
      action: PayloadAction<{
        key: string;
        type: FieldType;
        label: string;
        validationRules: string;
      }>
    ) => {
      const { key, type, label, validationRules } = action.payload;

      state.fields[key] = {
        key,
        type,
        label,
        value: "",
        error: false,
        errorText: "",
        validationRules: validationRules,
      };
    },
    setValue: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;
      const field = state.fields[key];

      field.value = value;
    },
    setError: (
      state,
      action: PayloadAction<{ key: string; type: FieldType; value: string }>
    ) => {
      const { key, value, type } = action.payload;
      const field = state.fields[key];
      const { validationRules } = field;

      if (!!validationRules && validationRules !== "[]") {
        const { error, errorText } = addCustomValidation(
          type,
          JSON.parse(validationRules),
          value
        );
        field.error = error;
        field.errorText = errorText;
      } else {
        const { error, errorText } = addPrimaryValidation(type, value);
        field.error = error;
        field.errorText = errorText;
      }
    },
  },
});

export const { addField, setValue, setError } = formSlice.actions;
export const formReducer = formSlice.reducer;
