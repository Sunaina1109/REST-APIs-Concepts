const express= require("express");
const app= express();
const port= 8080;
const path= require("path");
const {v4: uuidv4}=require("uuid"); //using for unique id
const methodOverride= require("method-override");

app.use(methodOverride("_method")); //for over write get or post request

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); //read the views folder file

app.use(express.static(path.join(__dirname, "public"))); //read the public folder file

app.use(express.urlencoded ({extended: true}));
app.use(express.json()); //read all kind of document

let posts= [
    {
        id: uuidv4(),
        username: "sunaina",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "Jeeten",
        content: "I love food"
    },
    {
        id: uuidv4(),
        username: "Sagar",
        content: "I love rest"
    }
]

app.get("/", (req,res)=>{
    res.send("server doing well!")
});
app.get("/posts", ( req, res ) => { 
    res.render("main.ejs", { posts: posts });
});
app.get("/posts/new", ( req, res ) => { 
    res.render("new.ejs");
});
app.post("/posts", (req, res) => {
    let {username, content}= req.body;
    let id= uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
    let {id}= req.params;
    let post= posts.find((p) => id === p.id); //using for finding the post data
    res.render("show.ejs", {post});
});
app.patch("/posts/:id", (req, res) => {
    let {id}= req.params;
    let newContent= req.body.content;
    let post= posts.find((p) => id === p.id);
    post.content= newContent;
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
    let {id}= req.params;
    let post= posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});

});
app.delete("/posts/:id", (req, res)=>{
    let {id}= req.params;
    posts= posts.filter((p) => id !== p.id); //for using filter the data and delete not equvilent data
    res.redirect("/posts");

})


app.listen(port, ()=>{
    console.log(`app is listen ${port}`)
});

