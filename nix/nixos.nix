self: { lib, config, pkgs, ... }:
let
  inherit (lib) mkOption types mapAttrs';
  inherit (pkgs) writeTextDir symlinkJoin;

  websiteOptions = { name, ... }: {
    options = {
      domain = mkOption {
        type = types.str;
        default = name;
        description = "The domain to host the website";
      };

      flake = mkOption {
        type = types.attrs;
        default = self;
        description = "A Nix Flake containing the website";
      };

      useSSL = mkOption {
        type = types.bool;
        default = true;
        description = "Whether to use SSL for the website";
      };
    };
  };

  mkRoot = name: { flake, ... }:
    builtins.trace "flake.packages.${pkgs.system}: ${builtins.toJSON flake.packages.${pkgs.system}}.default" flake.packages.${pkgs.system}.default;

in
{
  options = {
    marlowe.website = mkOption {
      type = types.attrsOf (types.submodule websiteOptions);
      default = { };
      description = "Marlowe website instances to run";
    };
  };

  config = {
    http-services.static-sites = mapAttrs'
      (name: website: {
        name = "marlowe-website-${name}";
        value = {
          inherit (website) domain;
          useSSL = website.useSSL;
          root = mkRoot name website;
        };
      })
      config.marlowe.website;
  };
}
