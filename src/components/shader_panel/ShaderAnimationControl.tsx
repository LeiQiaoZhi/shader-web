import React, {useState} from "react";
import "./ShaderAnimationControl.css"
import {FaPlayCircle} from "react-icons/fa";
import {FaPause} from "react-icons/fa6";
import {IoPlayBack} from "react-icons/io5";
import IconButton from "../common/IconButton";
import {saveDataWithKey} from "../../utils/browser/browserLocalStorage";

interface ShaderAnimationControlProps {
    pausedState: boolean,
    pausedRef: React.MutableRefObject<boolean>,
    speedRef: React.MutableRefObject<number>,
    elapsedTimeRef: React.MutableRefObject<number>
    setPausedState: React.Dispatch<React.SetStateAction<boolean>>
}

const ShaderAnimationControl: React.FC<ShaderAnimationControlProps> = (
    {
        pausedState,
        pausedRef,
        speedRef,
        elapsedTimeRef,
        setPausedState
    }) => {

    const [speed, setSpeed] = useState(speedRef.current);

    const handlePauseToggle = () => {
        pausedRef.current = !pausedRef.current;
        setPausedState(pausedRef.current);
        saveDataWithKey("isPaused", pausedRef.current);
    }

    const handleRestart = () => {
        elapsedTimeRef.current = 0;
    }

    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        speedRef.current = Math.pow(event.target.valueAsNumber, 2);
        setSpeed(speedRef.current);
        saveDataWithKey("speed", speedRef.current);
    }

    return (
        <div className={"shader-row-control-container" + (pausedState ? " muted" : "")}>
            <IconButton onClick={handlePauseToggle} tooltip={pausedState ? "Resume" : "Pause"}>
                {pausedState
                    ? (<FaPlayCircle title="Resume"/>)
                    : (<FaPause/>)
                }
            </IconButton>
            <div className="shader-animation-speed-control">
                <label>Speed: {speed.toFixed(2)}</label>
                <input type="range" onChange={handleSpeedChange} min={0} max={2} step={0.01} defaultValue={speed}/>
            </div>
            <IconButton onClick={handleRestart} tooltip="Restart">
                <IoPlayBack/>
            </IconButton>
        </div>
    );
}

export default ShaderAnimationControl;