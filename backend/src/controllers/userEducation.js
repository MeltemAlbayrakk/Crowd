
import EducationModel from "../models/profile/Education";

//denenecek

const addEducation = async (req, res) => {
    try {
     
      const { school, section, date } = req.body;
  
      
      const education = (await EducationModel.create({ school, section, date })).save();
  
      res.status(201).json({
        data: {
         
          school: education.school,
          section: education.section,
          date: education.date,
          
        },
        message: 'Education information has been added successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'server error ' });
    }
  };
  
  module.exports = {
    addEducation,
  };