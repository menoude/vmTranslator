import { readFileSync } from 'fs'
import { commands } from './constants'

export default class Parser {
    
    private lines: string[]
    private currentLine: string[]
    private currentCommandCode: string

    constructor(path: string) {
        let commentLine: RegExp = /\/\//
        const fileContent: string = readFileSync(path, 'UTF8')

        this.lines = fileContent.split('\n').reduce((acc: string[], line: string) => {
            line = line.trim()
            if (!commentLine.test(line) && line !== '')
                acc.push(line)
            return acc
        }, [])
        this.currentLine = []
        this.currentCommandCode = ''
    }

    hasMoreCommands(): boolean {
        return this.lines.length > 0
    }

    advance(): void {
        let next: string | undefined = this.lines.pop()
        this.currentLine = next ? next.split(' ') : []
        this.currentCommandCode = commands[this.currentLine[0]]
    }

    commandType(): string {
        return this.currentCommandCode
    }

    arg1(): string {
        if (this.currentCommandCode === 'C_ARITHMETIC')
            return this.currentLine[0]
        return this.currentLine[1]
    }

    arg2(): number {
        return parseInt(this.currentLine[2])
    }

}