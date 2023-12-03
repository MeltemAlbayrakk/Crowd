import UserModel from '../models/User.js';
import ProjectModel from '../models/profile/Project.js';


const addProject = async (req,res)=>{

    try {
        const {headline ,description, date} =req.body;
        const userId = req.session.userId;


        const project = await ProjectModel.create({
            headline,
            description,
            date,
            userId
        })

        res.status(201).json({
           message:'Project information has been added succesfully'
        });

        const user = await UserModel.findById(userId);
        user.projects.push(project._id);
        await user.save();

    } catch (error) {
        res.status(500).json({ message: 'server error ' });
    }
}

const deleteProject = async (req,res)=>{
    try {
        const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);

        const user = await UserModel.findById(req.session.userId)
        if(user){
            user.projects= user.projects.filter(proId =>proId.toString() !== req.params.id);
            await user.save();
        }
        if(!deletedProject){
            console.log('no data to delete was found');
            return res.status(404).send('No data to delete was found');
        }

        return res.status(200).send('Project deleted successfully');

    } catch (error) {
        return res.status(500).send('server error')
    }
}


export {addProject,deleteProject}