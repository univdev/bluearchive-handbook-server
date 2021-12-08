const e = require('express');
const fs = require('fs');
const isDirectory = require('is-directory');
const root = __dirname;


(async () => {  
  const getAnswers = async (files, path, prefix = [], answers = []) => {
    const directories = [...files].filter((f) => f.indexOf('.') <= -1);
    const wordsFiles = [...files].filter((item) => item.match(/(^words)/));
    const questionsFiles = [...files].filter((item) => item.match(/(^questions)/));
    for (let i = 0; i < wordsFiles.length; i += 1) {
      const file = wordsFiles[i];
      const filePath = `${path}/${file}`;
      const isWordFile = file.indexOf('words') === 0; // 워드파일의 경우
      const content = await readFile(filePath);
      const rows = content.split('\n');
      if (isWordFile) {
        prefix.push(rows);
        const questionPrefix = getAnswerPrefixes(prefix);
        console.log(questionPrefix);
      }
    }
    for (let i = 0; i < directories.length; i += 1) {
      const file = directories[i];
      const directoryPath = `${path}/${file}`;
      const children = await readDir(directoryPath);
      getAnswers(children, directoryPath, prefix, answers);
    }
  }
  
  const readDir = (path) => {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      })
    });
  };
  
  const readFile = (path, encoding = 'utf8') => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, encoding, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };

  const getAnswerPrefixes = (words = [], index = 0) => {
    const items = words[index];
    const isNext = words[index + 1] || false;
    const result = [];
    for (let i = 0; i < items.length; i += 1) {
      const word = items[i];
      if (isNext) {
        const children = getAnswerPrefixes(words, index + 1);
        for (let j = 0; j < children.length; j += 1) {
          const child = children[j];
          result.push(`${word} ${child}`);
        }
      } else {
        return items;
      }
    }
    return result;
  }

  const files = await readDir(root);
  const answers = [];
  await getAnswers(files, root, [], answers);
})();