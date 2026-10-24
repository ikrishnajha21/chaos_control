class FileReaderPolyfill {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(buf => {
      this.result = buf;
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then(buf => {
      this.result = 'data:' + (blob.type || 'application/octet-stream') + ';base64,' + Buffer.from(buf).toString('base64');
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
}
globalThis.FileReader = FileReaderPolyfill;

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';

const exporter = new GLTFExporter();
const scene = new THREE.Scene();
const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0xff0000 }));
scene.add(box);
exporter.parse(scene, (gltf) => {
  console.log('SUCCESS! byteLength =', gltf.byteLength);
  fs.writeFileSync('test.glb', Buffer.from(gltf));
}, (err) => {
  console.error('Export error:', err);
}, { binary: true });
