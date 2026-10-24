const {NodeIO}=require('@gltf-transform/core');const {EXTMeshoptCompression}=require('@gltf-transform/extensions');
const {dedup,prune,meshopt}=require('@gltf-transform/functions');const {MeshoptEncoder}=require('meshoptimizer');
(async()=>{await MeshoptEncoder.ready;const io=new NodeIO().registerExtensions([EXTMeshoptCompression]).registerDependencies({'meshopt.encoder':MeshoptEncoder});
const [inp,out]=process.argv.slice(2);const doc=await io.read(inp);await doc.transform(dedup(),prune(),meshopt({encoder:MeshoptEncoder}));await io.write(out,doc);
const fs=require('fs');console.log('avant',(fs.statSync(inp).size/1048576).toFixed(1),'Mo | après',(fs.statSync(out).size/1048576).toFixed(1),'Mo')})().catch(e=>console.log('ERREUR',e.message));
