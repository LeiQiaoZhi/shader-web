import React, {useState} from "react";
import "../styles/FileSelect.css"

interface FileSelectProps {
    onFileSelect: (file: File) => void;
    id: string;
    accept?: string;
}

const FileSelect: React.FC<FileSelectProps> = ({onFileSelect, id, accept="*"}) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFileName(file.name);
            onFileSelect(file);
        } else {
            setFileName(fileName); // don't change
        }
    };

    return (
        <div>
            <input
                type="file"
                id={"fileInput"+id}
                style={{display: 'none'}}
                accept={accept}
                onChange={handleFileChange}
            />
            <label htmlFor={"fileInput"+id} className="custom-file-input">
                Choose File
            </label>
            <span className="file-name">{fileName}</span>
        </div>
    )
}

export default FileSelect;
