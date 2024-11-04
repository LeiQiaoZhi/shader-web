import React, {useId, useState} from 'react';
import IconButton from "../../common/IconButton";
import {MdCancel} from "react-icons/md";
import {BiReset} from "react-icons/bi";
import {resetAllSavedData} from "../../../utils/browser/browserLocalStorage";
import WarningText from "../../common/WarningText";

interface ResetConfirmModalProps {
}

interface ResetConfirmModalProps {
    setShow?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({setShow}: ResetConfirmModalProps) => {

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Are you sure you want to reset?</h2>
                    <IconButton onClick={e => {
                        setShow && setShow(false);
                    }}>
                        <MdCancel/>
                    </IconButton>
                </div>
                <div className="modal-body">
                    <WarningText warningText={"All saved data will be lost!"}/>
                    <IconButton onClick={e => {
                        console.log("reset all saved data");
                        resetAllSavedData();
                        window.location.reload();
                    }}>
                        <BiReset/> Reset
                    </IconButton>

                </div>
            </div>
        </div>
    );
};

export default ResetConfirmModal;