const { Sequelize, DataTypes } = require('sequelize');


path = require('path')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite')
});

const commentaire = require('./models/commentaire')
const Message = commentaire(sequelize);
const scrote = require('./models/session');
const Session = scrote(sequelize);

(async () => {
    // await sequelize.sync({ force: true });
    await sequelize.sync();
})()


module.exports = {
    sequelize: sequelize, 
    models: {
        Message : Message,
        Session : Session
    }
}