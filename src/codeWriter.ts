import { WriteStream, createWriteStream, write } from 'fs';
import { commands, variableSegments, fixedSegments, asmAddSubANdOr, asmNegNot, asmEqGtLt } from './constants'
import { Stream } from 'stream';

export default class CodeWriter {
    
    private stream: WriteStream
    private labelsCount: number
    private staticsCount: number

    constructor(private name: string) {
        this.stream = createWriteStream(`./${name}.asm`)
        this.labelsCount = 0
        this.staticsCount = 0
    }

    writeArithmetic(command: string): void {
        let asmCommand: string,
            specific: string

        if (specific = asmAddSubANdOr[command]) {
            asmCommand = '@SP\nM=M-1\nA=M\nD=M\n@SP\nA=M-1\n' + specific
        } else if (specific = asmNegNot[command]) {
            asmCommand = '@SP\nA=M-1\n' + specific
        } else {
            specific = asmEqGtLt[command]
            let falseLabel: string = 'FALSE_' + this.labelsCount
            let endLabel: string = 'END_' + this.labelsCount
            asmCommand = '@SP\nM=M-1\nA=M\nD=M\n@SP\nA=M-1\nD=M-D\nM=-1\n'
            + `@${falseLabel}\n` + specific
            + `@${endLabel}\n` + '0;JMP\n'
            + `(${falseLabel})\n` + '@SP\nA=M-1\nM=0\n'
            + `(${endLabel})\n`
            this.labelsCount++ 
        }
        this.stream.write(`// ${command}\n` + asmCommand)
    }

    writePushPop(command: string, segment: string, index: number): void {
        if (command === 'C_PUSH')
            this.writePush(segment, index)
        else
            this.writePop(segment, index)
    }
        
    private writePush(segment: string, index: number):void {
        let asmCommand: string,
            label: string,
            address: number
        
        if (label = variableSegments[segment]) {
            label = label === 'static' ? this.name + index: label
            asmCommand = `@${index}\nD=A\n`
                        + `@${label}\nAD=D+M\n`
                        + 'D=M\n@SP\nM=M+1\nA=M-1\nM=D\n'
        } else if (address = fixedSegments[segment]) {
            address += index
            asmCommand = `@${index}\nD=A\n`
        } else {
            // constant
            asmCommand = `@${index}\nD=A\n`
                        + '@SP\nM=M+1\nA=M-1\nM=D\n'
        }
        this.stream.write(`// push ${segment} ${index}\n` + asmCommand)
    }

    private writePop(segment: string, index: number):void {
        let asmCommand: string,
            specific: string
        
        address = memorySegments[segment]
        this.writePop(segment, index)
        if (address) {
            asmCommand = `@${index}\nD=A\n`
            + `@${address}\nD=D+M\n`
            + '@SP\nAM=M-1\nD=D+M\nA=D-M\nM=D-A\n'
        } else {
            // static
            address = this.name + this.staticsCount++
            asmCommand = `@SP\nAM=M-1\nD=M\n@${address}\nM=D\n`
        }
        this.stream.write(`// push ${segment} ${index}\n` + asmCommand)
    }

    close(message: string): void {
        this.stream.end()
        console.log(message);
    }

}