import AchievementModel from "../models/profile/Experience.js";

const addAchievement = async (req,res) =>{
    try {
       
        const {name,description} = req.body;

        const achievement =( await AchievementModel.create({name,description})).save();

        res.status(201).json({
            data:{
                name:achievement.name,
                description:achievement.name,
               
            },
            message:' Achievement information has been added successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'server error ' });
    }
   
};

export {addAchievement}