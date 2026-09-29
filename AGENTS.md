# Agent Guidelines & Workflow Rules

This document outlines the operational rules and best practices for AI agents working in this repository.

---

## Core Rules

### 1. Never Push Without Confirmation
- **Do NOT execute `git push`** under any circumstance without explicitly asking the user for permission and receiving their approval.
- Do NOT publish packages (`npm publish`) or create remote release tags without prior user consent.
- Keep commits local until the user explicitly requests or confirms a push.

### 2. Always Document New Features in `README.md`
- Whenever adding or updating features, configuration fields, methods, or supported patterns, **always update `README.md`**.
- Provide clear explanations, JSON/TypeScript configuration examples, and relevant code snippets for supported frameworks (Vanilla, React, Next.js, Angular, WordPress).

### 3. Always Maintain `CHANGELOG.md`
- Record all notable changes in `CHANGELOG.md` following the [Keep a Changelog](https://keepachangelog.com/) standard.
- Group updates under appropriate subsections:
  - `Added` for new features or capabilities.
  - `Changed` for changes in existing functionality.
  - `Fixed` for bug fixes.
  - `Security` for vulnerability fixes or security hardening.

### 4. Semantic Versioning for Releases
- Update version numbers accurately in `package.json`, `package-lock.json`, and `CHANGELOG.md` to ensure safe, predictable deployments:
  - **PATCH (`x.x.+1`)**: Backward-compatible bug fixes and small optimizations.
  - **MINOR (`x.+1.0`)**: Backward-compatible new features and configuration additions.
  - **MAJOR (`+1.0.0`)**: Incompatible API changes or breaking configuration modifications.

### 5. Keep Framework Examples Synchronized
- Whenever introducing or modifying configuration fields, UI components (such as floating badges), methods, or features, **always update the framework examples**:
  - `examples/vanilla-html/`: Update `consent.json` and ensure compiled bundle is fresh.
  - `examples/react-app/`: Update the React builder / configuration and components.
  - `examples/next-app/`: Update Next.js public assets, `consent.json`, and layouts.
  - `examples/angular-app/`: Update the Angular standalone `app.config.ts`.
  - `playground/`: Update the interactive playground test controls and configuration.
- Ensure that examples remain functional, modern, and accurately reflect current best practices and latest library version.

### 6. Verification Before Completion
- Always run pre-deployment checks before declaring a task complete:
  ```bash
  npm run typecheck   # Validate TypeScript types without emit
  npm run test        # Execute unit test suite
  npm run build       # Generate fresh production bundles in dist/
  ```
- Ensure zero errors and zero failing tests before handing work back to the user.
