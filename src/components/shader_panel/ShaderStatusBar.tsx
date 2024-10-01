import React, {useEffect, useState} from "react";
import {useShaderContext} from "../../utils/contexts/ShaderContext";
import "./ShaderStatusBar.css"
import {Expander} from "../common/Expander";
import {ShaderStatusError} from "./ShaderStatusError";

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

    const getStyle = () => {
        return {
            'backgroundColor': isSuccess()
                ? inSuccessAnimation ? `var(--primary-color)` : `var(--background-color)`
                : `var(--contrast-color)`,
            'color': (isSuccess()
                ? inSuccessAnimation ? `var(--secondary-color)` : `var(--secondary-text-color)`
                : `var(--background-color)`) + ' !important',
            'width': `${width}px`,
            'transition': `all 400ms`
        } as React.CSSProperties;
    }

    return (
        <div className="shader-status-bar" style={getStyle()}>
            {statuses && (
                isSuccess()
                    ? <label> Compile Success </label>
                    : Object.keys(statuses).filter(key => statuses[key]?.success === false)
                        .map(key => (
                            <Expander
                                title={`(${statusSymbol()}) Errors in ${key}`}
                                headerClassName="shader-status-file-errors-header"
                                defaultExpanded={true}
                            >
                                <div style={{
                                    paddingLeft: 'var(--normal-gap)',
                                    paddingTop: 'var(--small-gap)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--small-gap)'
                                }}>
                                    {statuses[key]?.messages?.map((msgObj) => (
                                        <ShaderStatusError messageObj={msgObj}/>
                                    ))}
                                </div>
                            </Expander>
                        )))
            }
        </div>
    );
}

export default ShaderStatusBar;