const express = require("express");

const router = express.Router();

const db = require("../models");
// const listMember = require("../models/list_members.js");

router.get("/", (req, res) => {
  console.log("got");

  res.render("index");
});

//LIST MEMBERS PAGE API ROUTES (to display names of list we've created and to create/delete existing lists)

//LIST MEMBERS PAGE API ROUTES (to display names of list we've created and to create/delete existing lists)

router.get("/lists", (req, res) => {
  console.log("LISTS ROUTE");
  //join to include all of EACH List Member's Items
  db.List.findAll({
    //   include: [db.GiftItem],
  }).then((dbList) => {
    // res.json(dbListMember);

    const jsonObject = JSON.parse(JSON.stringify(dbList));

    const hbsObject = {
      lists: jsonObject,
    };
    console.log(jsonObject);
    res.render("lists", hbsObject);
  });
});

//POST request for adding a new List Member to list members <ul>
router.post("/lists", (req, res) => {
  console.log("adding");
  db.List.create(req.body).then((dbList) => {
    res.json(dbList);

    const jsonObject = JSON.parse(JSON.stringify(dbList));

    const hbsOjbect = {
      lists: jsonObject,
    };
    console.log(jsonObject);
    res.render("lists", hbsOjbect);
  });
});

//DELETE request to delete a list member from the Listmembers db

router.delete("/api/delete/:id", (req, res) => {
  console.log("deleting");
  db.List.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbList) => {
    // res.json(dbListMember);

    const jsonObject = JSON.parse(JSON.stringify(dbList));

    const hbsObject = {
      lists: jsonObject,
    };
    console.log(jsonObject);
    res.render("lists", hbsObject);
  });
});

//GIFT ITEMS PAGE HTML ROUTES (to post new items to the GiftItems db)
router.get("/kringle", (req, res) => {
  console.log("ITEMS ROUTE");
  //join to include all of EACH List Member's Items
  db.Item.findAll({
    // include: [db.Item],
  }).then((dbItem) => {
    // res.json(dbListMember);

    const jsonObject = JSON.parse(JSON.stringify(dbItem));

    const hbsObject = {
      items: jsonObject,
    };
    console.log(jsonObject);
    res.render("kringle", hbsObject);
  });
});

//POST request for adding a new Gift Item to gift items db
router.post("/kringle", (req, res) => {
  console.log("adding");
  db.Item.create(req.body).then((dbItem) => {
    res.json(dbItem);

    const jsonObject = JSON.parse(JSON.stringify(dbItem));

    const hbsOjbect = {
      items: jsonObject,
    };
    console.log(jsonObject);
    res.render("kringle", hbsOjbect);
  });
});

//   // DELETE route for deleting gift items
//   router.delete("/api/items/:id", (req, res) => {
//     db.GiftItem.destroy({
//       where: {
//         id: req.params.id,
//       },
//     }).then((dbGiftItem) => {
//       // res.json(dbListMember);

//       const jsonObject = JSON.parse(JSON.stringify(dbGiftItem));

//       const hbsObject = {
//         giftitems: jsonObject,
//       };
//       console.log(jsonObject);
//       res.render("items", hbsObject);
//     });
//   });

//   // PUT route for updating gift items
//   router.put("/api/items", (req, res) => {
//     db.GiftItem.update(req.body, {
//       where: {
//         id: req.body.id,
//       },
//     }).then((dbGiftItem) => res.json(dbGiftItem));
//   });

//   res.render("items");
// });

//   res.render("items");
// };

router.get("/search", (req, res) => {
  console.log("got");

  res.render("etsy");
});

//HTML route to generate members.handlebars via browser
router.get("/members", (req, res) => {
  console.log("got");

  res.render("members");
});

module.exports = router;
