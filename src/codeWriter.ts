import { WriteStream, createWriteStream, write } from "fs";
import {
	commands,
	variableSegments,
	fixedSegments,
	asmAddSubANdOr,
	asmNegNot,
	asmEqGtLt
} from "./constants";
import { Stream } from "stream";
import path from "path";

export default class CodeWriter {
	private name: string;
	private stream: WriteStream;
	private labelsCount: number;

	constructor(outputFilePath: string) {
		this.stream = createWriteStream(outputFilePath);
		this.labelsCount = 0;
		this.name = "";
	}

	setFileName(name: string) {
		this.name = name;
		this.stream.write(`// ${name}\n`);
	}

	writeArithmetic(command: string): void {
		let asmCommand: string, specific: string;

		if ((specific = asmAddSubANdOr[command])) {
			asmCommand = "@SP\nM=M-1\nA=M\nD=M\n@SP\nA=M-1\n" + specific;
		} else if ((specific = asmNegNot[command])) {
			asmCommand = "@SP\nA=M-1\n" + specific;
		} else {
			specific = asmEqGtLt[command];
			let falseLabel: string = "FALSE_" + this.labelsCount;
			let endLabel: string = "END_" + this.labelsCount;
			asmCommand =
				"@SP\nM=M-1\nA=M\nD=M\n@SP\nA=M-1\nD=M-D\nM=-1\n" +
				`@${falseLabel}\n` +
				specific +
				`@${endLabel}\n` +
				"0;JMP\n" +
				`(${falseLabel})\n` +
				"@SP\nA=M-1\nM=0\n" +
				`(${endLabel})\n`;
			this.labelsCount++;
		}
		this.stream.write(`// ${command}\n` + asmCommand);
	}

	writePushPop(command: string, segment: string, index: number): void {
		if (command === "C_PUSH") this.writePush(segment, index);
		else this.writePop(segment, index);
	}

	private writePush(segment: string, index: number): void {
		let asmCommand: string, label: string, address: number;

		if ((label = variableSegments[segment])) {
			asmCommand =
				`@${index}\n` +
				"D=A\n" +
				`@${label}\n` +
				"A=D+M\nD=M\n@SP\nM=M+1\nA=M-1\nM=D\n";
		} else if ((address = fixedSegments[segment])) {
			address += index;
			asmCommand = `@${address}\n` + "D=M\n@SP\nM=M+1\nA=M-1\nM=D\n";
		} else if (segment === "static") {
			label = `${this.name}.${index}`;
			asmCommand = `@${label}\n` + "D=M\n@SP\nM=M+1\nA=M-1\nM=D\n";
		} else {
			// constant
			asmCommand = `@${index}\nD=A\n` + "@SP\nM=M+1\nA=M-1\nM=D\n";
		}
		this.stream.write(`// push ${segment} ${index}\n` + asmCommand);
	}

	private writePop(segment: string, index: number): void {
		let asmCommand: string, label: string, address: number;

		if ((label = variableSegments[segment])) {
			asmCommand =
				`@${index}\n` +
				"D=A\n" +
				`@${label}\n` +
				"D=D+M\n@SP\nAM=M-1\nD=D+M\nA=D-M\nM=D-A\n";
		} else if ((address = fixedSegments[segment])) {
			address += index;
			asmCommand =
				`@${address}\n` + "D=A\n@SP\nAM=M-1\nD=D+M\nA=D-M\nM=D-A\n";
		} else {
			// static
			label = `${this.name}.${index}`;
			asmCommand = "@SP\nAM=M-1\nD=M\n" + `@${label}\n` + "M=D\n";
		}
		this.stream.write(`// pop ${segment} ${index}\n` + asmCommand);
	}

	close(): void {
		this.stream.end();
	}
}
