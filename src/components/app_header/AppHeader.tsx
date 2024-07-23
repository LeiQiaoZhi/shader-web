import React from "react";
import "./AppHeader.css"
import ThemeSwitch from "./ThemeSwitch";
import IconButton from "../common/IconButton";
import {BsGithub} from "react-icons/bs";
import {GrPowerReset} from "react-icons/gr";
import {BiReset} from "react-icons/bi";
import {RxReset} from "react-icons/rx";
import {MdFormatColorReset} from "react-icons/md";
import {resetAllSavedData} from "../../utils/browserUtils";

const AppHeader: React.FC = () => {
    return (
        <div className="app-header">
            <div className="app-header-left"></div>
            <div className="app-header-center">
                <h1>Shader Web</h1>
            </div>
            <div className="app-header-right">
                <IconButton padding='0' size='normal' className="others"
                            onClick={_ => {
                                console.log("reset all saved data");
                                resetAllSavedData();
                                window.location.reload();
                            }}>
                    <BiReset/>
                </IconButton>
                <IconButton padding='0' size='normal' className="others">
                    <BsGithub/>
                </IconButton>

                <ThemeSwitch/>
            </div>
        </div>
    );
}

export default AppHeader;