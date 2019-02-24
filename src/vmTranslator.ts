import Parser from "./parser";
import CodeWriter from './codeWriter'
import { exitProgram, listFiles } from './utils'
import { statSync } from 'fs'
import path from 'path'

let resolvedPath: string,
    isDirectory: boolean,
    outputFileName: string,
    outputFilePath: string,
    files: string[],
    parser: Parser,
    codeWriter: CodeWriter

resolvedPath = ''
isDirectory = false
try {
    if (process.argv.length !== 3)
        throw new Error()
    resolvedPath = path.resolve(process.argv[2])
    isDirectory = statSync(resolvedPath).isDirectory()
} catch(e) {
    exitProgram('Usage: node vmTranslator.js fileName.vm | directoryName')
}
files = listFiles(resolvedPath, isDirectory)
if (!files.length)
    exitProgram('No vm file to translate')
outputFileName = path.basename(resolvedPath, '.vm') + '.asm'
outputFilePath = isDirectory ? path.join(resolvedPath, outputFileName)
                            : path.join(path.dirname(resolvedPath), outputFileName)

console.log(files)
console.log(outputFileName)
console.log(outputFilePath)

codeWriter = new CodeWriter(outputFilePath)
files.forEach((file) => {
    parser = new Parser(file)
    codeWriter.setFileName(path.basename(file, '.vm'))
    while(parser.hasMoreCommands()) {
        parser.advance()
        let commandType = parser.commandType()
        if (commandType === 'C_ARITHMETIC')
            codeWriter.writeArithmetic(parser.arg1())
        else if (commandType === 'C_PUSH' || commandType === 'C_POP')
            codeWriter.writePushPop(commandType, parser.arg1(), parser.arg2())
        else {

        }
    }
})

codeWriter.close()
console.log(`${outputFileName} created.`);