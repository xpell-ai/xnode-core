# Changelog

## [2.0.8] — 2026-11-13 (unreleased candidate)

- Compared with public 2.0.7 declarations: _XNUtils extends the public Core _XUtils class rather than a narrow local declaration shim.
- Coordinate Node event, settings and utility infrastructure with Core 2.0.8.
- Retain the existing Node-only module boundary.

Compatibility: internal workspace specifications are retained. No public API redesign, PostgreSQL backend, persistence migration or automatic SQLite activation is introduced by this preparation.

Validation: package builds and available tests are recorded in the coordinated Gate 2 report. Gate 3 must verify the exact packed artifacts and clean-consumer compatibility before publication. These entries describe verified checked-out capabilities and release-preparation deltas; they do not claim that every capability is new relative to the last npm artifact.

