import React, {useState} from "react";
import "./FileSelect.css"
import {FaFileUpload} from "react-icons/fa";

interface FileSelectProps {
    onFileSelect: (file: File) => void;
    id: string;
    accept?: string;
    title?: string;
}

const FileSelect: React.FC<FileSelectProps> = (
    {
        onFileSelect,
        id,
        accept = "*",
        title = "Choose File",
    }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFileName(file.name);
            onFileSelect(file);
            event.target.value = ''
        } else {
            setFileName(fileName); // don't change
        }
    };

    return (
        <div className="file-select-container">
            <input
                type="file"
                id={"fileInput" + id}
                style={{display: 'none'}}
                accept={accept}
                onChange={handleFileChange}
            />
            <label htmlFor={"fileInput" + id} className="custom-file-input">
                <FaFileUpload/>
                {title}
            </label>
            <span className="file-name">{fileName}</span>
        </div>
    )
}

export default FileSelect;
