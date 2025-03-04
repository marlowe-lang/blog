# Marlowe Blog

## Writing a New Post

Writing with live preview:

```bash
$ nix develop
$ pnpm install
$ pnpm run dev
```

The preview by default is available at `http://localhost:3000`.

## Publishing a New Post

TODO

## Repo and Process Overview

* We use `nextra` with customized `blog` theme which is located under a `./theme` directory.
* In the `./pages` dir you can find all the markdown files which are used to generate the content.
* All `*.mdx` files are labeled by "type" which is specified at the top of each file.
* The `type` value determines where and how a given file is rendered.
