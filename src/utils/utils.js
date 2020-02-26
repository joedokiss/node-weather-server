const request = require('request');
const config = require('../config/config');

const forecast = (latitude, longtitude, callback) => {

    const darkOptions = {
        url: config.darksky.defaultUrl + config.darksky.key + '/' + `${latitude},${longtitude}`,
        json: true,
    };

    request(darkOptions, (error, response, body) => {
        if (error)
        {
            callback('Unable to connect the server', undefined);
        }
        else if (body.error)
        {
            callback(body.error, undefined);
        }
        else
        {
            const currentSummary = body.currently.summary;

            callback(undefined, currentSummary);
        }
    });
};

/**
 * get latitude and longtitude of a geo location
 * @param {*} address 
 * @param {*} callback 
 */
const geocode = (address, callback) => {
    const mapPlace = encodeURIComponent(address);
    const mapQueryCondition = '&limit=1';

    const mapOptions = {
        url: config.mapbox.defaultUrl + mapPlace + '.json?access_token=' + config.mapbox.key + mapQueryCondition,
        json: true,
    };

    request(mapOptions, (error, response, body) => {
        // https://api.mapbox.com/geocoding/v5/mapbox.places/Sydney.json?access_token=pk.eyJ1IjoieXhzb25nIiwiYSI6ImNrMWhzaXk1ZDFpd2kzbm50ODd6MW5mMTIifQ.i6Z-TalytrAOTyE-9r4zmA&limit=1

        if (error)
        {
            callback('Unable to connect server', undefined);
        }
        else if (body.features.length === 0)
        {
            callback('No results are found', undefined);
        }
        else
        {
            const data = {
                longtitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            };

            callback(undefined, data);
        }
    });
};

module.exports = {forecast, geocode};
