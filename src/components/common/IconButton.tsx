import React, {useId} from 'react';
import "./IconButton.css"
import {Tooltip} from "react-tooltip";

interface IconButtonProps {
    children: React.ReactNode,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    size?: "small" | "normal" | "large",
    padding?: '0' | "small" | "normal" | "large",
    color?: string,
    bg?: string,
    className?: string,
    tooltip?: string,
    border?: string
}

const IconButton: React.FC<IconButtonProps> = (
    {
        children,
        onClick,
        size = "normal",
        padding = "normal",
        color,
        bg,
        className,
        tooltip,
        border
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
    if (bg) {
        style.background = bg;
    }
    if (border) {
        style.border = border;
    }
    return (
        <button onClick={onClick} className={`icon-button ${className}`} style={style}
                data-tooltip-id={id} data-tooltip-content={tooltip}
        >
            {children}
            <Tooltip id={id}
                     style={{fontSize: 'small'}}/>
        </button>
    );
};

export default IconButton;