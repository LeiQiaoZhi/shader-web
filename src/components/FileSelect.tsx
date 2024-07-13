import React, {useState} from "react";
import "./FileSelect.css"

const FileSelect: React.FC = () => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFileName(file.name);
        } else {
            setFileName(fileName); // don't change
        }
    };
    
    return (
        <div>
            <input
                type="file"
                id="fileInput"
                style={{display: 'none'}}
                onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="custom-file-input">
                Choose File
            </label>
            <span className="file-name">{fileName}</span>
        </div>
    )
}

export default FileSelect;
