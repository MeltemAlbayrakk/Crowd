import ParseContent from '../models/profile/ParseContent.js';
import spacyNLP from 'spacy-nlp';

const nlp = spacyNLP.nlp;

const cvNlp = async () => {
  try {
    
    const data = await ParseContent.find({});
    const parseContentArray = data.map((doc) => doc.ParseContent);
    console.log(parseContentArray);
    res.status(200).json({ parseContentArray });
     
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};

export { cvNlp };
