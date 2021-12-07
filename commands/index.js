const fs = require('fs');
const isDirectory = require('is-directory');
const root = __dirname;

fs.readdir(root, async (err, list) => {
  await insertCommands(list, [], root, []);
});

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

const insertCommands = async (list, words, path, answers = []) => {
  const currentWords = [...words]; // 입력된 단어들
  const directories = [...list].filter((item) => item.indexOf('.') <= -1); // 검색된 파일 중에서 폴더만
  const files = [...list].filter((item) => item.match(/(^questions|^words)/)); // 검색된 파일 중에서 questions, words 이름을 가진 파일들만
  for (let i = 0; i < files.length; i += 1) {
    const item = files[i]; // 파일 이름
    const isWords = item.indexOf('words') === 0; // 해당 파일이 단어 파일인 경우 true
    const filePath = `${path}/${item}`; // 파일의 경로
    const data = await readFile(filePath); // 파일을 읽어옴
    const rows = (data || '').split('\n'); // 읽어온 파일의 데이터를 줄로 나눔
    const words = []; // 반복문을 돌면서 축적된 단어
    if (isWords) { // 현재 파일이 단어파일이라면
      currentWords.push(rows);
      getChainWord(currentWords, [], words);
    }
    if (!isWords) { // 현재 파일이 단어파일이 아니라면 (question.txt라면)
      const questions = [];
      getChainWord([words, rows], [], questions);
    }
  }
  for (let i = 0; i < directories.length; i += 1) { // 하위 디렉토리가 있다면 한번 더 재귀
    const item = directories[i];
    const currentPath = `${path}/${item}`;
    const children = await readDir(currentPath);
    insertCommands(children, currentWords, currentPath, answers);
  }
};

const getChainWord = (chain = [], words = [], result = []) => {
  for (let i = 0; i < chain.length; i += 1) {
    const next = chain[i + 1] || null;
    for (let j = 0; j < chain[i].length; j += 1) {
      const nextChain = [...chain].slice(1);
      const item = chain[i][j];
      const currentWords = [...words, item];
      if (next) {
        getChainWord(nextChain, currentWords, result);
      } else {
        result.push(currentWords.join(' '));
      }
    }
  }
}