//const { application } = require("express");
const express=require("express");
const { getNote, createNote, deleteNote, updateNote } = require("../controllers/noteController");
const noteRouters=express.Router();
const auth=require("../middlewares/auth");

noteRouters.get("/", auth, getNote);

noteRouters.post("/", auth, createNote);
noteRouters.delete("/:id", auth, deleteNote);

noteRouters.put("/:id", auth, updateNote);

module.exports=noteRouters;