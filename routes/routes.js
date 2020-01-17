/*
 * for routing 
 *
 * */

const router = require("express").Router();
const Todo = require('../models/todo');

router.get("/",function(req,res){
   Todo.find({}).then(function(results){ 
     console.log("db result :", results );
     let todos = results.filter(function(e){return !e.done});
     let donetodos = results.filter(function(e){return e.done});
     res.render("index",{todos:todos,donetodos:donetodos});
   });	
});


router.post("/todos",function(req,res){
    let newTodo = new Todo({description:req.body.description});	
    
    newTodo.save().then(function(result){
      console.log("save database result :",result);
      res.redirect("/");
    }).catch(function(err){
      console.log("err", err);
      res.redirect("/");
    });

});


router.post("/todos/:id/completed",function(req,res){
   console.log("complete id :",req.params.id);	
   let todoId = req.params.id;
   let time = new Date();
   Todo.findById(todoId).exec().then(function(result){
        result.done = !result.done; // make toggle todo done = true or false
	result.time = time.toString();
	console.log("new save data obj : ",result);
        return result.save();
   }).then(function(result){
        res.redirect("/");
   });
});

module.exports = router;
