with import <nixpkgs> {}; 
let 
    ghc = haskellPackages.ghcWithPackages (pkgs: with pkgs; [hspec]);
in stdenv.mkDerivation {
        name = "javascript-sandbox";
        buildInputs = [
            pkgs.nodejs
            ghc
            pkgs.cabal-install
        ];
    }
