import nodemailer from "nodemailer";

const sendEmail = async(mailOptions) => {
	const transporter = nodemailer.createTransport({
		service:"gmail",
		port:587,
		secure:false,
		logger:true,
		debug:true,
		secureConnection:false,
		auth:{
			user:process.env.EMAIL_USER,
			pass:process.env.EMAIL_PASSWORD
		},
		tls:{
			rejectUnauthorized:true
		},
		pool: true, 
		maxConnections: 5, 
		rateLimit: true, 
		maxMessages: 10, 
	})
	transporter.verify((error, success) => {
		if (error) {
		  console.error("SMTP Bağlantısı Kurulamadı:", error);
		} else {
		  console.log("SMTP Bağlantısı Başarılı");
		}
	  });
	
	  try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Mail gönderildi, bilgiler:", info);
		return true;
	  } catch (error) {
		console.log("Hata çıktı, mail gönderilemedi:", error);
		return false;
	  }
	};



export default sendEmail