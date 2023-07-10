import React from 'react'
import { useDropzone } from 'react-dropzone';
import { LuUploadCloud } from "react-icons/lu";

const DropZone = ({label, previewSource, video,setPreviewSource,setThumbnail}) => {
    const { isDragActive, getRootProps, getInputProps } = useDropzone({
        accept: !video
            ? { "image/*": [".jpeg", ".jpg", ".png"] }
            : { "video/*": [".mp4"] },
        onDrop,
    });

    function onDrop(acceptedFiles) {
        const file = acceptedFiles[0];
        console.log("file", file);
        if (file) {
            setThumbnail(file);
            showProfile(file);
        }
    }
    const showProfile = (file) => {
        const reader = new FileReader();
        // console.log("reader", reader);
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
            // console.log("file reader",reader.result)
        }
    }


  return (
    <div>
                <label htmlFor="thumbnail" className=' font-medium text-sm' >{label}<sup className="text-[#f00]">*</sup></label>
                <div {...getRootProps()} className=' border border-richblack-600 border-dashed py-4 
                px-2 rounded-md text-xs bg-richblack-700' >
                    <input id="thumbnail" {...getInputProps()} className='aspect-video' />
                    {/* icon */}

                    {!previewSource ? <div className='flex gap-3 flex-col items-center'>
                        <div className='p-2 rounded-full bg-richblack-800'><LuUploadCloud className='text-yellow-100 text-2xl' /></div>
                        {/* info */}
                        <div className='text-center leading-5 text-richblack-200'>
                            {isDragActive ? <p>Drop here</p> : <p> Drag and drop an image, or <span className='text-yellow-300 cursor-pointer hover:underline '>Browse</span>
                                <br />Max 6MB each (12MB for videos)</p>}

                        </div>
                        {/* acceptables */}
                        <ul className='flex flex-wrap justify-evenly w-full list-disc text-richblack-200'>
                            <li>Aspect ration 16:9</li>
                            <li>Recommened size 1024*576</li>
                        </ul>
                    </div> :
                        (<div >
                           { video ? (<video className='object-cover' 
                          src={previewSource} ></video>):
                          <img src={previewSource} alt="choose image" className='object-cover' />}
                        </div>)
                    }
                </div>
            </div>
  )
}

export default DropZone