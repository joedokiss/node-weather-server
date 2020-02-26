const express = require('express');
const path = require('path');
const hbs = require('hbs');
const utils = require('./utils/utils');

const app = express();

const port = process.env.PORT || 3000;

// get the directory path pointing to '/public'
const publicDirectoryPath = path.join(__dirname, '../public');
// get the directory path to replace the original 'views'
const viewsPath = path.join(__dirname, '../templates/views');
// get the partials directory path
const partialsPath = path.join(__dirname, '../templates/partials');

// set up the view engine used to render the templates
app.set('view engine', 'hbs');
// set up the 'views' alternative, by default, it will look for directory 'views' instead
app.set('views', viewsPath);
// set the partials
hbs.registerPartials(partialsPath);

// config the Express, eg. default root path
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
   res.render('index', {
       title: 'Home Page',
       name: 'Joe',
   });
});

app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help Page',
        name: 'Jack',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address)
    {
        res.send({
            error: 'No address is provided'
        });
        return;
    }

    const address = req.query.address;

    utils.geocode(address, (error, {latitude, longtitude, location} = {}) => {
        if (error)
        {
            res.send({
                error: error
            });
            return;
        }

        utils.forecast(latitude, longtitude, (error, data) => {
            if (error)
            {
                res.send({
                    error: error
                })
                return;
            }

            if (data)
            {
                res.send({
                    summary: data,
                    location,
                });
            }
        });
    });
    
});

app.listen(port, () => {
    console.log('Server is up and running... on port ' + port);
});
