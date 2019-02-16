"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = __importDefault(require("./parser"));
var path = process.argv[1];
var regex = /.*\.vm/;
if (process.argv.length !== 3 || !regex.test(path)) {
    console.log('Usage: node vmTranslator.js [fileName].vm');
    process.exit(1);
}
var parser = new parser_1.default(path);
