"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)({ path: '.env' });
const config = {
    type: `${process.env.DB_CONNECTION}`,
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
    keepConnectionAlive: false,
    synchronize: false,
    logging: true,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
};
exports.default = (0, config_1.registerAs)('database', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=config.js.map