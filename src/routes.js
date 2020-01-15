const { Router } = require('express');
const axios = require('axios');
const utils = require('./utils/utils');
const routes = Router();
const Dev = require('./models/Dev');
routes.post('/users',async (req,resp) => {
    const { github_username, techs } = req.body;
    const techsArray = techs.split(",").map(tech => tech.trim());
    const githubApiResponse = await axios.get(utils.getGithubApiUsersURI(github_username));
    const { name = login, avatar_url, bio } = githubApiResponse.data;
    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray
    })
    return resp.json(dev);
});

module.exports = routes;