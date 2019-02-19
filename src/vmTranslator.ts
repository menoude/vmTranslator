import Parser from "./parser";
import CodeWriter from './codeWriter'

const path = process.argv[2]
const regex = /.*\.vm/

if (process.argv.length !== 3 || !regex.test(path)) {
    console.log('Usage: node vmTranslator.js [fileName].vm');
    process.exit(1)
}

const parser: Parser = new Parser(path)
const codeWriter: CodeWriter = new CodeWriter(path)

while(parser.hasMoreCommands()) {
    parser.advance()
    let commandType = parser.commandType()
    if (commandType === 'C_ARITHMETIC')
        codeWriter.writeArithmetic(parser.arg1())
    else
        codeWriter.writePushPop(commandType, parser.arg1(), parser.arg2())
}

codeWriter.close()