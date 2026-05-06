Documentation - **[https://cloud-sdk-builds.github.io](https://cloud-sdk-builds.github.io/)**

# 🟡 Cloud-SDK-Builds — Browser-Ready AWS SDK v3 via CDN

A **community-maintained** collection of browser-ready ESM builds for every `@aws-sdk/*` npm package, served via **jsDelivr** with zero bundling required.

> ⚡ Import AWS SDK v3 modules directly in the browser — no build step, no bundler, no backend proxy.

---

## ⚠️ Trademark & Affiliation Notice

This project is a **community-operated distribution** and is **not affiliated with, endorsed by, or sponsored by** Amazon Web Services or the official SDK maintainers.

"AWS", "Amazon Web Services", and related marks are trademarks of their respective owners.  
All original SDK source code remains licensed under its respective upstream license.

---

## 📚 Documentation

Full documentation, package search, and CDN URLs are available at:

**[https://cloud-sdk-builds.github.io](https://cloud-sdk-builds.github.io/)**

### Filtering by package or version

Append query parameters to the documentation URL (`https://cloud-sdk-builds.github.io`) to filter results:

- `?` query parameter 1 - **`sdk=`** your intended package name (e.g. `client-s3`)
- `?` query parameter 2 - **`version=`** the `@aws-sdk/*` package version you want (e.g. `3.1044.0`)

Both parameters are optional — omit either to browse all available options:

| Goal | URL |
|---|---|
| All packages | `https://cloud-sdk-builds.github.io` |
| Specific package | `https://cloud-sdk-builds.github.io/?sdk=client-s3` |
| Specific package + version | `https://cloud-sdk-builds.github.io/?sdk=client-s3&version=3.1044.0` |

---

## 📦 Quick Start

Use any package directly in the browser via an **import map**. No npm, no bundler.

```html
<script type="importmap">
  {
    "imports": {
      "@aws-sdk/client-s3": "https://cdn.jsdelivr.net/gh/cloud-sdk-builds/client-s3@3.1044.0/index.min.mjs"
    },
    "integrity": {
      "https://cdn.jsdelivr.net/gh/cloud-sdk-builds/client-s3@3.1044.0/index.min.mjs": "sha384-nOgf+qqvrV4aSt7mGLVFR+PjY236nMrInWz+SU7SzMyOJulGCLxoxgFxzHamiOvE"
    }
  }
</script>

<script type="module">
  import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
  // Refer to AWS SDK for JavaScript V3 documentation
</script>
```

> The example above uses `client-s3@3.1044.0`. Replace with your required package and version — find CDN URLs and SRI hashes on the [documentation site](https://cloud-sdk-builds.github.io/).

---

## 🌐 CDN URL Format

```
https://cdn.jsdelivr.net/gh/cloud-sdk-builds/{aws_service_name}@{aws_version}/index.min.mjs
```

- `{aws_service_name}` — e.g. `client-s3`, `client-dynamodb`, `client-lambda`
- `{aws_version}` — e.g. `3.1044.0`

### ⚠️ Avoid `latest` in production

The latest build URL has a **dynamically changing SRI hash** on every new release. Always pin to a specific version in production:

```
# ✅ Safe for production
https://cdn.jsdelivr.net/gh/cloud-sdk-builds/client-s3@3.1044.0/index.min.mjs

# ❌ Avoid in production
https://cdn.jsdelivr.net/gh/cloud-sdk-builds/client-s3/index.min.mjs
```

---

## 🤝 Requesting a Package

Any official `@aws-sdk/*` npm package can be built for browser CDN usage. If the one you need isn't available yet, open an issue:

```
https://github.com/cloud-sdk-builds/.github/issues
```

---

## 📜 License

Each repository follows the license terms of its upstream AWS SDK package. See the `LICENSE` file in the relevant repository.
