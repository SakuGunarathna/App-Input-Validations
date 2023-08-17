import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { CheckboxField } from "./fields/CheckboxField";
import { InputField } from "./fields/InputField";
import {
  customNumValField,
  customStringValField,
  customDateValField,
} from "../utils/formValues";
import { FieldType } from "../utils/enum";
import { DateField } from "./fields/DateField";
import { ValidationField } from "../utils/types";

export const ValidationBuilder = ({ type, handleAddValidationRules }: any) => {
  const [validationFields, setValidationFields] = useState<ValidationField[]>(
    []
  );

  useEffect(() => {
    if (type === FieldType.Number) {
      setValidationFields(customNumValField);
    } else if (type === FieldType.String) {
      setValidationFields(customStringValField);
    } else if (type === FieldType.Date) {
      setValidationFields(customDateValField);
    }
  }, [type]);

  const handleChange = (
    type: FieldType,
    key: number,
    value: string,
    validationMethod: string,
    validationText: string
  ) => {
    const updatedObject = validationFields.map((field, k) => {
      if (k === key) {
        return { ...field, value: value };
      }
      return field;
    });
    setValidationFields(updatedObject);

    if (type === FieldType.Boolean) {
      setValidationRules(type, value, validationMethod, validationText);
    }
  };

  const handleBlur = (
    type: FieldType,
    value: string,
    validationMethod: string,
    validationText: string
  ) => {
    setValidationRules(type, value, validationMethod, validationText);
  };

  const setValidationRules = (
    type: FieldType,
    value: string,
    validationMethod: string,
    validationText: string
  ) => {
    let fieldArgs: any[] = [];
    if (type === FieldType.Number) {
      const v = parseInt(value);
      fieldArgs = [v];
    } else if (type === FieldType.String) {
      fieldArgs = [value];
    } else if (type === FieldType.Date) {
      fieldArgs = [value];
    }

    const rule = {
      method: `${validationMethod}`,
      args: fieldArgs,
      message: `${validationText}`,
    };
    handleAddValidationRules(rule);
  };

  const renderFields = () => {
    const renderedFields = [];
    for (const key in validationFields) {
      const field = validationFields[key];
      const type = field.type;
      const label = field.label;
      const value = field.value;
      const error = field.error;
      const errorText = field.errorText;
      const validationMethod = field.validationMethod;
      const validationText = field.validationText;
      const onChange = (value: string) => {
        handleChange(
          type,
          parseInt(key),
          value,
          validationMethod,
          validationText
        );
      };
      const onBlur = (value: string) => {
        handleBlur(type, value, validationMethod, validationText);
      };

      switch (field.type) {
        case FieldType.Number:
        case FieldType.String:
          renderedFields.push(
            <Grid item xs={12} key={key}>
              <InputField
                label={label}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                error={error}
                errorText={errorText}
              />
            </Grid>
          );
          break;
        case FieldType.Boolean:
          renderedFields.push(
            <Grid item xs={12} key={key}>
              <CheckboxField label={label} onChange={onChange} value={value} />
            </Grid>
          );
          break;
        case FieldType.Date:
          renderedFields.push(
            <Grid item xs={12} key={key}>
              <DateField
                label={label}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                error={error}
                errorText={errorText}
              />
            </Grid>
          );
      }
    }

    return renderedFields;
  };

  return (
    <Grid container spacing={2} sx={{ width: 300, margin: "auto" }}>
      {renderFields()}
    </Grid>
  );
};
