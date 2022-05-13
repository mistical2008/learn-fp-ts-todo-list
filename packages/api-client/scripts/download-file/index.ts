import http from "http";
import fs from "fs";
import minimist from "minimist";

interface Arguments {
  url: string;
  output: string;
}

const args = minimist(process.argv.slice(2), {
  alias: { u: "url", o: "output" },
}) as unknown as Arguments;

const url = args.url;
const filePath = args.output;

const file = fs.createWriteStream(filePath);

http.get(url, (response) => {
  response.pipe(file);
});
