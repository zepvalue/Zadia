const Player = require("./PlayerModel");

const PlayerController = {
  createPlayer(req, res) {
    const { username, password } = req.body;
    const player = {
      username,
      password
    };

    Player.create(player, err => {
      if (err) return res.status(400);
      return res.status(200);
    });
  },

  getPlayer(req, res) {
    const { username, password } = req.body;
    Player.findOne({ username }, (err, player) => {
      if (err || !player) return res.status(400).send(err);

      res.locals.username = username;
      return res.status(200).send(player);
    });
  },
  
  deletePlayer(req, res) {
    const { username, password } = req.body;
    Player.findOneAndDelete(username, (err, player) => {
      if (err) return res.status(400);
      return res.status(200).send(`${player} Removed`);
    });
  }
};

module.exports = PlayerController;
