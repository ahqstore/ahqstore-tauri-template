import process from "process";
import { join } from "path";
import { Octokit } from "octokit";
import { readFileSync } from "fs";

const { version } = JSON.parse(
  // eslint-disable-next-line no-undef
  readFileSync(join("..", "package.json")).toString()
);

const gh_token = process.env["GH_TOKEN"];
const [owner, repo] = process.env["REPO"].split("/");

const gh = new Octokit({ auth: gh_token });

gh.rest.repos
  .createRelease({
    owner,
    repo,
    tag_name: `v${version}`,
    draft: true,
  })
  .then(({ data: { id } }) => {
    console.log(`r_id=${id}`);
  });
