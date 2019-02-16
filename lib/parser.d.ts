export default class Parser {
    lines: string[];
    constructor(path: string);
    hasMoreCommands(): boolean;
    advance(): void;
    commandType(): number;
    arg1(): string;
    arg2(): number;
}
