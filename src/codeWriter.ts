import { WriteStream, createWriteStream, write } from 'fs';
import { commands, memorySegments } from './constants'
import { Stream } from 'stream';

export default class CodeWriter {
    
    private stream: WriteStream

    constructor(name: string) {
        this.stream = createWriteStream(`./${name}.asm`)
    }

    writeArithmetic(command: string): void {
        this.stream.write(`// ${command}\n`)
        
    }

    writePushPop(command: string, segment: string, index: number): void {
        this.stream.write(`// ${command === 'C_PUSH' ? 'push' : 'pop'} ${segment} ${index}\n`)
        // if (command === 'C_PUSH') {

        // } else {

        // }
    }

    close(message: string): void {
        this.stream.end()
        console.log(message);
    }

}