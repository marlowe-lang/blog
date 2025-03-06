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

## Nix Based Deployment

### Overview

In the [./nix] directory we can find two crucial files related to our deployment:

* [./nix/default.nix] - contains the nix derivation for our project which is used to build the project:
  * We use `buildNpmPackage` to build the project.
  * The main step is to invoke `npm run publish`.
* [./nix/nixos.nix] - contains the nixos module which is used to deploy the project:
  * This module assumes that `http-services` are in use and adds itself to the static pages.
  * `http-services` is a simple module defined at the `marlowe-deploy` level.

### Deployment Development

During deployment development you can be interested in both building the project and deploying it to a local machine:
* In order to quickly check the build process itself you can use `$ nix build .#default` which will build the project and create a `result` symlink to the build directory.
* If you are on NixOS machine which uses flakes you can add the web page deployment to your system by including two extra modules - here is a simple system level flake which deploys our blog on a local machine on `marlowe.localhost.com` (you should add this domain to your system `extraHosts`):
```nix
  {
    inputs = {
      nixpkgs.url = "nixpkgs/nixos-unstable";  # Or your current version
      marlowe-blog.url = "git+file:///home/paluh/projects/marlowe/blog/";
      marlowe-deploy.url = "git+file:///home/paluh/projects/marlowe/marlowe-deploy/";
    };

    outputs = { self, nixpkgs, marlowe-blog, marlowe-deploy }: {
      nixosConfigurations.apoptosis = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          ./configuration.nix
          marlowe-blog.nixosModules.default
          (import (marlowe-deploy + "/http-services.nix"))
          ({config, ...}: {
            marlowe.website."localhost" = {
              domain = "marlowe.localhost.com";
              flake = marlowe-blog;
              useSSL = false;
            };
          })
        ];
      };
    };
  }
```
