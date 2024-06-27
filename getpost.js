const express = require("express");
const methodOverride = require("method-override");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
uuid();

app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true })); //used to get data by post. only for forms.
app.use(express.json()); //used to get data in json format.
app.use(methodOverride("_method")); //it overrides browser to us eput,delete,patch which we cannot use in browser.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "Thats some good stuff.",
  },
  {
    id: uuid(),
    username: "Henry",
    comment: "wheres the link you shit....",
  },
  {
    id: uuid(),
    username: "Jack",
    comment: "i also want to join the dark web.",
  },
  {
    id: uuid(),
    username: "Tony",
    comment:
      "can i buy a military grade tank from there you know not for something bad..:)",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  //to give new comments a id we will use uuid package.
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newComment;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id); //we are updating array and adding everything else than the comment we want to delete.
  res.redirect("/comments");
});

app.get("/tacos", (req, res) => {
  res.send("GET /tacos response.");
});

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`here's your ${qty}  ${meat} tacos.`);
});

app.listen(8080, () => {
  console.log("listening on 8080 port.");
});

//REST making a CRUD system for comments on our site.
/*
GET /comments --- show all comments.
POST /comments --- create a new comment.
GET /comments/:id --- gets one comment.
PATCH /comments/:id --- update a comment.
DELETE /commnets/:id --- deletes a comment.
*/
