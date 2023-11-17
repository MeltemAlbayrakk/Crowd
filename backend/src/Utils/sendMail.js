import nodemailer from "nodemailer";

const sendMail = async(mailOptions) => {
	debugger
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port:587,
		secure:true,
		auth:{
			user:process.env.EMAIL_USER,
			pass:process.env.EMAIL_PASSWORD
		}
	})
transporter.sendMail(mailOptions,(error,info) => { 
	if (error) {
		console.log("hata çıktı mail gönderilemedi:",error);

	}
	console.log('info',info);
	return true

})

}
export default sendMail;