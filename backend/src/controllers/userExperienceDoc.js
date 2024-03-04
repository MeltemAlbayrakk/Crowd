import ExperiencePdfDoc from "../models/profile/ExperiencePdfDoc.js";
import { PdfReader } from "pdfreader";
import ParseContent from "../models/profile/ParseContent.js";

const cvUpload = async (req, res) => {
  const fileName = req.file.filename;
  const userId = req.session.userId;

  try {
    await ExperiencePdfDoc.create({ cv: fileName, userId: userId });
    res.send({ status: "ok" });
    await PdfParser(fileName, userId);
  } catch (error) {
    res.json({ status: error });
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
    await PdfParser(fileName, userId);
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};

const certificateUpload = async (req, res) => {
  const fileName = req.file.filename;
  const userId = req.session.userId;

  try {
    await ExperiencePdfDoc.create({ certificate: fileName, userId: userId });
    await PdfParser(fileName, userId);
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};

const PdfParser = async (fileName, userId) => {
  try {
    const parsedTextArray = [];

    return new Promise((resolve, reject) => {
      new PdfReader().parseFileItems(`files/${fileName}`, (err, item) => {
        if (err) {
          console.error("error:", err);
          reject(err);
        } else if (!item) {
          console.warn("end of file");
         
          const words = [];
          parsedTextArray.forEach((sentence) => {

            const sentenceWords = sentence.split(/\s+/);

            sentenceWords.forEach((word) => {
              if (!words.includes(word)) {
                words.push(word);
              }
            });
          });

          processTextArray(words,userId);

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
const processTextArray = async (textArray, userId) => {
  const resultArray = [];

  for (const text of textArray) {
    const resultItem = {
      text: text,
      terms: [],
    };

    const words = text.split(/\s+/);

    for (const word of words) {
      const dateRegex = /\b(\d{1,2}\/\d{1,2}\/\d{2,4})\b/;
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
      const numberRegex = /\b\d+\b/;
      const linkedInRegex = /\b(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\b/;
      const programmingLanguagesRegex = /\b(java|javascript|python|c(\+\+)?|c#)\b/i;
      const genderRegex = /\b(Kadın|Erkek|erkek|kadın)\b/i;
      let termType;

      if (dateRegex.test(word)) {
        termType = "date";
      } else if (emailRegex.test(word)) {
        termType = "email";
      } else if (numberRegex.test(word)) {
        termType = "number";
      } else if (linkedInRegex.test(word)) {
        termType = "linkedin";
      } else if (programmingLanguagesRegex.test(word)) {
        termType = "programmingLanguage";
      } else if (genderRegex.test(word)) {
        termType = "gender";
      } else {
        termType = "custom";
      }

      resultItem.terms.push({
        type: termType,
      });
    }

    resultArray.push(resultItem);
  }

  try {
    await ParseContent.create({
      resultArray: resultArray,
      userId: userId,
    });

    console.log("ResultArray saved to MongoDB");
  } catch (error) {
    console.error("Error saving ResultArray to MongoDB:", error);
  }

  return resultArray;
};

export { cvUpload, projectDocumentsUpload, certificateUpload };
