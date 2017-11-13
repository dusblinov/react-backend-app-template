import mysql from 'mysql';
import settings from 'config';

const pool = mysql.createPool(settings.mysqlPool);

module.exports = pool;
