class Response {
    constructor(data=null, message=null) {
      this.data = data;
      this.message = message;
     
    }
  
    success(res) {
      return res.status(200).json({
        success: true,
        data: this.data,
        message: this.message ?? "işlem başarılı"
        
      });
    }

    created(res) {
        return res.status(200).json({
          success: true,
          data: this.data,
          message: this.message ?? "işlem başarılı"
          
        });
      }
  
    error500(res, statusCode = 500) {
      return res.status(statusCode).json({
        success: false,
        data: this.data,
        message: this.message ?? "işlem başarısız"
      });
    }
    error400(res, statusCode = 400) {
        return res.status(statusCode).json({
          success: false,
          data: this.data,
          message: this.message ?? "işlem başarısız"
        });
      }
      error401(res, statusCode = 401) {
        return res.status(statusCode).json({
          success: false,
          data: this.data,
          message: this.message ?? "Lütfen oturum açın"
        });
      }

      error404(res, statusCode = 404) {
        return res.status(statusCode).json({
          success: false,
          data: this.data,
          message: this.message ?? "işlem başarısız"
        });
      }
      error429(res, statusCode = 429) {
        return res.status(statusCode).json({
          success: false,
          data: this.data,
          message: this.message ?? "Çok fazla istek atıldı"
        });
      }

  }
  
  export default Response;
  