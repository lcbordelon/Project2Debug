const db = require("../models");

module.exports = (app) => {
  //api call to call all of the records in the list_members db
  app.get("/api/lists", (req, res) => {
    //join to include all of EACH List Member's GiftItems
    db.List.findAll({
      include: [db.Item],
    }).then((dbList) => {
      res.json(dbList);
    });
  });

  //api call to call one record in the list_members db
  app.get("/api/lists/:id", (req, res) => {
    //join to include all of ONE of the List Member's Items
    db.List.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Item],
    }).then((dbList) => res.json(dbList));
  });

  // api call to post (create) one record in the list_members db
  app.post("/api/lists", (req, res) => {
    db.List.create(req.body).then((dbList) => res.json(dbList));
  });

  // api call to delete (delete) one record in the list_members db
  app.delete("/api/lists/:id", (req, res) => {
    db.List.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbList) => res.json(dbList));
  });

  //GIFT ITEMS API CALL DO NOT TOUCH THESE

  //WHEN THEY CLICK 'VIEW LIST' IT WILL SHOW THE ITEMS ASSOCIATED TO THE LISTMEMBER
  app.get("/api/items", (req, res) => {
    //join to include all of EACH List Member's GiftItems
    db.Item.findAll({
      include: [db.List],
    }).then((dbItem) => {
      res.render("members", dbItem);
      console.log(dbItem);
    });
  });

  //DONT NEED
  // //api call to call one record in the gift_items db
  // app.get("/api/items/:id", (req, res) => {
  //   //join to include all of ONE of the List Member's Items
  //   db.GiftItem.findOne({
  //     where: {
  //       id: req.params.id,
  //     },
  //     // include: [db.GiftItem],
  //   }).then((dbGiftItem) => console.log(dbGiftItem));
  // });

  // api call to post (create) one record in the gift_items db
  app.post("/api/items", (req, res) => {
    db.Item.create(req.body).then((dbItem) => res.json(dbItem));
  });

  //DONT NEED
  // api call to delete (delete) one record in the gift_items db
  // app.delete("/api/items/:id", (req, res) => {
  //   db.GiftItem.destroy({
  //     where: {
  //       id: req.params.id,
  //     },
  //   }).then((dbGiftItem) => res.json(dbGiftItem));
  // });
};
