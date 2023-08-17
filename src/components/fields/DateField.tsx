import { ChangeEvent, FocusEvent } from 'react';
import { TextField } from "@mui/material";

type DateFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: (value: any) => void;
    error?: boolean;
    errorText?: string;
}

export const DateField = ({ label, value, onChange, onBlur, error, errorText }: DateFieldProps) => {
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
            type="date"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            InputLabelProps={{
                shrink: true,
            }}
            fullWidth
            margin="normal"
            error={error}
            helperText={errorText}
        />
    );
};