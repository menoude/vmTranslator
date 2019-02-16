interface stringDict {
    [key: string]: string
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

export const memorySegments: stringDict = {
    local: 'LCL',
    argument: 'ARG',
    this: 'THIS',
    that: 'THAT',
}