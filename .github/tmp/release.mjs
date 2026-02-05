#!/usr/bin/env node

import {readFileSync,existsSync,writeFileSync} from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import semver from "semver";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ORG_NAME = process.env.ORG_NAME;
const repoName = process.env.REPO_NAME;
const lastFile = resolve(join(__dirname,"LAST_VERSION.txt"));
const versionsFile = resolve(join(__dirname,"versions.json"));

const last = existsSync(lastFile) ? readFileSync(lastFile, "utf8").trim() : "2.9.9";
const versions = JSON.parse(readFileSync(versionsFile, "utf8"));
const toProcess = versions.filter(v => semver.valid(v) && semver.gt(v, last) && !semver.prerelease(v)).sort(semver.compare);

for (const version of toProcess) {
	try {
        writeFileSync(lastFile, version);
        writeFileSync(resolve(join(__dirname,"entry.mjs")),`export * from "@aws-sdk/${repoName}";`);
        writeFileSync(resolve(join(__dirname,"package.json")),`{
    "name": "${repoName}",
    "description": "AWS SDK Javascript V3 - ${repoName} for Browser",
    "version": "${version}",
    "scripts":{
        "build":"webpack"
    },
    "dependencies": {
        "@aws-sdk/${repoName}":"${version}"
    },
    "devDependencies": {
        "webpack": "5.104.1",
        "webpack-cli": "6.0.1"
    },
    "type": "module"
}`);
        execSync(`${resolve(join(__dirname,"release.sh"))}`, {
            env: {
                ...process.env,
                REPO_VERSION: version,
                REPO_NAME: repoName,
                ORG_NAME: ORG_NAME
            }
        });
	} catch {
		continue;
	}
}