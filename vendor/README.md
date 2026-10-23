# React Hook Form source distribution

`react-hook-form-7.65.0.tgz` contains the official MIT-licensed source from
[React Hook Form v7.65.0](https://github.com/react-hook-form/react-hook-form/tree/v7.65.0)
(commit `1ebe316f71eb90ca6bf4c55c0881754f2d868ccf`), its license, TypeScript declarations,
and locally compiled ESM/CommonJS bundles. No library source changes were made.

The npm registry was inaccessible in the build environment, so the tagged source
was retrieved using the GitHub connector and compiled using TypeScript 5.9 and
Vite 8. The local archive keeps installation reproducible without a substitute library.

To use the standard npm distribution when registry access is available:

```sh
npm install react-hook-form@7.65.0
```

Then remove the unused archive and this directory. `SOURCE.md` inside the archive
records its provenance; `src/` contains the original source for inspection.
