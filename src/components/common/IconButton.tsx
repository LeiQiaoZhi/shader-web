import React from 'react';
import "./IconButton.css"

interface IconButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    size?: "small" | "normal" | "large";
    padding?: '0' | "small" | "normal" | "large";
    color?: string;
    background?: string;
    className?: string;
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
    }
) => {
    const style: any = {};
    if (size) {
        style.fontSize = `var(--${size}-font-size)`;
    }
    if (padding) {
        style.padding = (padding === '0') ? 0 : `var(--${padding}-gap)`;
    }
    if (color){
        style.color = color;
    }
    if (background){
        style.background = background;
    }
    return (
        <button onClick={onClick} className={`icon-button ${className}`} style={style}>
            {children}
        </button>
    );
};

export default IconButton;