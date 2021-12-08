const e = require('express');
const fs = require('fs');
const isDirectory = require('is-directory');
const root = __dirname;

const command = async () => {    
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
    // [['단어1', '단어2', '단어3'], ['단어4', '단어5', '단어6', '단어7']] 을 입력하면
    // 해당 단어들과 매칭되는 모든 경우의 수를 일차원 배열로 보냄
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
  const scanFiles = async (path, chain = [], answer = [], result = []) => {
    const children = await readDir(path);
    const directories = [...children].filter((i) => i.indexOf('.') <= -1);
    const files = [...children].filter((i) => i.indexOf('.') > -1);
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const filePath = `${path}/${file}`;
      const isQuestionFile = file === 'questions.txt';
      const isNamesFile = file === 'names.txt';
      if (!isQuestionFile && !isNamesFile) continue;
      const content = await readFile(filePath);
      const rows = content.split('\n');
      if (isNamesFile) {
        chain.push(rows);
      }
      if (isQuestionFile) {
        const chainQuestions = getAnswerPrefixes(chain, 0);
        const questions = getAnswerPrefixes([chainQuestions, rows], 0).map((q) => ({ chain: q, answer: answer.join('.') }));
        result.push(...questions);
      }
    }
    for (let i = 0; i < directories.length; i += 1) {
      const directory = directories[i];
      const directoryPath = `${path}/${directory}`;
      answer.push(directory);
      await scanFiles(directoryPath, chain, answer, result);
    }
  };
  const questions = [];
  await scanFiles(root, [], [], questions);
  return questions;
};

module.exports = command;
