import UserModel from '../models/User.js'
import bcrypt from 'bcrypt';
import { userRoles } from '../constants/constants.js';



const registerCompanyUser=async (req,res)=>{

    try {
        const {registerData} = req.body;
       const salt=await bcrypt.genSalt(10)

       const hashedPassword=await bcrypt.hash(registerData.password,salt)
       console.log("registercompanycalıstı");

         if(registerData.password==registerData.passwordConfirmation){
           const user =await new UserModel({
            firstName:registerData.firstName,
            lastName:registerData.lastName,
            email:registerData.email,
            password: hashedPassword,
            phone:registerData.phone,
            companyName: registerData.companyName,
            role:userRoles.COMPANY
           });
            
        
            await user.save();
          res.status(201).json({ message: 'User registered successfully' });

        }
       } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   

}


const registerPersonelUser=async (req,res)=>{

    try {
        const{registerData} = req.body;
        
       const salt=await bcrypt.genSalt(10)
  
       const hashedPassword=await bcrypt.hash(registerData.password,salt,(err, hash) => { console.log(err.message) })
       
  
       if(registerData.password==registerData.passwordconfirm){
        const user = await new UserModel({
            firstName:registerData.firstName,
            lastName:registerData.lastName,
            email:registerData.email,
            password: hashedPassword,
            phone:registerData.phone,    
            role:userRoles.PERSONAL

        });


        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
       }
         
  
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   

}

const login=async (req,res)=>{

    const {email,password}=req.body
    console.log(email);

    const user =await UserModel.findOne({email:email})
    
    if(user){
      const passwordMatch = await bcrypt.compare(password, user.password);
    
      if(passwordMatch){
        /*jwt.sign({id:user.id},process.env.SECRET_TOKEN,{expiresIn:'1h'})*/
        res.status(201).json({ message: 'User login successfully' });
        

          
      
      }else {
        return res.status(401).json({
          succeded: false,
          error: 'Passwords are not matched',
        });
      }
    
    } else {
      return res.status(401).json({
        succeded: false,
        error: 'There is no such user',
      });
    }}


   const logout = async (req,res)=> {
    req.session.destroy((err)=>{
      if(err){
        console.error("oturum sonlandırma hatası");
      }else{
        res.redirect('/homepage');
      }
    })
    res.redirect("/homepage");
   }


   const createPersonelProfile= async (req,res)=>{

    const userId = req.cookies.userId;


try {const {skills,profileDescription,birthDay,address,gender,languages,userTitle}=req.body

     await UserModel.findByIdAndUpdate(userId,{
      skills:skills,
      profileDescription:profileDescription,
      birthDay:birthDay,
      address:address,
      gender:gender,
      languages:languages,
      userTitle:userTitle

    })
  
} catch (error) {
  res.json(err)
}

    
    
   }



    export {registerCompanyUser,registerPersonelUser,login,logout,createPersonelProfile}