import ExperiencePdfDoc from "../models/profile/ExperiencePdfDoc.js";
import { PdfReader } from "pdfreader";
import ParseContent from "../models/profile/ParseContent.js";

const cvUpload = async (req, res) => {
  const fileName = req.file.filename;
  const userId = req.session.userId;

  try {
    await ExperiencePdfDoc.create({ cv: fileName, userId: userId });
    await cvParser(fileName, userId);
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};

const cvParser = async (fileName, userId) => {
  try {
    const parsedTextArray = [];

    return new Promise((resolve, reject) => {
      new PdfReader().parseFileItems(`files/${fileName}`, (err, item) => {
        if (err) {
          console.error("error:", err);
          reject(err);
        } else if (!item) {
          console.warn("end of file");
          // Save the parsed text into your model using async/await
          (async () => {
            try {
              await ParseContent.create({
                ParseContent: parsedTextArray,
                userId: userId,
              });
              resolve();
            } catch (createErr) {
              console.error("Error creating ParseContent:", createErr);
              reject(createErr);
            }
          })();
        } else if (item.text) {
          parsedTextArray.push(item.text);
        }
      });
    });
  } catch (error) {
    console.error("Error in cvParser:", error);
    throw error;
  }
};

const projectDocumentsUpload = async (req, res) => {
  const fileName = req.file.filename;
  const userId = req.session.userId;

  try {
    await ExperiencePdfDoc.create({
      projectDocuments: fileName,
      userId: userId,
    });
    await projectDocumentsParser(fileName, userId);
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};

const projectDocumentsParser = async (fileName, userId) => {
  try {
    const parsedTextArray = [];

    return new Promise((resolve, reject) => {
      new PdfReader().parseFileItems(`files/${fileName}`, (err, item) => {
        if (err) {
          console.error("error:", err);
          reject(err);
        } else if (!item) {
          console.warn("end of file");
          (async () => {
            try {
              await ParseContent.create({
                ParseContent: parsedTextArray,
                userId: userId,
              });
              resolve();
            } catch (createErr) {
              console.error("Error creating ParseContent:", createErr);
              reject(createErr);
            }
          })();
        } else if (item.text) {
          parsedTextArray.push(item.text);
        }
      });
    });
  } catch (error) {
    console.error("Error in cvParser:", error);
    throw error;
  }
};

const certificateUpload = async (req, res) => {
  const fileName = req.file.filename;
  const userId = req.session.userId;

  try {
    await ExperiencePdfDoc.create({ certificate: fileName, userId: userId });
    await certificateParser(fileName, userId);
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};

const certificateParser = async (fileName, userId) => {
  try {
    const parsedTextArray = [];

    return new Promise((resolve, reject) => {
      new PdfReader().parseFileItems(`files/${fileName}`, (err, item) => {
        if (err) {
          console.error("error:", err);
          reject(err);
        } else if (!item) {
          console.warn("end of file");
          // Save the parsed text into your model using async/await
          (async () => {
            try {
              await ParseContent.create({
                ParseContent: parsedTextArray,
                userId: userId,
              });
              resolve();
            } catch (createErr) {
              console.error("Error creating ParseContent:", createErr);
              reject(createErr);
            }
          })();
        } else if (item.text) {
          parsedTextArray.push(item.text);
        }
      });
    });
  } catch (error) {
    console.error("Error in cvParser:", error);
    throw error;
  }
};

export { cvUpload, projectDocumentsUpload, certificateUpload };
