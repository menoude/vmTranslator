import { readdirSync } from 'fs'
import path from 'path'
const vmFile: RegExp = /.*\.vm/


export function exitProgram(message: string): void {
    console.log(message);
    process.exit(1)
}

export function listFiles(resolvedPath: string, isDirectory: boolean): string[] {
    if (isDirectory) {
        return readdirSync(resolvedPath)
        .reduce((acc: string[], filePath: string) => {
            if (vmFile.test(filePath))
                acc.push(path.join(resolvedPath, filePath))
            return acc
        }, [])
    }
    else {
        return vmFile.test(resolvedPath) ? [resolvedPath] : []
    }
}