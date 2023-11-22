import nodemailer from "nodemailer";

const sendEmail = async(mailOptions) => {
    // const transporter = nodemailer.createTransport({
    //  service:"gmail",
    //  port:587,
    //  secure:false,
    //  logger:true,
    //  debug:true,
    //  secureConnection:false,
    //  auth:{
    //      user:process.env.EMAIL_USER,
    //      pass:process.env.EMAIL_PASSWORD
    //  },
    //  tls:{
    //      rejectUnauthorized:true
    //  },
    //  pool: true, 
    //  maxConnections: 5, 
    //  rateLimit: true, 
    //  maxMessages: 10, 
    // })

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'unreact07@gmail.com',
          pass: 'ypfe mgdc jjni llye',
        }
      });
    transporter.verify((error, success) => {
        if (error) {
          console.error("SMTP Bağlantısı Kurulamadı:", error);
        } else {
          console.log("SMTP Bağlantısı Başarılı");
        }
      });
    
      try {
        const info = await transporter.sendMail({
            from: 'unreact07@gmail.com',
            to: 'unreact07@gmail.com',
            subject: "Şifre Sıfırlama",
            text: `Şifre sıfırlama kodunuz: ${'1223'}`,
        });
        console.log("Mail gönderildi, bilgiler:", info);
      } catch (error) {
        console.log("Hata çıktı, mail gönderilemedi:", error);
      }
    };



export default sendEmail
