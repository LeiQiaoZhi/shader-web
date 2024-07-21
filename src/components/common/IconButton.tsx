import React from 'react';
import "./IconButton.css"

interface IconButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    size?: "small" | "normal" | "large";
    padding?: "small" | "normal" | "large";
}

const IconButton: React.FC<IconButtonProps> = (
    {
        children,
        onClick,
        size = "normal",
        padding = "normal",
    }
) => {
    const style: any = {};
    if (size) {
        style.fontSize = `var(--${size}-font-size)`;
    }
    if (padding) {
        style.padding = `var(--${padding}-gap)`;
    }
    return (
        <button onClick={onClick} className="icon-button" style={style}>
            {children}
        </button>
    );
};

export default IconButton;