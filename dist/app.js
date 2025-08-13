"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config/"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const books_route_1 = __importDefault(require("./routes/books.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const season_route_1 = __importDefault(require("./routes/season.route"));
const authenticated_1 = __importDefault(require("./middleware/authenticated"));
const errorHandler_1 = require("./middleware/errorHandler");
const db_1 = require("./db");
const app = (0, express_1.default)();
const clientOrigin = "http://localhost:3000";
app.use((0, cors_1.default)({
    origin: clientOrigin,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.send("Welcome There!");
});
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1/books", authenticated_1.default, books_route_1.default);
app.use("/api/v1/users", authenticated_1.default, user_route_1.default);
app.use("/api/v1/seasons", authenticated_1.default, season_route_1.default);
app.use(errorHandler_1.errorHandler);
const startServer = async () => {
    try {
        // mongoose db connection
        await (0, db_1.connectToDB)();
        app.listen(config_1.default.PORT, () => {
            console.log(`Server listening on port ${config_1.default.PORT}`);
        });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=app.js.map