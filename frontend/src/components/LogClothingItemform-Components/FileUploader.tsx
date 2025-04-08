import axios from "axios";
import { ChangeEvent, useState } from "react"

type UploadStatus = "idle" | "uploading" | "success"| "error";

export default function FileUploader() {
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<UploadStatus>("idle")
    const [uploadProgress, setUploadProgress] = useState(0);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        //check if file is there
        if(e.target.files){
            setFile(e.target.files[0]);
        }
    }

    async function handleFileUpload() {
        if (!file) return;

        setStatus("uploading");
        setUploadProgress(0);

        //using FormData class to send the data
        const formData = new FormData();
        formData.append('file', file);

        try {
            //NOTE this api does not exist yet: /api/upload-image
            await axios.post("https://httpbin.org/post", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }, 
                onUploadProgress: (progressEvent) => {
                    const progress = progressEvent.total 
                    ? Math.round((progressEvent.loaded * 100) / progressEvent.total) 
                    : 0;
                    setUploadProgress(progress);
                }
            })

            setStatus("success");
            setUploadProgress(100);
        } catch {
            setStatus('error');
            setUploadProgress(0);
        }
    }
    
    return (
    <div className="space-y-2">
        <input type="file" accept="image/*" onChange={handleFileChange}/>
        {file && (
            <div>
                <p>File name: {file.name}</p>
                <p>Type: {file.type}</p>
            </div>
        )}

        {status === 'uploading' && (
            <div className="space-y-2">
                <div className="h-2.5 w-full rounded-full bg-gray-200">
                    <div
                        className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-600">{uploadProgress}% uploaded</p>
            </div>
        )}

        {file && status !== "uploading" &&
            //pressing this button would upload the file and trigger bg removal and img analysis
            <button onClick={handleFileUpload}>Upload</button>
        }

        {status == 'success' && (
            <p>
                File uploaded successfully
            </p>
        )}

        {status == 'error' && (
            <p>
                Upload failed; Please try again
            </p>
        )}
    </div>
    )
}