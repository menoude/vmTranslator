interface stringDict {
    [key: string]: string
}

interface numDict {
    [key: string]: number
}

export const commands: stringDict = {
    add: 'C_ARITHMETIC',
    sub: 'C_ARITHMETIC',
    neg: 'C_ARITHMETIC',
    eq: 'C_ARITHMETIC',
    gt: 'C_ARITHMETIC',
    lt: 'C_ARITHMETIC',
    and: 'C_ARITHMETIC',
    or: 'C_ARITHMETIC',
    not: 'C_ARITHMETIC',
    push: 'C_PUSH',
    pop: 'C_POP'
    // C_LABEL: 4,
    // C_GOTO: 5,
    // C_IF: 6,
    // C_FUNCTION: 7,
    // C_RETURN: 8,
    // C_CALL: 9
}

export const variableSegments: stringDict = {
    local: 'LCL',
    argument: 'ARG',
    this: 'THIS',
    that: 'THAT'
}

export const fixedSegments: numDict = {
    temp: 5,
    pointer:3 
}

export const asmAddSubANdOr: stringDict = {
    add: 'M=D+M\n',
    sub: 'M=M-D\n',
    and: 'M=D&M\n',
    or: 'M=D|M\n'
}
export const asmNegNot: stringDict = {
    neg: 'M=-M\n',
    not: 'M=!M\n'
}

export const asmEqGtLt: stringDict = {
    eq: 'D;JNE\n',
    gt: 'D;JLE\n',
    lt: 'D;JGE\n'
}