import { FieldType } from "./enum";

export type Field = {
  [x: string]: any;
  key: string;
  type: FieldType;
  label: string;
  value: string;
  error: boolean;
  errorText: string;
  validationRules?: string;
};

export type ValidationField = {
  key: string;
  type: FieldType;
  label: string;
  value: string;
  error: boolean;
  errorText: string;
  validationMethod: string;
  validationText: string;
};
