import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'g2h6aBFB2faF-e4dbghacDFaC2f64bDF',
  database: process.env.DB_NAME || 'railway',
  host: process.env.DB_HOST || 'monorail.proxy.rlwy.net',
  port: Number(process.env.DB_PORT) || 10724,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;
