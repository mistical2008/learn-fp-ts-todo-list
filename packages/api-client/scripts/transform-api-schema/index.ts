import { OpenAPIObject, OperationObject } from "openapi3-ts";
import fs, { PathOrFileDescriptor } from "fs";
import path from "path";
import { pipe } from "fp-ts/lib/function";
import minimist from "minimist";

interface Arguments {
  input: string;
  output: string;
}
type Pattern = string | RegExp;
type PatternList = string[] | RegExp[];

interface Config {
  input: string;
  output: string;
  patternList: PatternList;
}

const args = minimist(process.argv.slice(2), {
  alias: { i: "input", o: "output" },
}) as unknown as Arguments;

const config: Config = {
  input: path.resolve(args.input),
  output: path.resolve(args.output),
  patternList: [/api_rest_app_/g, /api_rest_/g, /runtime_routine_/g],
};

export function readSchema(filePath: PathOrFileDescriptor): OpenAPIObject {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function replaceAll({
  pattern,
  patternList,
  replacer,
  text,
}: {
  pattern?: Pattern;
  patternList?: PatternList;
  replacer: string;
  text: string;
}): string {
  if (pattern && patternList) return text;
  if (pattern) {
    return text.replaceAll(pattern, replacer);
  }
  if (patternList) {
    patternList.forEach((p: RegExp | string) => {
      text = text.replaceAll(p, replacer);
    });
  }
  console.log("operationID: %s", text);
  return text;
}

export function transformOpIdValues(openapi: OpenAPIObject): OpenAPIObject {
  for (const path_data of Object.values(openapi.paths)) {
    const operations = Object.values(path_data) as OperationObject[];

    for (const operation of operations) {
      const operation_id = operation.operationId!;

      let new_operation_id = replaceAll({
        patternList: config.patternList,
        text: operation_id,
        replacer: "",
      });

      operation.operationId = new_operation_id;
    }
  }
  return openapi;
}

export function writeSchema({
  schema,
  filePath,
}: {
  schema: OpenAPIObject;
  filePath: PathOrFileDescriptor;
}): void {
  fs.writeFileSync(filePath, JSON.stringify(schema, null, 4));
}

writeSchema({
  schema: pipe(config.input, readSchema, transformOpIdValues),
  filePath: config.output,
});
