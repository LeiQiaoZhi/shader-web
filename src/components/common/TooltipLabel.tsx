import React from "react";
import "./TooltipLabel.css"

interface TooltipLabelProps {
    label: string;
    tooltip: string;
}

const TooltipLabel : React.FC<TooltipLabelProps> = ({label, tooltip}) => {
    return (
      <label data-tooltip={tooltip} className="tooltip-container"> {label} </label>
    );
}

export default TooltipLabel;