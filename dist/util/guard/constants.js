"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: `${process.env.JWT_SECRET_KEY}`,
    signOptions: {
        expiresIn: `${process.env.JWT_EXPIRES_IN}`,
    },
};
//# sourceMappingURL=constants.js.map