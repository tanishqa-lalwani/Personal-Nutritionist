import React,{useRef} from 'react';
import { FileDrop } from 'react-file-drop';
import './DropFile.css'

function DropFile(props) {
    const fileInputRef = useRef(null);
    const onFileInputChange = (event) => {
        const { files } = event.target;
        console.log(files);
        // do something with your files...
      }
      
      

    return (
        <div style = {{ marginTop : '20%'}}>
            <input
            onChange={onFileInputChange}
            ref={fileInputRef}
            type="file"
            className="hidden"
            />

        <FileDrop
         onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
         onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
         onFrameDrop={(event) => console.log('onFrameDrop', event)}
         onDragOver={(event) => console.log('onDragOver', event)}
         onDragLeave={(event) => console.log('onDragLeave', event)}
         onDrop={(files, event) => console.log('onDrop!', files, event)}
         >
        Drop some files here!

        </FileDrop>
            
        </div>
    );
}

export default DropFile;