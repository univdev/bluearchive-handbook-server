const { NlpManager } = require('node-nlp');

class Nlp {
  static manager = new NlpManager({ languages: ['ko'] });
  static getManager() {
    return this.manager;
  }
  static learn(language, question, answer) {
    const manager = this.getManager();
    manager.addDocument(language, question, answer);
  }
  static learnAllData(data, questionKey = 'chain', answerKey = 'answer', language = 'ko') {
    for (let i = 0; i < data.length; i += 1) {
      const item = data[i];
      this.learn(language, item[questionKey], item[answerKey]);
    }
  }
  static async ask(question, language = 'ko') {
    const manager = this.getManager();
    const response = await manager.process(language, question);
    return response;
  }
  static async train() {
    const manager = this.getManager();
    await manager.train();
    manager.save();
  }
}

module.exports = Nlp;
