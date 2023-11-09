import JobModel from "../models/Job.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Bard from "bard-ai";

const getAlljobs = async (req, res) => {
  const jobs = await JobModel.find({});

  res.status(201).json(jobs);
};

const createjob = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const job = await new JobModel({
      title: title,
      description: description,
      budget: budget,
    });
    await job.save();
    res.status(201).json({ message: "job created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function ai(content) {
  let myBard = new Bard(
    "cwimDfbU7-DLPpkcMc8vGQRaTKCn6a6arde__Ca4fwBz7aofoOGQUxYZwRN6qsu9pa66rA.",
    {
      verbose: true,
      fetch: fetch,
    }
  );

  try {
    const aicontent = await myBard.ask(`${content}`);
    // Bu kısımda aicontent değişkeniyle yapmak istediğiniz işlemleri gerçekleştirebilirsiniz

    console.log(aicontent);
    return aicontent;
  } catch (error) {
    // Hata yönetimi burada yapılabilir
    console.error(error);
    throw error;
  }
}

const aiAnalysis = async (req, res) => {
  try {
    const {title ,past, future } = req.body;

    const jobs = await JobModel.find({});

    const reactJobs = jobs.filter((job) => job.title === title);
    const numberOfReactJobs = reactJobs.length;

    let question =
      numberOfReactJobs +
      " geçmiş react dili verisine bakarak " +
      past +
      " aya bakarak" +
      " gelecek " +
      future +
      " ay içinde ne yönlü bir gelişme olabilir analiz yapabilir misin ?";

    const data = await ai(question);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "ai cookie patladı" });
  }
};

export { createjob, getAlljobs, aiAnalysis };
