const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req,resp) {
        const { techs, longitude, latitude } = req.query;
        const techArray = parseStringAsArray(techs);
        const maxDistance = 10000;
        const devs = await Dev.find({
            techs: {
                $in: techArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: maxDistance
                }
            }

        });

        return resp.json({devs});
    }
}