import { WriteStream, createWriteStream } from 'fs';
import { memorySegments } from './commands'

export default class CodeWriter {
    
    stream: WriteStream

    constructor(name: string) {
        this.stream = createWriteStream(`./${name}.asm`)
    }

    writeArithmetic(command: string): void {
        this.stream.write(`// ${command}\n`)

    }

    writePushPop(command: string, segment: string, index: number): void {
        this.stream.write(`// ${command} ${segment} ${index}\n`)
        if (command === 'C_PUSH') {

        } else {

        }
    }

    close(): void {
        this.stream.end()
    }
}