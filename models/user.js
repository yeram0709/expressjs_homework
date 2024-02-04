const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      
      {
        username: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      
      {
        sequelize,
        charset: "utf8",			
        collate: "utf8_general_ci",		
        tableName: "user",			
        modelName: "User",			
        underscored: true,			
        timestamps: false,              	
      }
    );
  }
  static associate(db) {}
};