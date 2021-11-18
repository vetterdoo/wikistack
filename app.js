const express = require("express");
const morgan = require("morgan");
const { db, Page, User } = require('./models');

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

const app = express();

app.use(morgan("dev"));

//this will work with static files
//it will include images/static files 
app.use(express.static(__dirname + "/views"));

app.get("/", async(req, res, next) => {
try {
    {res.redirect('/wiki')}
}
catch(err) {
    err.status(404);
    next(err)
    }
}
);

app.use('/wiki', wikiRouter);

const sync = async function (){
    await db.sync({force: true});

    const PORT = 1337;
    app.listen(PORT);
}

sync();


