import { readFileSync } from 'fs'
import { commands } from './commands'

export default class Parser {
    
    lines: string[]
    currentLine: string[]

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
    }

    hasMoreCommands(): boolean {
        return this.lines.length > 0
    }

    advance(): void {
        let next: string | undefined = this.lines.pop()
        this.currentLine = next ? next.split(' ') : []
    }

    commandType(): string {
        // + a case when it's null?
        return commands[this.currentLine[0]]
    }

    arg1(): string {
        return this.currentLine[1]
    }

    arg2(): number {
        return parseInt(this.currentLine[2])
    }
}