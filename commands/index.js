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
      prefix.push(rows);
    }
    const prefixes = [];
    getPrefixes(prefix, [], prefixes);
    // console.log(prefixes);
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

  const getPrefixes = (words = [], steps = [], result = []) => {
    console.log(words, steps);
    for (let i = 0; i < words.length; i += 1) {
      const current = words[i];
      const next = words[i + 1] || null;
      if (isStart) steps = [];
      for (let j = 0; j < current.length; j += 1) {
        const item = current[j];
        console.log(item);
      }
    }
  }

  const files = await readDir(root);
  const answers = [];
  await getAnswers(files, root, [], answers);
})();