import ProjectModel from '../models/profile/Project';


const addProject = async (req,res)=>{

    try {
        const {project ,description, date} =req.body;

        const projectinfo = (await ProjectModel.create({project,description,date})).save();

        res.status(201).json({
            data: {
                project:projectinfo.project,
                description: projectinfo.description,
                date:projectinfo.date,
            },
            message:'Project information has been added succesfully'
        });

    } catch (error) {
        res.status(500).json({ message: 'server error ' });
    }
}