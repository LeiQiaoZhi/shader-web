import React, {useId} from "react";
import "./TooltipLabel.css"
import {Tooltip} from "react-tooltip";

interface TooltipLabelProps {
    label: string;
    tooltip: string;
}

const TooltipLabel : React.FC<TooltipLabelProps> = ({label, tooltip}) => {
    const id = useId();
    return (
      <label data-tooltip-id={id} data-tooltip-content={tooltip} className="tooltip-container"> 
          {label} 
          <Tooltip id={id}/>
      </label>
    );
}

export default TooltipLabel;