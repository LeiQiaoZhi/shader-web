import React from "react";

interface SelectProps {
    value: string | number,
    values: string[],
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    optionNames?: string[]
}

const Select: React.FC<SelectProps> = (
    {value, values, onChange, optionNames}
) => {
    return (
        <select value={value} onChange={onChange}>
            {
                values.length > 0 &&
                values.map(
                    (v, i) => (
                        <option value={v}>
                            {optionNames ? optionNames[i] : v}
                        </option>
                    )
                )
            }
        </select>
    );
};

export default Select;