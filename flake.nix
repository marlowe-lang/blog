{
  description = "Marlowe Blog";

  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    pre-commit-hooks-nix.url = "github:hercules-ci/pre-commit-hooks.nix/flakeModule";
    pre-commit-hooks-nix.inputs.nixpkgs.follows = "nixpkgs";
    treefmt-nix.url = "github:numtide/treefmt-nix";
  };

  outputs = inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; }
      {
        imports = [
          inputs.pre-commit-hooks-nix.flakeModule
          inputs.treefmt-nix.flakeModule
        ];
        systems = [ "x86_64-linux" "aarch64-darwin" ];
        perSystem = { config, self', inputs', pkgs, ... }: {
          treefmt = {
            projectRootFile = "flake.nix";
            flakeFormatter = true;
            programs = {
              prettier = {
                enable = true;
              };
            };
          };

          devShells.default =
            let
              name = "marlowe-blog";
            in pkgs.mkShell {
              nativeBuildInputs = [
                config.treefmt.build.wrapper
              ]
              ;
              shellHook = ''
                echo 1>&2 "Welcome to the development shell!"
                export PS1='\[\033[1;32m\][${name}:\w]\$\[\033[0m\] '
              '';
              name = name;
              packages = with pkgs; [
                nodejs
                html-tidy
                nodePackages.pnpm
                nodePackages.typescript
                nodePackages.typescript-language-server
                python3Packages.pypdf2
              ];
            };
        };
        flake = { };
      };
}
