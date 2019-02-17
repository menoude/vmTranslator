import { WriteStream, createWriteStream, write } from 'fs';
import { commands, memorySegments, asmAddSubANdOr, asmNegNot, asmEqGtLt } from './constants'
import { Stream } from 'stream';

export default class CodeWriter {
    
    private stream: WriteStream
    private labelsCount: number

    constructor(name: string) {
        this.stream = createWriteStream(`./${name}.asm`)
        this.labelsCount = 0
    }

    writeArithmetic(command: string): void {
        let asmCommand: string
        let specific: string

        if (specific = asmAddSubANdOr[command]) {
            asmCommand = '@SP\nM=M-1\nA=M\nD=M\n@SP\nA=M-1\n' + specific
        } else if (specific = asmNegNot[command]) {
            asmCommand = '@SP\nA=M-1\n' + specific
        } else {
            specific = asmEqGtLt[specific]
            let falseLabel: string = 'FALSE_' + this.labelsCount
            let endLabel: string = 'END_' + this.labelsCount
            asmCommand = '@SP\nM=M-1\nA=M\nD=M\n@SP\nA=M-1\nD=M-D\nM=-1\n'
            + `@${falseLabel}\n` + specific
            + `@${endLabel}\n` + '0;JMP\n'
            + `(${falseLabel})\n` + '@SP, A=M-1, M=0'
            + `(${endLabel})\n`
            this.labelsCount++ 
        }
        this.stream.write(`// ${command}\n` + asmCommand)
    }

    writePushPop(command: string, segment: string, index: number): void {
        let comment: string
        let asmCommand: string

        if (command === 'C_PUSH') {
            if (segment = 'constant') {
                asmCommand = `@${index}\n`
                            + '\nD=A\n@SP\nM=M+1\nA=M-1\nM=D\n'
            } else {
                
            }
            comment = `// push ${segment} ${index}\n`
        } else {
        
            comment = `// pop ${segment} ${index}\n`
        }
        this.stream.write(comment + asmCommand)
    }

    close(message: string): void {
        this.stream.end()
        console.log(message);
    }

}