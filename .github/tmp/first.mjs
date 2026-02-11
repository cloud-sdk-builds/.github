#!/usr/bin/env node
import {readFileSync,writeFileSync} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getcron() {
  const content = readFileSync(resolve(__dirname, "services.txt"), "utf8");
  const lines = content.trimEnd().split("\n");
  const item = process.env["REPO_NAME"];
  const totallines = lines.length;
  
  const index = lines.findIndex(line => line.trim() === item && line.length > 0);
  
  if (index === -1) {
    throw new Error(`Item "${item}" not found in file.`);
  }
  
  const multiplier = 1440 / totallines;
  const offset = Math.floor(multiplier * index);
  const hour = Math.min(23, Math.floor(offset / 60));
  return `${offset % 60} ${hour} * * *`;
}

const buildymlold = readFileSync(resolve(__dirname, "..","workflows","build.yml"), "utf8");

function replaceTrigger(oldcontent, mycron) {
  let updated = oldcontent.replace(
    /push:\s*\n\s*branches:\s*\n\s*-\s*'main'\s*\n\s*paths:\s*\n\s*-\s*'LICENSE'/m,
    `schedule:
    - cron: "${mycron}"`
  );
  updated = updated.replace("node ./.github/tmp/first.mjs", "");
  updated = updated.replace("GH_PAT: ${{ secrets.GH_PAT }}","");
  return updated;
}

const newbuildyml = replaceTrigger(buildymlold, getcron());

writeFileSync(resolve(__dirname, "..","workflows","build.yml"), newbuildyml);

execSync(
  `git remote set-url origin https://${process.env.GH_PAT}@github.com/${process.env.ORG_NAME}/${process.env.REPO_NAME}.git`,
  { stdio: "inherit",env:{...process.env,GH_TOKEN:process.env.GH_PAT} }
);

execSync(
  `git rm :/.github/tmp/first.mjs :/.github/tmp/services.txt && git add :/.github/workflows/build.yml && git commit -S -m "ci: update release workflow" && git push origin HEAD`,
  { stdio: "inherit" ,env:{...process.env,GH_TOKEN:process.env.GH_PAT}}
);

execSync(
  `git remote set-url origin https://github.com/${process.env.ORG_NAME}/${process.env.REPO_NAME}.git`,
  { stdio: "inherit" }
);
