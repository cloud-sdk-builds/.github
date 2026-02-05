## 🚀 Release: `@aws-sdk/{repoName}` v{repoVersion}

This release publishes the **{repoVersion}** build of the AWS SDK for JavaScript v3 package **`@aws-sdk/{repoName}`** as a **browser-ready ES module**, optimized for direct CDN consumption.

### 🌐 CDN ([jsDelivr](https://www.jsdelivr.com))

[Use this package directly in the browser without any bundling:](https://cdn.jsdelivr.net/gh/{orgName}/{repoName}@{repoVersion}/index.min.mjs)

URL

```text
https://cdn.jsdelivr.net/gh/{orgName}/{repoName}@{repoVersion}/index.min.mjs
```

SRI

```text
{SRI_SHA}
```

HTML

```html
<script src="https://cdn.jsdelivr.net/gh/{orgName}/{repoName}@{repoVersion}/index.min.mjs"></script>
```

HTML + SRI

```html
<script src="https://cdn.jsdelivr.net/gh/{orgName}/{repoName}@{repoVersion}/index.min.mjs" integrity="{SRI_SHA}" crossorigin="anonymous"></script>
```

ImportMap

```html
<script type="importmap">
      {
        "imports": {
            "@aws-sdk/{repoName}": "https://cdn.jsdelivr.net/gh/{orgName}/{repoName}@{repoVersion}/index.min.mjs"
        },
          "integrity": {
            "https://cdn.jsdelivr.net/gh/{orgName}/{repoName}@{repoVersion}/index.min.mjs": "{SRI_SHA}"
        }
      }
</script>
```

### 📦 [npm Source](https://www.npmjs.com)

[Official source package published on npm:](https://www.npmjs.com/package/@aws-sdk/{repoName}/v/{repoVersion})

```text
https://www.npmjs.com/package/@aws-sdk/{repoName}/v/{repoVersion}
```

### 📘 Documentation

[AWS SDK for JavaScript v3 documentation:](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/introduction/)

```text
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/introduction/
```

### 📄 [Package README](https://github.com/{orgName}/{repoName}/blob/refs/tags/{repoVersion}/.github/README.md)

Usage instructions and CDN examples:

```text
https://github.com/{orgName}/{repoName}/blob/refs/tags/{repoVersion}/.github/README.md
```

---

### 🔐 Notes

* This release mirrors the official **AWS SDK v3 {repoVersion}** package.
* No functional changes are introduced beyond the upstream version update.
* For production use, **pin to this exact version** instead of using `latest`.
