class Mailing {
    constructor(db) {
      this.db = db;
    }
  
    async findUserByName(sender, callback) {
      await this.db.query(
        "SELECT sender FROM mail WHERE sender = ?",
        [sender],
        callback
      );
    }
  
    async createSender(sender, callback) {
      await this.db.query(
        "INSERT INTO mail (sender) VALUES (?)",
        [sender],
        callback
      );
    }
  
    async createMessage(sender, receiver, message, title, callback) {
      await this.db.query(
        "INSERT INTO mail (sender, receiver, message, title) VALUES (?,?,?,?)",
        [sender, receiver, message, title],
        callback
      );
    }
  
    async getMessages(callback) {
      await this.db.query(
        "SELECT sender, receiver, message, title FROM mail",
        callback
      );
    }
  
    async fetchSenders(callback) {
      await this.db.query("SELECT DISTINCT sender FROM mail", callback);
    }
  
    async getMessagesBySender(sender, callback) {
      await this.db.query(
        "SELECT sender, receiver, message, title, date FROM mail WHERE receiver = ?",
        [sender],
        callback
      );
    }
  }
  
  module.exports = Mailing;
  