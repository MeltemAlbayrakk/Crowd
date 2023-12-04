import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/",
});

instance.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");
  if (!auth) return config;
  const parsed = JSON.parse(auth);
  config.headers["x-access-token"] = parsed?.token;
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error.response.status && error.response) {
      
      localStorage.clear();
      window.location.href = "/";
    } else {
      return Promise.reject(error);
    }
  }
);

// eslint-disable-next-line
export default {
  user: {
    async login(email, password) {
      const response = await instance.post("/user/login", { email, password });
      return response.data;
    },
    async register(type, payload) {
      const url =
        type === "individual"
          ? "user/personal/register"
          : "user/company/register";
      const response = await instance.post(url, payload);
      return response.data;
    },
    async beFreelancer(payload) {
      const response = await instance.post(
        "/user/personal/beFreelancer",
        payload,{withCredentials:true}
      );
      return response.data;
    },
    async changePassword(payload) {
      const response = await instance.post("/user/changePassword", payload);
      return response.data;
    },
    profile: {
      async get(id) {
        const response = await instance.get(`/user/profile/${id}`,{withCredentials:true});
        return response.data;
      },
      async update(type, payload) {
        if (type === "personal") {
          const response = await instance.post(
            "/user/personal/update",
            payload,{withCredentials: true},
          );
          return response.data;
        } else if (type === "company") {
          const response = await instance.post(
            "/user/company/update",
            payload,{withCredentials: true},
          );
          return response.data;
        }
      },
      async updatePicture(payload) {
        const response = await instance({
          url: "/user/addProfilePicture",
          method: "post",
          data: payload,withCredentials: true,
          
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response;
      },
      project: {
        async add(type, payload) {
          if (type === "personal") {
            const response = await instance.post(
              "/user/personal/project",
              payload,{withCredentials: true},
            );
            return response.data;
          }
        },
        async delete(type, id) {
          if (type === "personal") {
            const response = await instance.get(
              "/user/personal/project/" + id,{withCredentials: true},
            );
            return response.data;
          }
        },
      },
      education: {
        async add(type, payload) {
          if (type === "personal") {
            const response = await instance.post(
              "/user/personal/education",
              payload,{withCredentials: true},
            );
            return response.data;
          }
        },
        async delete(type, id) {
          if (type === "personal") {
            const response = await instance.get(
              "/user/personal/education/" + id,{withCredentials: true}
            );
            return response.data;
          }
        },
      },
      achievement: {
        async add(type, payload) {
          if (type === "personal") {
            const response = await instance.post(
              "/user/personal/achievement",
              payload,{withCredentials: true}
            );
            return response.data;
          }
        },
        async delete(type, id) {
          if (type === "personal") {
            const response = await instance.get(
              "/user/personal/achievement/" + id,{withCredentials: true}
            );
            return response.data;
          }
        },
      },
      experience: {
        async add(type, payload) {
          if (type === "personal") {
            const response = await instance.post(
              "/user/personal/experience",
              payload,{withCredentials: true}
            );
            return response.data;
          }
        },
        async delete(type, id) {
          if (type === "personal") {
            const response = await instance.get(
              "/user/personal/experience/" + id,{withCredentials: true}
            );
            return response.data;
          }
        },
      },
    },




  },
    job: {
      async add(type, payload) {
        if (type === "company") {
          const response = await instance.post("/job/", payload,{withCredentials: true});
          return response.data;
        }
      },
      async get(type, payload) {
        if (type === "company") {
          const response = await instance.get("http://localhost:3001/job",{withCredentials: true});
          return response.data;
        }
      },
      async getall(type, payload) {
        if (type === "company") {
          const response = await instance.get("http://localhost:3001/job/jobs",payload,{withCredentials: true});
          return response.data;
        }
      },



      async search(title) {
    
        const response = await instance.post("/job/search", { title },{withCredentials: true});
        return response.data;
      },
      async delete(type, id) {
        if (type === "company") {
          const response = await instance.get(
            "/job/delete/"+ id,
            {withCredentials: true},
          );
          return response.data;
        }
      },
      async jobdetails(type, id) {
        if (type === "company") {
          const response = await instance.get(
            "/applicant/details/"+ id,
            {withCredentials: true},
          );
          return response.data;
        }
      }

      },



applicant:{
  async add(type, payload) {
    if (type === "personal") {
      const response = await instance.post(
        "/applicant/",
        payload,{withCredentials: true},
      );
      return response.data;
    }
  },
  async delete(type, id) {
    if (type === "company") {
      const response = await instance.post(
        "/applicant/delete/"+ id,
        {withCredentials: true},
      );
      return response.data;
    }
  },
  async setStatus(type, id, status) {
    if (type === "company") {
      try {
        const response = await instance.post(
          `/applicant/setstatus/${id}`,
          { status },
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        console.error("Error setting status:", error);
        throw error;
      }
    }
  }
  



}

};

