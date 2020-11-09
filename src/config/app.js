const ENV = process.env;

module.exports = {
    HOST: ENV.APP_HOST,
    PORT: ENV.APP_PORT,
    URL_KEYWORD_LEN: ENV.URL_KEYWORD_LEN,
    HASH_SECRET: ENV.HASH_SECRET,
    DATABASE : {
        HOST: ENV.DB_HOST,
        USER: ENV.DB_USER,
        PORT: ENV.DB_PORT,
        PASS: ENV.DB_PASS,
        NAME: ENV.DB_NAME
    },

}