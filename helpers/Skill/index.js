class Skill {
  constructor(character) {
    this.character = character;
  }
  getItems() {
    return {
      name: this.character,
      skills: {
        ex: null,
        normal: null,
        sub: null,
        special: null,
      },
    };
  }
}

module.exports = Skill;