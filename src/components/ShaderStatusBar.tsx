import React, {useEffect} from "react";
import {useShaderContext} from "../utils/ShaderContext";
import "../styles/ShaderStatusBar.css"

interface ShaderStatusBarProps {
    width: number
}

const ShaderStatusBar: React.FC<ShaderStatusBarProps> = ({width}) => {
    const {status} = useShaderContext();

    useEffect(() => {
        console.log(status);
    }, [status]);

    const statusSymbol = () => {
        const successSymbol: string = "\u2713";
        const failSymbol: string = "\u2717";
        return (status?.success) ? successSymbol : failSymbol;
    }

    return (
        <div className="shader-status-bar" data-success={status?.success}
             style={{'--status-width': `${width}px`} as React.CSSProperties}
        >
            <label>{statusSymbol() + " " + status?.message}</label>
        </div>
    );
}

export default ShaderStatusBar;