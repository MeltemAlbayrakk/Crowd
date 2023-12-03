
import EducationModel from "../models/profile/Education.js";
import UserModel from "../models/User.js";



const addEducation = async (req, res) => {
  try {
    const { school, section, date } = req.body;
    const userId = req.session.userId; 
    const education = await EducationModel.create({
      school,
      section,
      date,
      userId 
    });

    res.status(201).json({
      message: 'Education information has been added successfully',
    });

    const user = await UserModel.findById(userId);
    user.educations.push(education._id);
    await user.save();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteEducation = async (req, res) => {
  try {
   

    const deletedEducation = await EducationModel.findByIdAndDelete(req.params.id);

    const user = await UserModel.findById(req.session.userId)
    if(user){
      user.educations = user.educations.filter(eduId => eduId.toString() !== req.params.id);

      await user.save();
    }

    if (!deletedEducation) {
      console.log('No data to delete was found');
      return res.status(404).send('No data to delete was found');
    }

    // Eğer silme işlemi başarılıysa isteği tamamla
    return res.status(200).send('Education deleted successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};


export { addEducation,deleteEducation};