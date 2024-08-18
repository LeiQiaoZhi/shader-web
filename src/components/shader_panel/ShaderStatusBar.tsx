import React, {useEffect, useState} from "react";
import {useShaderContext} from "../../utils/contexts/ShaderContext";
import "./ShaderStatusBar.css"

interface ShaderStatusBarProps {
    width: number
}

const ShaderStatusBar: React.FC<ShaderStatusBarProps> = ({width}) => {
    const {statuses} = useShaderContext();
    const [inSuccessAnimation, setInSuccessAnimation] = useState(false);

    useEffect(() => {
        console.log("Shader Status:", statuses);
        setInSuccessAnimation(true);
        const timer = setTimeout(() => setInSuccessAnimation(false), 1200);
        return () => clearTimeout(timer);
    }, [statuses]);

    const statusSymbol = () => {
        const successSymbol: string = "\u2713";
        const failSymbol: string = "\u2717";
        return isSuccess() ? successSymbol : failSymbol;
    }

    const isSuccess = () => {
        if (statuses === null) return false;
        return Object.keys(statuses).every(key => statuses[key]?.success === true);
    }

    const getMessage = () => {
        if (statuses === null) return "Null Status";
        return isSuccess()
            ?  `${statusSymbol()} Compile Success`
            : Object.keys(statuses).filter(key => statuses[key]?.success === false)
                .map(key => `${statusSymbol()} (${key}): ${statuses[key]?.message}`)
                .join("\n");
    }

    const getStyle = () => {
        return {
            'backgroundColor': isSuccess()
                ? inSuccessAnimation ? `var(--primary-color)` : `var(--background-color)`
                : `var(--contrast-color)`,
            'color': isSuccess()
                ? inSuccessAnimation ? `var(--secondary-color)` : `var(--secondary-text-color)`
                : `var(--background-color)`,
            '--status-width': `${width}px`,
            'transition': `all 400ms`
        }
    }

    return (
        <div className="shader-status-bar"
             style={getStyle() as React.CSSProperties}
        >
            <label style={{whiteSpace: 'pre-line'}}>
                { getMessage()}
            </label>
        </div>
    );
}

export default ShaderStatusBar;