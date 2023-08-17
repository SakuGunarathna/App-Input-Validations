import { RootState } from "../store/config.ts";
import { useDispatch, useSelector } from "react-redux";
import { setValue, setError } from "../store/form.ts";
import { InputField } from "./fields/InputField.tsx";
import { CheckboxField } from "./fields/CheckboxField.tsx";
import { DateField } from "./fields/DateField.tsx";
import { Grid, Typography } from "@mui/material";
import { FieldType } from "../utils/enum.ts";

export const FormView = () => {
  const { fields } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const renderFields = () => {
    const renderedFields = [];
    for (const key in fields) {
      const field = fields[key];
      const label = field.label;
      const type = field.type;
      const onChange = (value: string) => dispatch(setValue({ key, value }));
      const onBlur = (value: string) =>
        dispatch(setError({ key, type, value }));
      const value = field.value;
      const error = field.error;
      const errorText = field.errorText;

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
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Form Preview
        </Typography>
      </Grid>
      {renderFields()}
    </Grid>
  );
};
