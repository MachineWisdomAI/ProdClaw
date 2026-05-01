# ProdClaw

ProdClaw is a production-stability downstream of OpenClaw. It exists to make
OpenClaw usable for production operators who need slower intake, safer defaults,
repeatable releases, and explicit maturity channels.

ProdClaw is not a private deployment product. Keep customer-specific operations,
private bridges, fleet topology, hostnames, tenant names, and managed-service
runbooks out of this repository.

## Boundary

ProdClaw owns generic runtime stability:

- curated upstream intake from OpenClaw;
- safer default behavior for customer-visible channels;
- source-level review of config schema and default changes;
- package acceptance and release provenance;
- GA and LTS release channels.

Private deployments built on ProdClaw own their own infrastructure:

- cloud hosts, images, bastions, and fleet rollout;
- tenant lifecycle and isolation;
- private OAuth/account bridges;
- customer-specific prompts, policies, and support workflows;
- operational monitoring and incident runbooks.

If a change names a private deployment, customer, host, or bridge, it belongs in
that deployment repository, not in ProdClaw. If a change makes OpenClaw safer or
more predictable for any production operator, it can belong here.

## Release Channels

ProdClaw has two maturity channels.

**GA** is the current production-ready channel. GA releases are cut at most every
two weeks, and only from upstream OpenClaw releases that are at least 10 days
old. A GA release may be delayed when community signal or local evidence shows
regression risk.

**LTS** is the conservative channel. LTS releases are promoted quarterly from a
proven GA release and receive only security fixes and critical regression
backports. LTS is for operators who value stability over new OpenClaw features.

ProdClaw uses SemVer tags:

- `vMAJOR.MINOR.PATCH` for GA and LTS releases;
- `vMAJOR.MINOR.PATCH-rc.N` for release candidates.

ProdClaw release tags start at major version 1. Do not use upstream OpenClaw
date versions as ProdClaw versions. Record upstream OpenClaw provenance in
release metadata instead. Keep `PRODCLAW_UPSTREAM.json` current so release
artifacts carry the upstream package version that the ProdClaw release is based
on.

## Upstream Intake

Every upstream intake starts as an explicit PR. The PR must include:

- upstream OpenClaw version, tag, commit, and release date;
- confirmation that the upstream release is at least 10 days old;
- changelog summary and source diff summary;
- config schema/default diff for high-risk runtime surfaces;
- package contents diff;
- community regression scan;
- GA or LTS impact statement.

High-risk surfaces include channels, delivery, streaming, tools, commands,
config mutation, gateway restart/update, cron, sessions, plugins, MCP, and
credentials.

## Hardening Defaults

ProdClaw should prefer safe defaults for production-visible behavior. New
customer-visible output, tool progress, raw tool-call details, channel config
writes, restart controls, and operator command surfaces should be opt-in unless
there is a reviewed production reason to expose them by default.

Any risky boolean defaulting to `true` needs an explicit allowlist entry, tests,
and reviewer justification.
