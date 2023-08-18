import * as yup from "yup";
import { FieldType, validationConst } from "./enum";

export const addPrimaryValidation = (type: string, value: string) => {
  let schema;
  switch (type) {
    case FieldType.Number:
      schema = yup.object().shape({
        value: yup.number().typeError("invalid number"),
      });
      break;
    case FieldType.String:
      schema = yup.object().shape({
        value: yup.string().typeError("invalid string"),
      });
      break;
    case FieldType.Boolean:
      schema = yup.object().shape({
        value: yup.boolean().typeError("invalid boolean"),
      });
      break;
    case FieldType.Date:
      schema = yup.object().shape({
        value: yup.date().typeError("invalid date"),
      });
      break;
  }

  try {
    performPrimaryValidation(schema, value);
    return { error: false, errorText: "" };
  } catch (error: any) {
    return { error: true, errorText: error.message };
  }
};

export const addCustomValidation = (
  type: string,
  validationRules: any[],
  value: string
) => {
  try {
    switch (type) {
      case FieldType.Number:
        let numberSchema: yup.NumberSchema<any> = yup.number();

        validationRules.forEach((rule) => {
          const method: keyof yup.NumberSchema<any> = rule.method;
          numberSchema = numberSchema[method](...rule.args, rule.message);
        });

        performCustomValidation(numberSchema, value);
        break;
      case FieldType.String:
        let stringSchema: yup.StringSchema<any> = yup.string();

        // add special data fix for yup matches method
        validationRules.map((rule: any) => {
          if (rule.method === validationConst.yup_match_method) {
            rule.args = [new RegExp(rule.args)];
          }
        });

        validationRules.forEach((rule) => {
          const method: keyof yup.StringSchema<any> = rule.method;
          stringSchema = stringSchema[method](...rule.args, rule.message);
        });

        performCustomValidation(stringSchema, value);

        break;
      case FieldType.Boolean:
        break;
      case FieldType.Date:
        let dateSchema: yup.DateSchema<any> = yup.date();

        validationRules.forEach((rule) => {
          const method: keyof yup.DateSchema<any> = rule.method;
          dateSchema = dateSchema[method](...rule.args, rule.message);
        });

        performCustomValidation(dateSchema, value);
        break;
    }

    return { error: false, errorText: "" };
  } catch (error: any) {
    return { error: true, errorText: error.errors.join() };
  }
};

const performPrimaryValidation = (schema: any, value: string) => {
  return schema.validateSync({ value }, { abortEarly: false });
};

const performCustomValidation = (schema: any, value: string) => {
  return schema.validateSync(value, { abortEarly: false });
};
