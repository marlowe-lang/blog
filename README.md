# Marlowe Website

The official website and blog for the Marlowe Language and platform.

## Quick Start

Writing with live preview:

```bash
$ nix develop
$ pnpm install
$ pnpm run dev
```

The preview by default is available at `http://localhost:3000`.

## Publishing a New Post

Currently there is no fully automated publishing pipeline so in order to publish a post:

1. Write a new post in the `./pages` directory
2. Commit and push the changes
3. Once merged to `main`, either:
  - Notify the team to publish your content, or
  - Deploy yourself using the `marlowe-deploy` repository:
    ```bash
    $ nix develop
    $ nix flake update --input marlowe-website
    $ redeploy-hetzner
    ```

## Project Structure

- Uses `nextra` with customized `blog` theme in `./theme` directory
- Content markdown files located in `./pages` directory
- All `*.mdx` files require a "type" specification that determines rendering

## Nix Deployment

### Build Configuration

The [./nix/default.nix](./nix/default.nix) file contains the build configuration:
  - Uses `buildNpmPackage` to build the project
  - Main build step executes `npm run publish`


### Deployment Configuration
The [./nix/nixos.nix](./nix/nixos.nix) file contains the NixOS module:
  - Integrates with `http-services` for static page serving
  - `http-services` module is defined at `marlowe-deploy` level

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
