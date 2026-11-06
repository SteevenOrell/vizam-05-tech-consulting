#!/usr/bin/env node
// Regex secret scan of the working tree (tracked + untracked, not ignored) and the full git history.
// Prints file paths, commits and rule names only — never the matched values.
// Usage: node scripts/secret-scan.mjs   (exit code 1 when anything is found)
import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";

const rules = [
  ["private-key", /-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/],
  ["aws-access-key", /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/],
  ["github-token", /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}\b|\bgithub_pat_[A-Za-z0-9_]{60,}\b/],
  ["openai-key", /\bsk-(?:proj-)?[A-Za-z0-9_-]{32,}\b/],
  ["anthropic-key", /\bsk-ant-[A-Za-z0-9_-]{20,}\b/],
  ["stripe-key", /\b(?:sk|rk)_live_[A-Za-z0-9]{20,}\b/],
  ["slack-token", /\bxox[abpors]-[A-Za-z0-9-]{10,}\b/],
  ["google-api-key", /\bAIza[0-9A-Za-z_-]{35}\b/],
  ["pixabay-key", /\b\d{6,10}-[0-9a-f]{25}\b/],
  ["elevenlabs-key", /\bsk_[0-9a-f]{48}\b/],
  ["vercel-token", /\bvercel_[A-Za-z0-9]{24,}\b/i],
  ["jwt", /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/],
  [
    "assigned-secret",
    /\b(?:api[_-]?key|secret|access[_-]?key|auth[_-]?token|password|client[_-]?secret|UNSPLASH_ACCESS_KEY|PIXABAY_API_KEY|ELEVENLABS_API_KEY|OPENAI_API_KEY)\b\s*[:=]\s*["']?[A-Za-z0-9_\-/+]{16,}/i,
  ],
];
const forbiddenPaths = [/(^|\/)\.env(\.|$)(?!example)/, /\.pem$/, /\.p12$/, /(^|\/)\.secrets\//, /media\.env$/, /service-account.*\.json$/i];
const binary = /\.(webp|png|jpe?g|gif|ico|woff2?|ttf|zip|pdf)$/i;

const git = (args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 512 * 1024 * 1024 });
const findings = [];

// 1. Working tree
const files = git(["ls-files", "--cached", "--others", "--exclude-standard"]).split("\n").filter(Boolean);
for (const f of files) {
  if (forbiddenPaths.some((r) => r.test(f))) findings.push(`tree: forbidden file path ${f}`);
  if (binary.test(f) || f === "package-lock.json") continue;
  let text;
  try {
    if (statSync(f).size > 2_000_000) continue;
    text = readFileSync(f, "utf8");
  } catch {
    continue;
  }
  for (const [name, re] of rules) if (re.test(text)) findings.push(`tree: ${name} in ${f}`);
}

// 2. Full history (all refs): added lines only
const log = git(["log", "--all", "-p", "--no-color", "--unified=0", "--format=__COMMIT__ %h"]);
let commit = "";
let file = "";
for (const line of log.split("\n")) {
  if (line.startsWith("__COMMIT__ ")) commit = line.slice(11);
  else if (line.startsWith("+++ b/")) {
    file = line.slice(6);
    if (forbiddenPaths.some((r) => r.test(file))) findings.push(`history ${commit}: forbidden file path ${file}`);
  } else if (line.startsWith("+") && !line.startsWith("+++") && !binary.test(file) && file !== "package-lock.json") {
    for (const [name, re] of rules) if (re.test(line)) findings.push(`history ${commit}: ${name} in ${file}`);
  }
}

const unique = [...new Set(findings)];
const commits = git(["rev-list", "--all", "--count"]).trim();
console.log(`Secret scan: ${files.length} files in tree, ${commits} commits in history, ${rules.length} rules.`);
if (unique.length) {
  console.log(`FOUND ${unique.length} potential secret(s):`);
  for (const f of unique) console.log(`  - ${f}`);
  process.exit(1);
}
console.log("No secrets found.");
