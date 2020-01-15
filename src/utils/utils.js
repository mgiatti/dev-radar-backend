function getDatabaseURI(){
    const dbAdminUsername = process.env.DB_ADMIN_USERNAME, 
        dbAdminPassword = process.env.DB_ADMIN_PASSWORD,
        dbName = process.env.DB_NAME, 
        dbHost = process.env.DB_HOST, 
        dbPort = process.env.DB_PORT, 
        dbPrefix = process.env.DB_PREFIX;
    return `${dbPrefix}://${dbAdminUsername}:${dbAdminPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
}

function getDatabaseOptions(){
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

function getGithubApiUsersURI(userName){
    return getGithubApiPath(`users/${userName}`);
}

function getGithubApiPath(relativePath){
    const githubApiUrl = process.env.GITHUB_API;
    return `${githubApiUrl}/${relativePath}`;
}
 
module.exports = { getDatabaseURI, getDatabaseOptions, getGithubApiUsersURI };