import { exec } from "child_process";
import minimist from "minimist";

interface Arguments {
  input: string;
  output: string;
  config: string;
}

const args = minimist(process.argv.slice(2), {
  alias: { i: "input", o: "output", c: "config" },
}) as unknown as Arguments;

const command = `
  docker run --rm \
      -v ${process
        .cwd()
        .toString()}:/local openapitools/openapi-generator-cli generate \
      -i /local/${args.input} \
      -g typescript-axios \
      -o /local/${args.output} \
      --skip-validate-spec \
      ${args.config ? `-c /local/${args.config}` : ""}
`;

function main(): void {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });

  exec(
    `sudo chown -R ${process.env.USER}:${process.env.USER} ./local/${args.output}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      console.log(stderr);
    }
  );
}

main();
