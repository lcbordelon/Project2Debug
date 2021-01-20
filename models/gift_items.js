module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
    },
  });

  Item.associate = (models) => {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Item.belongsTo(models.List, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Item;
};
