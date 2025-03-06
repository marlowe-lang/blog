{ repoRoot, pkgs, lib,  ... }:

pkgs.buildNpmPackage {
  pname = "marlowe-website";
  version = "0.1.0";
  npmInstallFlags = [ "--include=dev" ];

  src = lib.sourceByRegex ../. [
    "^public.*"
    "^theme.*" 
    "^pages.*"
    "^components.*"
    "^package-lock.json$"
    "^package.json$"
    "^next.config.js$"
    "^tsconfig.json$"
    "^tsup.config.ts$"
    "^tailwind.config.js$"
    "^postcss.config.mjs$"
  ];

  npmDepsHash = import ./gen/npm-deps-hash.nix;

  # Next.js requires this during build
  NODE_ENV = "production";

  buildPhase = ''
    export HOME=$(mktemp -d)
    npm run build:all
    NEXT_TELEMETRY_DISABLED=1 ./node_modules/.bin/next build
  '';

  installPhase = ''
    mkdir -p $out
    cp -r out/* $out/
  '';

  # These are needed because we handle the build and install phases ourselves
  dontNpmBuild = true;
  dontNpmInstall = false;
}
