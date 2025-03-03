# Marlowe Blog

```
$ nix develop
$ pnpm run dev
```

## Repo and Process Overview

* We use `nextra` with customized `blog` theme which is located under a `./theme` directory.
* In the `./pages` dir you can find all the markdown files which are used to generate the content.
* All `*.mdx` files are labeled by "type" which is specified at the top of each file.
* The `type` value determines where and how a given file is rendered.
