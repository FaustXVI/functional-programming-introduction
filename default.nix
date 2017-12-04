with import <nixpkgs> {}; {
    nodeEnv = stdenv.mkDerivation {
        name = "javascript-sandbox";
        buildInputs = [
            pkgs.nodejs
            pkgs.ghc
            pkgs.cabal-install
        ];
    };
}
