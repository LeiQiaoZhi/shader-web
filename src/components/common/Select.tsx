import React from "react";

interface SelectProps {
    value: string | number,
    values: string[],
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    optionNames?: string[],
    groups?: { [key: string]: number }
}

const Select: React.FC<SelectProps> = (
    {value, values, onChange, optionNames, groups}
) => {
    const groupLength = groups ? Object.keys(groups).length : 0;
    const groupValues = groups ? Object.keys(groups).map(
        (group, i) => {
            const start = groups[group];
            const end = groups[Object.keys(groups)[i + 1]];
            return {
                group: group,
                start: start,
                end: end ? end : values.length
            };
        }
    ) : [{
        group: "",
        start: 0,
        end: values.length
    }];
    return (
        <select value={value} onChange={onChange}>
            // before the group values
            {
                groupLength > 0 &&
                values.slice(0, groupValues[0].start).map(
                    (v, i) => (
                        <option value={v} key={v}>
                            {optionNames ? optionNames[i] : v}
                        </option>
                    )
                )
            }
            // group values
            {
                groupValues.map(
                    (group, i) => (
                        <optgroup label={group.group} key={group.group}>
                            {
                                values.slice(group.start, group.end).map(
                                    (v, j) => (
                                        <option value={v} key={v}>
                                            {optionNames ? optionNames[group.start + j] : v}
                                        </option>
                                    )
                                )
                            }
                        </optgroup>
                    )
                )
            }
        </select>
    );
};

export default Select;