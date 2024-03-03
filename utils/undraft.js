import process from "process";
import { Octokit } from "octokit";

const gh_token = process.env["GH_TOKEN"];
const [owner, repo] = process.env["REPO"].split("/");

const gh = new Octokit({ auth: gh_token });

gh.rest.repos
  .updateRelease({
    owner,
    repo,
    release_id: parseInt(process.env["R_ID"]),
    draft: false,
  })
  .then(({ data: { name } }) => {
    console.log(`Undrafted ${name}`);
  });
