import AchievementModel from "../models/profile/Achievement.js";
import UserModel from "../models/User.js";


const addAchievement = async (req,res) =>{
    try {
       
      const {headline,description} = req.body;
      const userId = req.session.userId; 


      const achievement = await AchievementModel.create({
        headline,
        description,
        userId 
      })  
      const user = await UserModel.findById(userId);
      user.achievements.push(achievement._id);
      await user.save();

      res.status(201).json({
        message: 'Achievement information has been added successfully',
      });
  
   

     

    } catch (error) {
        res.status(500).json({ message: 'server error ' });
    }
   
};

const deleteAchievement = async (req, res) => {
    try {
      
      const deletedAchievement = await AchievementModel.findByIdAndDelete(req.params.id);
  
      const user = await UserModel.findById(req.session.userId)
      if(user){
        user.achievements = user.achievements.filter(AchId => AchId.toString() !== req.params.id);
  
        await user.save();
      }
  
      if (!deletedAchievement) {
        console.log('No data to delete was found');
        return res.status(404).send('No data to delete was found');
      }
  
   
      return res.status(200).send('Achievement deleted successfully');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Server error');
    }
  };

export {addAchievement,deleteAchievement}