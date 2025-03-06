{
  # inputs = {
  #   nixpkgs.url =
  #     "github:nixos/nixpkgs/25.05beta755230.73cf49b8ad83";
  # };
  # This did not work:
  inputs.nixpkgs.url = "path:/nix/store/1qf2d34djfxasmlywglc4kv123nqmjvx-nixos/nixos";
  # "path:/nix/var/nix/profiles/per-user/root/channels/nixos";

  outputs = { self, nixpkgs, ... }: {
    nixosConfigurations.test = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        (import ../nix/nixos.nix self)
        ({ ... }: {
          services.marlowe.website."local-test" = {
            domain = "localhost";
            flake = self;
            package = (import ../nix/default.nix) {
              inherit (nixpkgs) lib;
              pkgs = nixpkgs.legacyPackages.x86_64-linux;
              inherit self;
              system = "x86_64-linux";
            };
          };

          # marlowe.runners."local-test" = {
          #   domain = "localhost";
          #   runtime-instance = "test";
          #   flake = self;
          # };
          # marlowe.token-plans."local-test" = {
          #   domain = "localhost";
          #   runtime-instance = "test"; 
          #   flake = self;
          # };
        })
      ];
      specialArgs = { inherit self; };
    };
  };
}
