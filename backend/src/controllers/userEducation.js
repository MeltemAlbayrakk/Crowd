import UserModel from "../models/User";
import EducationModel from "../models/profile/Education";

//denenecek

const addEducation = async (req, res) => {
    try {
      const userId = req.UserModel.id;
      const { school, section, date } = req.body;
  
      
      const education = await EducationModel.create({ school, section, date, userId }).save();
  
      res.status(201).json({
        data: {
          id: education.id,
          school: education.school,
          section: education.section,
          date: education.date,
          
        },
        message: 'Eğitim bilgisi başarıyla eklendi',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'İç sunucu hatası' });
    }
  };
  
  module.exports = {
    addEducation,
  };