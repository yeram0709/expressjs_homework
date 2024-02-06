const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        charset: "utf8",
        collate: "utf8_general_ci",
        tableName: "board",
        modelName: "Board",
        underscored: true,
        timestamps: false,
      }
    );
  }
  
  static associate(db) {
    db.Board.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
  }
};