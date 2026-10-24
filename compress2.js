const {NodeIO}=require('@gltf-transform/core');
const {ALL_EXTENSIONS}=require('@gltf-transform/extensions');
const {dedup,prune,meshopt}=require('@gltf-transform/functions');
const {MeshoptEncoder}=require('meshoptimizer');
const {execFileSync}=require('child_process');
const fs=require('fs');
(async()=>{
await MeshoptEncoder.ready;
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder});
const [inp,out,max='512']=process.argv.slice(2);
const doc=await io.read(inp);
let i=0;
for(const t of doc.getRoot().listTextures()){
  const ext=t.getMimeType()==='image/jpeg'?'jpg':'png';
  const a=process.env.TMPDIR+'/tex'+i+'.'+ext,b=process.env.TMPDIR+'/tex'+i+'_s.'+ext;
  fs.writeFileSync(a,Buffer.from(t.getImage()));
  execFileSync('magick',[a,'-resize',max+'x'+max+'>',b]);
  t.setImage(new Uint8Array(fs.readFileSync(b)));i++;
}
await doc.transform(dedup(),prune(),meshopt({encoder:MeshoptEncoder}));
await io.write(out,doc);
console.log(inp.split('/').pop(),(fs.statSync(inp).size/1048576).toFixed(1),'Mo ->',(fs.statSync(out).size/1048576).toFixed(1),'Mo,',i,'textures');
})().catch(e=>console.log('ERREUR',e.message));
