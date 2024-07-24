import React, {useEffect, useState} from "react";
import {useShaderContext} from "../../utils/contexts/ShaderContext";
import "./ShaderStatusBar.css"

interface ShaderStatusBarProps {
    width: number
}

const ShaderStatusBar: React.FC<ShaderStatusBarProps> = ({width}) => {
    const {status} = useShaderContext();
    const [inSuccessAnimation, setInSuccessAnimation] = useState(false);

    useEffect(() => {
        console.log(status);
        setInSuccessAnimation(true);
        const timer = setTimeout(() => setInSuccessAnimation(false), 1200);
        return () => clearTimeout(timer);
    }, [status]);

    const statusSymbol = () => {
        const successSymbol: string = "\u2713";
        const failSymbol: string = "\u2717";
        return (status?.success) ? successSymbol : failSymbol;
    }

    const getStyle = () => {
        return {
            'background-color': status?.success
                ? inSuccessAnimation ? `var(--primary-color)` : `var(--background-color)`
                : `var(--contrast-color)`,
            'color': status?.success
                ? inSuccessAnimation ? `var(--secondary-color)` : `var(--secondary-text-color)`
                : `var(--background-color)`,
            '--status-width': `${width}px`,
            'transition': `all 400ms`
        }
    }

    return (
        <div className="shader-status-bar"
            // data-success={status?.success}
             style={getStyle() as React.CSSProperties}
        >
            <label>{statusSymbol() + " " + status?.message}</label>
        </div>
    );
}

export default ShaderStatusBar;