const express = require('express');
const colors = require('colors');
const cors = require('cors')
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql');
const schema =  require('./schema/schema');
const connectDB = require('./config/db');
const port = process.env.PORT ||5000;
const app = express();

//connect database
connectDB();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql:  process.env.NODEENV== 'development'
}));

app.listen(port, console.log(`Serverrunning on port ${port}`));