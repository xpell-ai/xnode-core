# @xpell/node-core

## 2.0.8 release candidate

Target publication date: **13 November 2026**; this candidate has not been published.
Use the coordinated 2.0.8 runtime dependencies. See [CHANGELOG](./CHANGELOG.md)
for package changes and qualification limits; [LICENSE](./LICENSE) contains the MIT terms.

@xpell/node-core provides the shared Node.js infrastructure used by Xpell server runtimes. It is not a full server runtime; it contains small reusable building blocks that higher-level packages such as @xpell/node can compose.

## What It Exports

- XEventManager / _xem: a Node-aware adapter over the @xpell/core event manager, with an optional Node EventEmitter bridge.
- XSettings / Settings / _xs: file-backed JSON settings stored under <work_folder>/settings/server-settings.json.
- XUtils / _xu / _XNUtils: Node utility helpers for folder creation, path joining, recursive directory copy, base64 text encoding, and prompt normalization.

## Install

```bash
pnpm add @xpell/node-core @xpell/core
```

@xpell/core is a peer dependency and should resolve to the same runtime version used by the rest of the Xpell workspace.

## Usage

```ts
import { _xem, _xs, _xu } from "@xpell/node-core";

_xem.on("settings:update", (settings) => {
  console.log("settings updated", settings);
});

_xs.init("./work");
_xs.ensurePath("server.port", 3000);

_xu.checkFolders(["./work/cache"]);
```

## Package Role

@xpell/node-core should stay focused on portable Node infrastructure:

- event dispatch adapters;
- file-backed settings;
- small filesystem, path, and text utilities.

It should not own server composition, web routing, XDB bootstrap, ServerXVM persistence, Wormholes transport, XAI providers, FlowManager execution, EntityManager behavior, or XVibe orchestration. Those responsibilities belong in higher-level packages.

## Build

```bash
pnpm build
```

The package is ESM-only and targets Node.js 14 or newer.

## License

MIT
