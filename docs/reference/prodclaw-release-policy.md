---
summary: "ProdClaw GA and LTS release maturity policy"
title: "ProdClaw release policy"
read_when:
  - Planning a ProdClaw GA or LTS release
  - Reviewing upstream OpenClaw intake for production risk
  - Checking ProdClaw version and release channel rules
---

ProdClaw is a production-stability downstream of OpenClaw. It uses explicit
release maturity channels instead of tracking OpenClaw's daily release stream.

## Channels

**GA** is the current production-ready channel.

- GA releases are cut at most every two weeks.
- GA candidates must be based on an upstream OpenClaw release at least 10 days
  old.
- GA may be delayed when community reports, local tests, or package acceptance
  show regression risk.

**LTS** is the conservative channel.

- LTS releases are promoted quarterly from a proven GA release.
- LTS receives security fixes and critical regression backports.
- LTS should avoid feature intake unless the feature is required to fix a
  production regression.

## Versioning

ProdClaw uses SemVer:

- GA and LTS tag: `vMAJOR.MINOR.PATCH`
- Release candidate tag: `vMAJOR.MINOR.PATCH-rc.N`

ProdClaw release tags start at major version 1. Do not use upstream OpenClaw
date versions as ProdClaw release versions. The upstream OpenClaw version, tag,
commit, and release date belong in release metadata. Keep
`PRODCLAW_UPSTREAM.json` current so packaged release metadata can distinguish
ProdClaw's SemVer package version from the upstream OpenClaw package version it
is based on.

## Intake Gate

Each upstream intake PR must include:

- upstream OpenClaw version, tag, commit, and release date;
- proof that the upstream release is at least 10 days old;
- changelog summary;
- source diff summary;
- config schema/default diff;
- package contents diff;
- community regression scan;
- GA or LTS impact statement.

Review high-risk surfaces first: customer channels, delivery, streaming, tools,
commands, config mutation, gateway restart/update, cron, sessions, plugins, MCP,
and credentials.

## Release Gate

A release must pass:

- build and focused runtime tests;
- config schema/default snapshot review;
- package acceptance from the produced tarball;
- release metadata generation;
- artifact checksum generation.

Release artifacts must be built from a clean checkout and attached to the
GitHub Release with checksums. Provenance or attestation should be attached when
available.
