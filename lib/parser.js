"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = __importDefault(require("./commands"));
var fs_1 = require("fs");
var Parser = /** @class */ (function () {
    function Parser(path) {
        var fileContent = fs_1.readFileSync(path, 'UTF8');
        this.lines = fileContent.split('\n');
    }
    Parser.prototype.hasMoreCommands = function () {
        return true;
    };
    Parser.prototype.advance = function () {
    };
    Parser.prototype.commandType = function () {
        return commands_1.default['C_ARITHMETIC'];
    };
    Parser.prototype.arg1 = function () {
        return 'push';
    };
    Parser.prototype.arg2 = function () {
        return 1;
    };
    return Parser;
}());
exports.default = Parser;
