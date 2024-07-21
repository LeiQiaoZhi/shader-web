import React, {useEffect, useState} from "react";
import "./ShaderAnimationControl.css"
import {FaPlay, FaPlayCircle} from "react-icons/fa";
import {FaPause} from "react-icons/fa6";
import {LuListRestart} from "react-icons/lu";
import {MdRestartAlt} from "react-icons/md";
import {IoPlayBack} from "react-icons/io5";
import IconButton from "../common/IconButton";

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

    const handlePauseToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        pausedRef.current = !pausedRef.current;
        setPausedState(pausedRef.current);
    }

    const handleRestart = (event: React.MouseEvent<HTMLButtonElement>) => {
        elapsedTimeRef.current = 0;
    }

    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        speedRef.current = Math.pow(event.target.valueAsNumber, 2);
        setSpeed(speedRef.current);
    }

    return (
        <div className={"shader-row-control-container" + (pausedState ? " muted" : "")}>
            <IconButton onClick={handlePauseToggle}>
                {pausedState
                    ? (<FaPlayCircle title="Resume"/>)
                    : (<FaPause/>)
                }
            </IconButton>
            <div className="shader-animation-speed-control">
                <label>Speed: {speed.toFixed(2)}</label>
                <input type="range" onChange={handleSpeedChange} min={0} max={2} step={0.01} defaultValue={1}/>
            </div>
            <IconButton onClick={handleRestart}>
                <IoPlayBack/>
            </IconButton>
        </div>
    );
}

export default ShaderAnimationControl;