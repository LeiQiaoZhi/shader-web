import React, {useId} from 'react';
import "./IconButton.css"
import {Tooltip} from "react-tooltip";

interface IconButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    size?: "small" | "normal" | "large";
    padding?: '0' | "small" | "normal" | "large";
    color?: string;
    background?: string;
    className?: string;
    tooltip?: string;
}

const IconButton: React.FC<IconButtonProps> = (
    {
        children,
        onClick,
        size = "normal",
        padding = "normal",
        color,
        background,
        className,
        tooltip
    }
) => {
    const id = useId();
    const style: any = {};
    if (size) {
        style.fontSize = `var(--${size}-font-size)`;
    }
    if (padding) {
        style.padding = (padding === '0') ? 0 : `var(--${padding}-gap)`;
    }
    if (color) {
        style.color = color;
    }
    if (background) {
        style.background = background;
    }
    return (
        <button onClick={onClick} className={`icon-button ${className}`} style={style}
                data-tooltip-id={id} data-tooltip-content={tooltip}
        >
            {children}
            <Tooltip id={id}
             style={{fontSize: 'small'}} />
        </button>
    );
};

export default IconButton;