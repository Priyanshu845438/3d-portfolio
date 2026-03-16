const crypto = require("crypto");
const fs = require("fs");

const decryptFile = (inputFile, password) => {
  const key = crypto.createHash("sha256").update(password).digest();
  const encryptedData = fs.readFileSync(inputFile);
  const iv = encryptedData.slice(0, 16);
  const data = encryptedData.slice(16);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  return decrypted;
};

try {
  const buffer = decryptFile("public/models/character.enc", "MyCharacter12");
  
  // Read GLB Header
  const magic = buffer.readUInt32LE(0);
  const version = buffer.readUInt32LE(4);
  const totalLength = buffer.readUInt32LE(8);

  if (magic !== 0x46546c67) {
    console.error("Not a valid GLB file!");
    process.exit(1);
  }

  // Read Chunk 0 header (JSON)
  const chunkLength = buffer.readUInt32LE(12);
  const chunkType = buffer.readUInt32LE(16);

  if (chunkType !== 0x4E4F534A) {
    console.error("Chunk 0 is not JSON!");
    process.exit(1);
  }

  const jsonString = buffer.toString("utf8", 20, 20 + chunkLength);
  const gltf = JSON.parse(jsonString);

  console.log("=== NODES ===");
  if (gltf.nodes) {
    gltf.nodes.forEach((node, i) => {
      console.log(`[${i}] Node: ${node.name || "unnamed"}`, node.mesh !== undefined ? `(Mesh: ${node.mesh})` : "");
    });
  }

  console.log("\n=== MESHES ===");
  if (gltf.meshes) {
    gltf.meshes.forEach((mesh, i) => {
      console.log(`[${i}] Mesh: ${mesh.name || "unnamed"}`);
      if (mesh.primitives) {
        mesh.primitives.forEach(p => {
          if (p.targets) {
            console.log(`  -> Targets/Blendshapes found! Count: ${p.targets.length}`);
          }
        });
      }
    });
  }

} catch (err) {
  console.error("Decryption failed:", err);
}
