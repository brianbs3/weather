module.exports = {
    DB: process.env.DB_URL,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_DB: process.env.DB_DB,
    PG_DB: process.env.PG_DB,
    NODE_ENV: process.env.NODE_ENV,
    CONTACTEMAIL: 'brianbs3@gmail.com',
    TOKENEXPIRETIME: 60 * 60 * 24,       // 24 hours
};