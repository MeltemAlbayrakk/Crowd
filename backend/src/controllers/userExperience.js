import ExperienceModel from "../models/profile/Experience.js";
import UserModel from "../models/User.js";



const addExperience = async (req,res) =>{
    try {
        const { headline, company, description, date } = req.body;
        const userId = req.session.userId; 
        const experience = await ExperienceModel.create({
          headline,
          company,
          description,
          date,
          userId 
        });
    
        res.status(201).json({
          message: 'Experience information has been added successfully',
        });
    
        const user = await UserModel.findById(userId);
        user.experiences.push(experience._id);
        await user.save();
    
        

    } catch (error) {
        res.status(500).json({ message: 'server error ' });
    }
   
};

const deleteExperience = async (req, res) => {
    try {
     
  
      const deletedExperience = await ExperienceModel.findByIdAndDelete(req.params.id);
  
      const user = await UserModel.findById(req.session.userId)
      if(user){
        user.experiences = user.experiences.filter(ExpId => ExpId.toString() !== req.params.id);
  
        await user.save();
      }
  
      if (!deletedExperience) {
        console.log('No data to delete was found');
        return res.status(404).send('No data to delete was found');
      }
  
      // Eğer silme işlemi başarılıysa isteği tamamla
      return res.status(200).send('Experience deleted successfully');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Server error');
    }
  };

export{addExperience,deleteExperience}