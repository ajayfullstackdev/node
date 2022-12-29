import axios from "axios";
import fs from "fs";

const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) return reject("File not Present");

      resolve(data);
    });
  });
};

const writeFile = (fileName, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) {
        return rej("Creation of file failed !");
      }

      res("Successfully wrote!");
    });
  });
};

const processPosts = async (idPath, postPath, commentsPath) => {
  try {
    const id = await readFile(idPath);

    let postData = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    await writeFile(postPath, postData.data.title);

    let commentsData = await axios.get(
      `https://jsonplaceholder.typicode.com/comments/${id}`
    );

    await writeFile(commentsPath, commentsData.data.body);
  } catch (err) {
    console.log(err);
  }
};

processPosts("./data/id.txt", "./data/post.txt", "./data/comments.txt");
