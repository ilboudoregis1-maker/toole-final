const {NodeIO}=require('@gltf-transform/core');const {ALL_EXTENSIONS}=require('@gltf-transform/extensions');
const {dedup,prune,meshopt}=require('@gltf-transform/functions');const {MeshoptEncoder}=require('meshoptimizer');const {Jimp}=require('jimp');const fs=require('fs');
(async()=>{await MeshoptEncoder.ready;const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder});
const [inp,out]=process.argv.slice(2);const doc=await io.read(inp);
for(const t of doc.getRoot().listTextures()){try{const img=await Jimp.read(Buffer.from(t.getImage()));if(Math.max(img.width,img.height)>512)img.scaleToFit({w:512,h:512});
const b=await img.getBuffer('image/jpeg',{quality:70});t.setImage(new Uint8Array(b)).setMimeType('image/jpeg')}catch(e){console.log('tex ignorée',e.message)}}
await doc.transform(dedup(),prune(),meshopt({encoder:MeshoptEncoder}));await io.write(out,doc);
console.log(out,(fs.statSync(out).size/1048576).toFixed(1),'Mo')})().catch(e=>console.log('ERREUR',e.message));
