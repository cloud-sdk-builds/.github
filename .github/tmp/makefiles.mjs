#!/usr/bin/env node

import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readdirSync, readFileSync } from "node:fs";
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repodir = resolve(join(__dirname, "..", ".."));
const templatedir = resolve(join(__dirname, "..", "template"));

const entries = readdirSync(templatedir, { 
  recursive: true, 
  withFileTypes: true 
});

const templatefiles = entries
  .filter(e => e.isFile())
  .map(e => ({
    source: join(e.parentPath, e.name),
    dest: join(e.parentPath.replace(templatedir,repodir),e.name)
  }));

  const data = readFileSync(resolve(join(__dirname,"..","..","index.min.mjs")), "utf8");

  const replacements = {
    '{repoName}': process.env["REPO_NAME"],
    '{repoVersion}': process.env["REPO_VERSION"],
    "{orgName}": process.env["ORG_NAME"],
    "{SRI_SHA}":`sha384-${createHash("sha384").update(data).digest("base64")}`
  };

  await Promise.all(
    templatefiles.map(async ({ source, dest }) => {
      let content = await readFile(source, 'utf8');
      
      for (const [key, value] of Object.entries(replacements)) {
        content = content.replaceAll(key, value);
      }
      
      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, content, 'utf8');
    })
  )