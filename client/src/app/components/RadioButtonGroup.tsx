import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface RadioButtonGroupProps {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}

const RadioButtonGroup = ({ options, onChange, selectedValue }: RadioButtonGroupProps) => {
    return (
        <FormControl component="fieldset">
            <RadioGroup onChange={onChange} value={selectedValue}>
                {options.map(({ value, label }) => (
                    <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonGroup;
