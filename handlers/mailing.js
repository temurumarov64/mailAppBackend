const { Router } = require("express");
const Mailing = require("../services/mailingService");

const mailingHandler = (db) => {
  const router = Router();

  const mailService = new Mailing(db);

  router.post("/login", async (req, res) => {
    const { sender } = req.body;

    if (!sender) {
      return res.status(401).json({ error: "name can't be empty" });
    }

    if (sender.length <= 1) {
      return res.status(401).json({ error: "name is too short" });
    }

    await mailService.findUserByName(sender, async (error, results) => {
      if (error) {
        return res.status(400).json(error.message);
      }
      if (results.length === 0) {
        await mailService.createSender(sender, (error, results) => {
          if (error) {
            res.status(400).json(error.message);
            return;
          }

          res.status(201).json({ msg: "Sender has been created" });
          return;
        });
      }

      res.status(200).json(results);
    });
  });

  router.post("/message", async (req, res) => {
    const { sender, receiver, message, title } = req.body;

    // if (!title) {
    //   return res.json({ error: "title can't be empty" });
    // }

    // if (message.length <= 10) {
    //   return res.json({ error: "message is too short" });
    // }

    await mailService.createMessage(
      sender,
      receiver,
      message,
      title,
      async (error, results) => {
        if (error) {
          return res.status(400).json(error.message);
        }

        res.status(200).json(results);
      }
    );
  });

  router.get("/senders", async (req, res) => {
    await mailService.fetchSenders((error, results) => {
      if (error) {
        res.status(400).json(error.message);
        return;
      }

      res.status(200).json(results);
    });
  });

  router.get("/messages", async (req, res) => {
    const { sender } = req.query;
    await mailService.getMessagesBySender(sender, (error, results) => {
      if (error) {
        res.status(400).json(error.message);
        return;
      }
      res.status(200).json(results);
    });
  });

  return router;
};

module.exports = mailingHandler;
