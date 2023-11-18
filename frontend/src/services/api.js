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
        payload
      );
      return response.data;
    },
    async changePassword(payload) {
      const response = await instance.post("/user/changePassword", payload);
      return response.data;
    },
    profile: {
      async get() {
        const response = await instance.get("/user/profile");
        return response.data;
      },
      async update(type, payload) {
        if (type === "personal") {
          const response = await instance.patch(
            "/user/personal/update",
            payload
          );
          return response.data;
        } else if (type === "company") {
          const response = await instance.patch(
            "/user/company/update",
            payload
          );
          return response.data;
        }
      },
      async updatePicture(payload) {
        const response = await instance({
          url: "/user/addProfilePicture",
          method: "patch",
          data: payload,
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
              payload
            );
            return response.data;
          }
        },
        async delete(type, id) {
          if (type === "personal") {
            const response = await instance.delete(
              "/user/personal/project/" + id
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
              payload
            );
            return response.data;
          }
        },
        async delete(type, id) {
          if (type === "personal") {
            const response = await instance.delete(
              "/user/personal/education/" + id
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
              payload
            );
            return response.data;
          }
        },
        async delete(type, id) {
          if (type === "personal") {
            const response = await instance.delete(
              "/user/personal/achievement/" + id
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
              payload
            );
            return response.data;
          }
        },
        async delete(type, id) {
          if (type === "personal") {
            const response = await instance.delete(
              "/user/personal/experience/" + id
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
        const response = await instance.post("/job/", payload);
        return response.data;
      }
    },
    async get(type, payload) {
      if (type === "company") {
        const response = await instance.get("/job/", payload);
        return response.data;
      }
    },
    async search(title) {
   
      const response = await instance.post("/job/search", { title });
      return response.data;
    },
  },
};
