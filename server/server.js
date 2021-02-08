const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error-handler')
const sequelize = require('./db')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//models
const user = require('./models/user.model')
const task = require('./models/task.model')
const status = require('./models/status.model')
const priority = require('./models/priority.model')

// api routes
app.use('/api', require('./routes/router'));

// closing line of middlewares
app.use(errorHandler);

// start server
const PORT = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
//const PORT = process.env.PORT || 4000;
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
    } catch (e) {
        console.log(e)
    }
}
start()