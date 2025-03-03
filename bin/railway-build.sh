#!/usr/bin/env bash

# railway.app build - the simplest way to deploy on this platform is to put static content into `./public` directory
# Run this script from the root of the project.
pnpm run build:tailwind
next build
rm -fr public
mv out public
cd public
find . -name "*.html" -exec sh -c 'ln -s "$1" "${1%.html}"' _ {} \;
ls -al
