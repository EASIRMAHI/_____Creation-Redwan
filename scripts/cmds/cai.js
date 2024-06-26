const axios = require("axios");

let defaultCharacter = "";

module.exports = {
  config: {
    name: "cai",
    version: "1.0",
    author: "Samir Œ",
    aliases: ["roleplay", "pretend"],
    countDown: 5,
    role: 0,
    category: "Character Ai"
  },
  onStart: async function ({ message, event, args, commandName }) {
    const [question, character] = args.join(' ').split('|').map(item => item.trim());
    const selectedCharacter = character || defaultCharacter;

    try {
      const response = await axios.get(`https://apis-samir.onrender.com/characterAi?message=${encodeURIComponent(question)}&name=${encodeURIComponent(selectedCharacter)}`);

      if (response.data && response.data) {
        const answer = response.data.text;
        const characterName = `${answer}`;
        message.reply({ body: characterName }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            character: selectedCharacter
          });
        });
      }

    } catch (error) {
      console.error("Error:", error.message);
    }
  },

  onReply: async function ({ message, event, Reply, args }) {
    let { author, commandName, character } = Reply;
    if (event.senderID != author) return;
    const [question] = args.join(' ').split('|').map(item => item.trim());

    try {
      const response = await axios.get(`https://apis-samir.onrender.com/characterAi?message=${encodeURIComponent(question)}&name=${encodeURIComponent(character)}`);

      if (response.data && response.data) {
        const answer = response.data.text;
        const characterName = `${answer}`;
        message.reply({ body: characterName }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            character: character
          });
        });
      }

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
