// Import necessary modules
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course")
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create a new sub-section for a given section
exports.createSubSection = async (req, res) => {
    try {
      // Extract necessary information from the request body
      const { sectionId, title, description,courseId } = req.body
      const video = req.files.video
  
      // Check if all necessary fields are provided
      if (!sectionId || !title || !description || !video) {
        return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
      }
      console.log("Video details",video)
  
      // Upload the video file to Cloudinary
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      console.log("Uplaoded video",uploadDetails)
      // Create a new sub-section with the necessary information
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
      })
  
      // Update the corresponding section with the newly created sub-section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
      ).populate("subSection")

      const updatedCourse = await Course.findById(courseId).populate({
        path:"courseContent",
        populate: {
          path: "subSection",
        },
      }).exec();
  
      // Return the updated section in the response
      // return res.status(200).json({ success: true, data: updatedSection })
      return res.status(200).json({ success: true, data: updatedCourse })
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error("Error creating new sub-section:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
  
  exports.updateSubSection = async (req, res) => {
    try {
      const { subSectionId, title, description,courseId } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        if(subSection?.videoUrl != req.files.video)
        {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
        }
      }
  
      await subSection.save()

      const updatedCourse = await Course.findById(courseId).populate({
        path:"courseContent",
        populate: {
           path:"subSection"
        }
      })
  
      return res.status(200).json({
        data:updatedCourse,
        success: true,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  
  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }
 exports.getSubSectionDetail = async(req,res) =>
 {
    try{
         const {subSectionId} = req.body;
         console.log("request data", req.body);
         console.log("backend ", subSectionId);
         const response = await SubSection.findById(subSectionId);
         if(!response)
         {
          return res.status(400).json({
             success:false,
             message:"please send subSectionId",
          })
         }
       
        return res.status(200).json({
           success:true,
           message:"successfully get subSection details",
           data:response,
        })

    } catch(error)
    {
     return res.status(500).json({
         success:false,
         message:"Error in find sub section details",
         error:error,
      })
    }
 }