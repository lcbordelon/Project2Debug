module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define("List", {
    // Giving the Author model a name of type STRING
    member: DataTypes.STRING,
  });

  List.associate = (models) => {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    List.hasMany(models.Item, {
      onDelete: "cascade",
    });
  };

  return List;
};
