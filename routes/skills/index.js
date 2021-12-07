const express = require('express');
const { characters } = require('../../constants');
const { Skill } = require('../../helpers');
const router = express.Router();

router.get('/skills', (req, res) => {
  try {
  const { character } = req.query;
  const validCharacterNames = characters ? characters.names : [];
  if (!character) throw new Error('캐릭터 이름을 입력해주세요.');
  if (!validCharacterNames.find((name) => character === name)) throw new Error('캐릭터명을 잘못 입력하셨거나, 추가되지 않은 캐릭터입니다.');
  const skill = new Skill(character);
  return res.status(200).json(skill.getItems());
  } catch (e) {
    const { message } = e;
    return res.status(400).json({ message });
  }
});

module.exports = router;