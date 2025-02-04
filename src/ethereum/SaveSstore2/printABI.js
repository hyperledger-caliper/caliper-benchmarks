const fs = require("fs");
const path = require("path");

async function main() {
    // Hardhat writes artifact here:
    // artifacts/contracts/Anchor.sol/Anchor.json
    const artifactPath = path.join(__dirname, "artifacts", "contracts", "SaveSstore2.sol", "SaveSstore2.json");

    const raw = fs.readFileSync(artifactPath, "utf8");
    const artifact = JSON.parse(raw);

    // Print entire artifact to stdout
    console.log("===== ARTIFACT (STDOUT) =====");
    console.log(JSON.stringify(artifact, null, 2));

    // Also write it to a file named AnchorArtifact.json
    fs.writeFileSync(
        "SaveSstore2.json",
        JSON.stringify(artifact, null, 2),
        "utf8"
    );
    console.log("\nWrote artifact to AnchorArtifact.json");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
