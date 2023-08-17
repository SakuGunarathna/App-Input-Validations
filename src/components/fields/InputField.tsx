import { ChangeEvent, FocusEvent } from 'react';
import { TextField } from "@mui/material";

type InputFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: (value: any) => void;
    error?: boolean;
    errorText?: string;
}

export const InputField = ({ label, value, onChange, onBlur, error, errorText, ...rest }: InputFieldProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(event.target.value);
        }
    };

    return (
        <TextField
            label={label}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            margin="normal"
            error={error}
            helperText={errorText}
            {...rest}
        />
    );
};