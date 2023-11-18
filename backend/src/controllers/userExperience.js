import ExperienceModel from "../models/profile/Experience";

//denenecek

const addExperience = async (req,res) =>{
    try {
       
        const { firstName, lastName, birthday, gender, languages, skills,description,address} = req.body;

        const experience = (await ExperienceModel.create({firstName,lastName,gender,birthday,languages,skills,description,address})).save();

        res.status(201).json({
            data:{
                firstName:experience.firstName,
                lastName:experience.lastName,
                birthday:experience.birthday,
                gender:experience.gender,
                languages:experience.languages,
                skills:experience.skills,
                description:experience.description,
                address:experience.address,
            },
            message:'Experience information has been added successfully'
        })

    } catch (error) {
        res.status(500).json({ message: 'server error ' });
    }
   
};

module.exports = {
    addExperience
}