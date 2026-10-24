import fs from 'fs';
import path from 'path';

// Polyfill FileReader for Three.js GLTFExporter in Node.js
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

const T = THREE;
const PI = Math.PI;

function mk(c, r, m, o) {
  const params = Object.assign({
    color: new T.Color(c),
    roughness: r,
    metalness: m
  }, o || {});
  if (params.emissive) {
    params.emissive = new T.Color(params.emissive);
  }
  return new T.MeshStandardMaterial(params);
}

function rr(w, h, r) {
  const s = new T.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function at(o, p, x, y, z) {
  o.position.set(x || 0, y || 0, z || 0);
  p.add(o);
  return o;
}

function P(w, h, d, m, p, x, y, z, name) {
  const b = Math.min(d * 0.28, 0.005);
  const g = new T.ExtrudeGeometry(rr(w - 2 * b, h - 2 * b, Math.min(w, h) * 0.18), {
    depth: d - 2 * b,
    bevelEnabled: true,
    bevelThickness: b,
    bevelSize: b,
    bevelSegments: 2
  });
  g.translate(0, 0, -(d - 2 * b) / 2);
  const mesh = new T.Mesh(g, m);
  if (name) mesh.name = name;
  return at(mesh, p, x, y, z);
}

function C(rt, rb, h, m, p, x, y, z, sz, name) {
  const o = new T.Mesh(new T.CylinderGeometry(rt, rb, h, 24), m);
  if (sz) o.scale.z = sz;
  if (name) o.name = name;
  return at(o, p, x, y, z);
}

function S(r, m, p, x, y, z, sx, sy, sz, name) {
  const o = new T.Mesh(new T.SphereGeometry(r, 24, 16), m);
  o.scale.set(sx || 1, sy || 1, sz || 1);
  if (name) o.name = name;
  return at(o, p, x, y, z);
}

function side(r, rt, h, m, p, x, y, z, name) {
  const o = C(r, r, h, m, p, x, y, z, null, name);
  o.rotation.z = PI / 2;
  return o;
}

// ==========================================
// BUILD CRIMSON WRAITH
// ==========================================
function buildCrimsonWraith() {
  const M = {
    blk: mk(0x17191d, 0.55, 0.3),
    suit: mk(0x24262b, 0.88, 0.02),
    red: mk(0xc9183a, 0.38, 0.2),
    lin: mk(0xb01632, 0.9, 0, { side: T.DoubleSide }),
    hw: mk(0x343840, 0.4, 0.8),
    rub: mk(0x0d0d0f, 0.9, 0),
    mask: mk(0x0a0b0d, 0.35, 0.3),
    vis: mk(0x050506, 0.15, 0.5),
    hood: mk(0x17191d, 0.8, 0.05, { side: T.DoubleSide }),
    slit: mk(0xc9183a, 0.4, 0, { emissive: 0x5a0a18, emissiveIntensity: 1.5 })
  };

  const character = new T.Group();
  character.name = "CrimsonWraith";

  // Root node that rotates model 180 degrees around Y so front faces Godot -Z
  const root = new T.Group();
  root.name = "CharacterRoot";
  root.rotation.y = PI;
  character.add(root);

  // ---- Torso / Pelvis Group
  const torso = new T.Group();
  torso.name = "Torso";
  root.add(torso);

  C(0.15, 0.14, 0.16, M.suit, torso, 0, 1.0, 0, 0.72, "Suit_Lower");
  C(0.17, 0.13, 0.38, M.suit, torso, 0, 1.25, 0, 0.66, "Suit_Upper");
  [1.12, 1.165, 1.21].forEach((y, i) => P(0.2 - i * 0.004, 0.038, 0.03, M.blk, torso, 0, y, 0.1, `AbPlate_${i}`));
  P(0.27, 0.2, 0.05, M.blk, torso, 0, 1.37, 0.11, "Chest_Shell");
  P(0.05, 0.3, 0.025, M.red, torso, 0, 1.34, 0.14, "Crimson_Centre_Strip");
  [1.3, 1.36].forEach((y, yi) => [1, -1].forEach((s, si) => P(0.06, 0.014, 0.02, M.red, torso, s * 0.1, y, 0.14, `Chest_Accent_${yi}_${si}`)));
  P(0.3, 0.06, 0.05, M.blk, torso, 0, 1.5, 0.07, "Collar_Plate");
  P(0.22, 0.2, 0.04, M.blk, torso, 0, 1.35, -0.1, "Back_Panel");
  P(0.04, 0.16, 0.02, M.red, torso, 0, 1.36, -0.13, "Back_Spine_Strip");

  // ---- Belt & Pouches
  const beltGroup = new T.Group();
  beltGroup.name = "Belt";
  torso.add(beltGroup);
  C(0.16, 0.16, 0.06, M.blk, beltGroup, 0, 1.06, 0, 0.72, "Belt_Strap");
  P(0.06, 0.05, 0.02, M.hw, beltGroup, 0, 1.06, 0.122, "Belt_Buckle");

  function pouch(th, tall, idx) {
    const g = new T.Group();
    g.name = `Pouch_${idx}`;
    g.position.set(0.16 * Math.sin(th), 1.04, 0.116 * Math.cos(th));
    g.rotation.y = th;
    beltGroup.add(g);
    P(0.06, tall, 0.04, M.blk, g, 0, 0, 0.02, "Pouch_Body");
    P(0.062, 0.024, 0.046, M.blk, g, 0, tall / 2 - 0.01, 0.022, "Pouch_Flap");
    P(0.012, 0.012, 0.01, M.red, g, 0, tall / 2 - 0.012, 0.05, "Pouch_Clasp");
  }
  [0.45, -0.45].forEach((t, i) => pouch(t, 0.075, `Front_${i}`));
  [1.05, -1.05].forEach((t, i) => pouch(t, 0.065, `Side_${i}`));
  [1.5, -1.5].forEach((t, i) => {
    const g = new T.Group();
    g.name = `Canister_${i}`;
    g.position.set(0.16 * Math.sin(t), 1.04, 0.116 * Math.cos(t));
    g.rotation.y = t;
    beltGroup.add(g);
    C(0.02, 0.02, 0.08, M.hw, g, 0, 0, 0.025, null, "Canister_Cylinder");
  });

  // ---- Head / Hood
  const H = new T.Group();
  H.name = "Head";
  H.position.y = 1.69;
  root.add(H);

  C(0.05, 0.055, 0.09, M.suit, torso, 0, 1.56, 0, null, "Neck");

  function cap(r, m, name) {
    const g = new T.SphereGeometry(r, 40, 24, 0, PI * 2, 0.75, 2.39);
    g.rotateX(PI / 2);
    const o = new T.Mesh(g, m);
    o.name = name;
    o.scale.set(1, 1.15, 1.05);
    return at(o, H, 0, 0.005, -0.01);
  }
  cap(0.14, M.hood, "Hood_Outer");
  cap(0.133, M.lin, "Hood_Lining");

  const lip = new T.Mesh(new T.TorusGeometry(0.096, 0.016, 12, 48), M.red);
  lip.name = "Hood_Lip_Red";
  lip.scale.y = 1.15;
  at(lip, H, 0, 0.005, 0.092);

  S(0.095, M.mask, H, 0, -0.005, 0, 0.95, 1.15, 1, "Face_Mask");
  P(0.11, 0.034, 0.02, M.vis, H, 0, 0.012, 0.092, "Visor_Plate");

  [1, -1].forEach((s, i) => {
    const sideName = s > 0 ? "R" : "L";
    P(0.03, 0.007, 0.01, M.slit, H, s * 0.026, 0.012, 0.103, `Eye_Slit_${sideName}`);
    P(0.03, 0.05, 0.02, M.mask, H, s * 0.045, -0.05, 0.075, `Cheek_Plate_${sideName}`);
    const f = C(0.015, 0.015, 0.012, M.red, H, s * 0.133, -0.075, 0, null, `Ear_Disc_${sideName}`);
    f.rotation.z = PI / 2;
    const f2 = C(0.007, 0.007, 0.016, M.hw, H, s * 0.136, -0.075, 0, null, `Ear_Pin_${sideName}`);
    f2.rotation.z = PI / 2;
  });

  P(0.11, 0.022, 0.03, M.mask, H, 0, 0.058, 0.085, "Brow_Plate");
  const peak = P(0.16, 0.04, 0.05, M.hood, H, 0, 0.125, 0.085, "Pointed_Hood_Peak");
  peak.rotation.x = -0.35;
  C(0.115, 0.19, 0.12, M.hood, H, 0, -0.135, -0.02, 0.85, "Cowl_Base");

  // ---- Shoulders & Arms
  [1, -1].forEach(s => {
    const sideName = s > 0 ? "R" : "L";
    const big = s < 0 ? 1.18 : 1;
    const sh = new T.Group();
    sh.name = `Shoulder_${sideName}`;
    sh.position.set(s * 0.215, 1.47, 0);
    root.add(sh);

    const d = new T.Mesh(new T.SphereGeometry(0.085 * big, 24, 12, 0, PI * 2, 0, PI / 2), M.blk);
    d.name = `Shoulder_Pad_${sideName}`;
    d.scale.set(1, 0.7, 1.15);
    at(d, sh, s * 0.025, 0.015, 0);

    const e = new T.Mesh(new T.TorusGeometry(0.085 * big, 0.008, 8, 32), M.red);
    e.name = `Shoulder_Trim_${sideName}`;
    e.rotation.x = PI / 2;
    e.scale.set(1, 1.15, 1);
    at(e, sh, s * 0.025, 0.015, 0);

    if (s < 0) {
      P(0.1, 0.025, 0.11, M.blk, sh, -0.03, 0.075, 0, "Pauldron_Heavy_Plate");
      P(0.04, 0.02, 0.1, M.red, sh, -0.065, 0.07, 0, "Pauldron_Red_Trim");
    }

    const arm = new T.Group();
    arm.name = `Arm_${sideName}`;
    arm.rotation.z = s * 0.4;
    sh.add(arm);

    C(0.05, 0.042, 0.28, M.suit, arm, 0, -0.14, 0, null, `UpperArm_${sideName}`);
    C(0.057, 0.055, 0.12, M.blk, arm, 0, -0.13, 0, null, `UpperArm_Guard_${sideName}`);
    C(0.059, 0.059, 0.018, M.red, arm, 0, -0.07, 0, null, `UpperArm_Ring_${sideName}`);

    S(0.048, M.blk, arm, 0, -0.29, 0, 1, 1, 1, `Elbow_${sideName}`);
    P(0.07, 0.08, 0.03, M.blk, arm, 0, -0.29, -0.045, `Elbow_Plate_${sideName}`);
    P(0.03, 0.04, 0.015, M.red, arm, 0, -0.29, -0.065, `Elbow_Accent_${sideName}`);

    const forearm = new T.Group();
    forearm.name = `Forearm_${sideName}`;
    arm.add(forearm);

    C(0.042, 0.033, 0.26, M.suit, forearm, 0, -0.43, 0, null, `Forearm_Suit_${sideName}`);
    C(0.05, 0.04, 0.2, M.blk, forearm, 0, -0.45, 0, null, `Gauntlet_${sideName}`);
    P(0.04, 0.12, 0.02, M.red, forearm, 0, -0.45, 0.047, `Gauntlet_RedStripe_${sideName}`);
    C(0.036, 0.036, 0.02, M.hw, forearm, 0, -0.56, 0, null, `Wrist_Band_${sideName}`);

    const hand = new T.Group();
    hand.name = `Hand_${sideName}`;
    forearm.add(hand);

    P(0.068, 0.085, 0.034, M.blk, hand, 0, -0.62, 0, `Hand_Glove_${sideName}`);
    P(0.07, 0.022, 0.04, M.blk, hand, 0, -0.67, 0, `Knuckle_Guard_${sideName}`);
    P(0.026, 0.026, 0.01, M.red, hand, 0, -0.62, 0.02, `Hand_RedAccent_${sideName}`);

    [-0.024, -0.008, 0.008, 0.024].forEach((x, fi) => {
      C(0.0095, 0.0085, 0.075 - Math.abs(fi - 1.5) * 0.006, M.blk, hand, x, -0.72, 0.002, null, `Finger_${sideName}_${fi}`);
    });
    const th = C(0.01, 0.009, 0.05, M.blk, hand, -s * 0.04, -0.64, 0.015, null, `Thumb_${sideName}`);
    th.rotation.z = s * 0.6;
  });

  // ---- Legs
  [1, -1].forEach(s => {
    const sideName = s > 0 ? "R" : "L";
    const lg = new T.Group();
    lg.name = `Leg_${sideName}`;
    lg.position.set(s * 0.1, 0.92, 0);
    root.add(lg);

    C(0.085, 0.065, 0.42, M.suit, lg, 0, -0.23, 0, null, `Thigh_${sideName}`);
    P(0.07, 0.12, 0.03, M.blk, lg, s * 0.01, -0.2, 0.08, `Thigh_Plate_${sideName}`);
    P(0.03, 0.03, 0.012, M.red, lg, s * 0.01, -0.17, 0.1, `Thigh_Accent_${sideName}`);
    C(0.083, 0.083, 0.024, M.hw, lg, 0, -0.12, 0, null, `Thigh_Ring_${sideName}`);

    P(0.11, 0.13, 0.045, M.blk, lg, 0, -0.46, 0.07, `Knee_Armor_${sideName}`);
    P(0.06, 0.085, 0.03, M.red, lg, 0, -0.46, 0.097, `Knee_Plate_Red_${sideName}`);

    const shin = new T.Group();
    shin.name = `Shin_${sideName}`;
    lg.add(shin);

    C(0.06, 0.045, 0.38, M.suit, shin, 0, -0.68, 0, null, `Shin_Suit_${sideName}`);
    P(0.085, 0.3, 0.03, M.blk, shin, 0, -0.68, 0.058, `Shin_Guard_${sideName}`);
    P(0.028, 0.24, 0.02, M.red, shin, 0, -0.68, 0.078, `Shin_Stripe_Front_${sideName}`);
    P(0.03, 0.2, 0.02, M.red, shin, s * 0.058, -0.68, 0, `Shin_Stripe_Side_${sideName}`);

    C(0.05, 0.052, 0.08, M.blk, shin, 0, -0.87, 0, null, `Ankle_Cuff_${sideName}`);
    P(0.05, 0.035, 0.02, M.red, shin, 0, -0.87, 0.052, `Ankle_Accent_${sideName}`);

    const b = new T.Group();
    b.name = `Boot_${sideName}`;
    b.position.set(0, -0.92, 0);
    b.rotation.y = s * 0.12;
    lg.add(b);

    P(0.112, 0.035, 0.285, M.rub, b, 0, 0.017, 0.04, `Boot_Sole_${sideName}`);
    P(0.1, 0.09, 0.2, M.blk, b, 0, 0.08, 0.02, `Boot_Body_${sideName}`);
    P(0.095, 0.055, 0.075, M.red, b, 0, 0.062, 0.14, `Boot_Toe_Red_${sideName}`);
    P(0.1, 0.05, 0.075, M.blk, b, 0, 0.05, -0.075, `Boot_Heel_${sideName}`);
    C(0.056, 0.06, 0.11, M.blk, b, 0, 0.15, -0.01, null, `Boot_Collar_${sideName}`);
    P(0.07, 0.03, 0.022, M.red, b, 0, 0.15, 0.05, `Boot_Collar_Accent_${sideName}`);
    C(0.06, 0.06, 0.016, M.hw, b, 0, 0.11, -0.01, null, `Boot_Hardware_${sideName}`);
    P(0.1, 0.014, 0.03, M.hw, b, 0, 0.1, 0.06, `Boot_Strap_${sideName}`);
    [0, 1, 2, 3].forEach(i => P(0.1, 0.006, 0.01, M.rub, b, 0, 0.0045, -0.07 + i * 0.07 + 0.02, `Tread_${sideName}_${i}`));
  });

  return character;
}

// ==========================================
// BUILD CYAN PHANTOM
// ==========================================
function buildCyanPhantom() {
  const M = {
    wht: mk(0xe4e8ec, 0.85, 0),
    grey: mk(0xaeb8c3, 0.9, 0, { side: T.DoubleSide }),
    blk: mk(0x20242b, 0.9, 0.02),
    gr: mk(0x292f39, 0.5, 0.35),
    cy: mk(0x00bfff, 0.3, 0.1, { emissive: 0x006f99, emissiveIntensity: 1.2 }),
    hw: mk(0x414b57, 0.4, 0.8),
    rub: mk(0x15181d, 0.9, 0),
    sil: mk(0xaeb8c3, 0.35, 0.7),
    whd: mk(0xe4e8ec, 0.85, 0, { side: T.DoubleSide }),
    vis: mk(0x0759b8, 0.05, 0.85, { emissive: 0x04406e, emissiveIntensity: 1.4 }),
    hel: mk(0x292f39, 0.35, 0.5)
  };

  const character = new T.Group();
  character.name = "CyanPhantom";

  // Root node that rotates model 180 degrees around Y so front faces Godot -Z
  const root = new T.Group();
  root.name = "CharacterRoot";
  root.rotation.y = PI;
  character.add(root);

  // ---- Torso Group
  const torso = new T.Group();
  torso.name = "Torso";
  root.add(torso);

  C(0.15, 0.14, 0.16, M.blk, torso, 0, 1.0, 0, 0.72, "Jacket_Lower");
  C(0.175, 0.135, 0.4, M.wht, torso, 0, 1.26, 0, 0.68, "Jacket_Main");
  C(0.16, 0.16, 0.05, M.wht, torso, 0, 1.11, 0, 0.74, "Jacket_Hem");

  [1, -1].forEach(s => {
    const sideName = s > 0 ? "R" : "L";
    P(0.05, 0.34, 0.07, M.blk, torso, s * 0.145, 1.25, 0.0, `Torso_SidePanel_${sideName}`);
    P(0.014, 0.14, 0.02, M.cy, torso, s * 0.15, 1.14, 0.075, `Torso_Piping_${sideName}`);
    const e = P(0.055, 0.055, 0.016, M.cy, torso, s * 0.085, 1.38, 0.118, `Chest_Emblem_Cyan_${sideName}`);
    e.rotation.z = PI / 4;
    const e2 = P(0.026, 0.026, 0.018, M.blk, torso, s * 0.085, 1.38, 0.122, `Chest_Emblem_Inner_${sideName}`);
    e2.rotation.z = PI / 4;
    P(0.035, 0.2, 0.018, M.blk, torso, s * 0.03, 1.27, 0.12, `Torso_VerticalPiping_${sideName}`);
  });

  P(0.014, 0.36, 0.012, M.blk, torso, 0, 1.26, 0.122, "Torso_Zipper");
  P(0.022, 0.014, 0.014, M.hw, torso, 0, 1.42, 0.126, "Torso_ZipperPull");
  P(0.22, 0.24, 0.05, M.wht, torso, 0, 1.3, -0.1, "Back_Plate_White");
  P(0.2, 0.025, 0.015, M.blk, torso, 0, 1.36, -0.125, "Back_Horizontal_Strip");
  P(0.012, 0.2, 0.014, M.cy, torso, 0, 1.28, -0.128, "Back_Cyan_Spine");
  C(0.085, 0.08, 0.07, M.wht, torso, 0, 1.5, 0, 0.9, "Neck_Outer");
  C(0.045, 0.05, 0.09, M.blk, torso, 0, 1.55, 0, null, "Neck_Inner");

  // ---- Belt & Pouches
  const beltGroup = new T.Group();
  beltGroup.name = "Belt";
  torso.add(beltGroup);

  C(0.162, 0.162, 0.05, M.blk, beltGroup, 0, 1.05, 0, 0.73, "Belt_Strap");
  P(0.055, 0.04, 0.02, M.hw, beltGroup, 0, 1.05, 0.125, "Belt_Buckle");

  function pouch(th, h, idx) {
    const g = new T.Group();
    g.name = `Pouch_${idx}`;
    g.position.set(0.163 * Math.sin(th), 1.03, 0.119 * Math.cos(th));
    g.rotation.y = th;
    beltGroup.add(g);
    P(0.06, h, 0.04, M.blk, g, 0, 0, 0.02, "Pouch_Body");
    P(0.062, 0.022, 0.046, M.gr, g, 0, h / 2 - 0.01, 0.022, "Pouch_Flap");
    P(0.012, 0.012, 0.01, M.cy, g, 0, h / 2 - 0.012, 0.05, "Pouch_CyanLED");
  }
  [0.5, -0.5].forEach((t, i) => pouch(t, 0.07, `Front_${i}`));
  pouch(1.15, 0.075, "Side_R");
  pouch(-1.15, 0.06, "Side_L");

  // ---- Helmet & Hood
  const H = new T.Group();
  H.name = "Head";
  H.position.y = 1.69;
  root.add(H);

  S(0.125, M.hel, H, 0, 0, 0, 1, 1.1, 1.1, "Helmet_Dome");

  const vg = new T.SphereGeometry(0.13, 40, 20, 0, PI * 2, 0, 1.0);
  vg.rotateX(PI / 2);
  const vz = new T.Mesh(vg, M.vis);
  vz.name = "Helmet_Visor_Curved";
  vz.scale.set(1.04, 0.6, 1.12);
  at(vz, H, 0, 0.008, 0);

  P(0.2, 0.012, 0.03, M.hw, H, 0, 0.062, 0.13, "Visor_UpperFrame");
  P(0.17, 0.01, 0.03, M.hw, H, 0, -0.045, 0.138, "Visor_LowerFrame");
  P(0.05, 0.02, 0.03, M.gr, H, 0, -0.085, 0.115, "Helmet_Chin");
  P(0.012, 0.1, 0.03, M.gr, H, 0, 0.105, 0.08, "Helmet_CrestFront");
  P(0.014, 0.06, 0.1, M.hw, H, 0, 0.12, -0.02, "Helmet_CrestTop");

  [1, -1].forEach(s => {
    const sideName = s > 0 ? "R" : "L";
    side(0.044, 0, 0.03, M.hw, H, s * 0.128, -0.005, -0.01, `EarModule_Outer_${sideName}`);
    side(0.032, 0, 0.036, M.sil, H, s * 0.136, -0.005, -0.01, `EarModule_Mid_${sideName}`);
    side(0.018, 0, 0.04, M.rub, H, s * 0.139, -0.005, -0.01, `EarModule_Inner_${sideName}`);
    side(0.008, 0, 0.044, M.cy, H, s * 0.141, -0.005, -0.01, `EarModule_CoreCyan_${sideName}`);
    P(0.02, 0.04, 0.05, M.hw, H, s * 0.12, 0.055, 0.02, `Temple_Plate_${sideName}`);
  });

  function hood(r, m, dy, name) {
    const g = new T.SphereGeometry(r, 36, 20, PI * 0.82, PI * 1.36);
    const o = new T.Mesh(g, m);
    o.name = name;
    o.scale.set(1.08, 1.12, 1.0);
    return at(o, H, 0, 0.0 + dy, -0.045);
  }
  hood(0.158, M.whd, 0, "Hood_Outer_White");
  hood(0.15, M.grey, 0, "Hood_Inner_Grey");

  const lip = new T.Mesh(new T.TorusGeometry(0.16, 0.014, 10, 40, PI * 1.36), M.wht);
  lip.name = "Hood_Lip_White";
  lip.rotation.x = PI / 2;
  lip.scale.set(1.08, 1.0, 1.12);
  lip.rotation.z = PI * 0.82 + PI / 2;
  at(lip, H, 0, 0, -0.045);

  C(0.12, 0.2, 0.11, M.whd, H, 0, -0.14, -0.03, 0.9, "Cowl_Drape_White");

  // ---- Shoulders & Arms
  [1, -1].forEach(s => {
    const sideName = s > 0 ? "R" : "L";
    const sh = new T.Group();
    sh.name = `Shoulder_${sideName}`;
    sh.position.set(s * 0.22, 1.47, 0);
    root.add(sh);

    const d = new T.Mesh(new T.SphereGeometry(0.082, 24, 12, 0, PI * 2, 0, PI / 2), M.gr);
    d.name = `Shoulder_Dome_${sideName}`;
    d.scale.set(1, 0.7, 1.15);
    at(d, sh, s * 0.02, 0.012, 0);

    const e = new T.Mesh(new T.TorusGeometry(0.082, 0.007, 8, 32), M.cy);
    e.name = `Shoulder_CyanRing_${sideName}`;
    e.rotation.x = PI / 2;
    e.scale.set(1, 1.15, 1);
    at(e, sh, s * 0.02, 0.012, 0);

    const arm = new T.Group();
    arm.name = `Arm_${sideName}`;
    arm.rotation.z = s * 0.4;
    sh.add(arm);

    C(0.052, 0.046, 0.28, M.wht, arm, 0, -0.14, 0, null, `UpperArm_Sleeve_${sideName}`);
    P(0.04, 0.1, 0.012, M.blk, arm, 0, -0.12, 0.052, `UpperArm_Stripe_${sideName}`);

    S(0.047, M.wht, arm, 0, -0.29, 0, 1, 1, 1, `Elbow_Dome_${sideName}`);
    P(0.065, 0.075, 0.025, M.gr, arm, 0, -0.29, -0.045, `Elbow_Plate_${sideName}`);

    const forearm = new T.Group();
    forearm.name = `Forearm_${sideName}`;
    arm.add(forearm);

    C(0.046, 0.04, 0.26, M.wht, forearm, 0, -0.43, 0, null, `Forearm_Sleeve_${sideName}`);
    C(0.052, 0.05, 0.03, M.blk, forearm, 0, -0.33, 0, null, `Forearm_Band_${sideName}`);
    C(0.053, 0.05, 0.1, M.cy, forearm, 0, -0.53, 0, null, `Wrist_CyanGlow_${sideName}`);
    C(0.055, 0.055, 0.014, M.hw, forearm, 0, -0.58, 0, null, `Wrist_Hardware_Lower_${sideName}`);
    C(0.055, 0.055, 0.014, M.hw, forearm, 0, -0.48, 0, null, `Wrist_Hardware_Upper_${sideName}`);
    C(0.04, 0.036, 0.03, M.blk, forearm, 0, -0.6, 0, null, `Wrist_BlackGasket_${sideName}`);

    const hand = new T.Group();
    hand.name = `Hand_${sideName}`;
    forearm.add(hand);

    P(0.068, 0.085, 0.034, M.blk, hand, 0, -0.65, 0, `Hand_Glove_${sideName}`);
    P(0.07, 0.022, 0.04, M.gr, hand, 0, -0.7, 0, `Knuckle_Plate_${sideName}`);
    P(0.024, 0.024, 0.01, M.cy, hand, 0, -0.65, 0.02, `Hand_CyanEmblem_${sideName}`);

    [-0.024, -0.008, 0.008, 0.024].forEach((x, i) => {
      C(0.0095, 0.0085, 0.075 - Math.abs(i - 1.5) * 0.006, M.blk, hand, x, -0.755, 0.002, null, `Finger_${sideName}_${i}`);
    });
    const th = C(0.01, 0.009, 0.05, M.blk, hand, -s * 0.04, -0.67, 0.015, null, `Thumb_${sideName}`);
    th.rotation.z = s * 0.6;
  });

  // ---- Legs
  [1, -1].forEach(s => {
    const sideName = s > 0 ? "R" : "L";
    const lg = new T.Group();
    lg.name = `Leg_${sideName}`;
    lg.position.set(s * 0.1, 0.92, 0);
    root.add(lg);

    C(0.085, 0.065, 0.42, M.blk, lg, 0, -0.23, 0, null, `Thigh_Pants_${sideName}`);
    P(0.075, 0.13, 0.04, M.blk, lg, s * 0.02, -0.22, 0.085, `Thigh_Pocket_${sideName}`);
    P(0.07, 0.03, 0.044, M.gr, lg, s * 0.02, -0.165, 0.087, `Thigh_PocketFlap_${sideName}`);
    P(0.012, 0.012, 0.01, M.cy, lg, s * 0.02, -0.165, 0.11, `Thigh_CyanLED_${sideName}`);
    if (s > 0) {
      P(0.05, 0.16, 0.05, M.gr, lg, s * 0.095, -0.2, 0.02, "Thigh_Holster_R");
    }
    C(0.083, 0.083, 0.02, M.rub, lg, 0, -0.12, 0, null, `Thigh_RubberStrap_${sideName}`);

    P(0.115, 0.135, 0.045, M.gr, lg, 0, -0.47, 0.07, `Knee_MainPlate_${sideName}`);
    P(0.08, 0.1, 0.03, M.sil, lg, 0, -0.47, 0.095, `Knee_SilverPlate_${sideName}`);
    P(0.06, 0.025, 0.02, M.sil, lg, 0, -0.405, 0.093, `Knee_UpperSilver_${sideName}`);
    P(0.1, 0.02, 0.03, M.hw, lg, 0, -0.405, 0.07, `Knee_HardwareBand_${sideName}`);

    const shin = new T.Group();
    shin.name = `Shin_${sideName}`;
    lg.add(shin);

    C(0.06, 0.045, 0.38, M.blk, shin, 0, -0.69, 0, null, `Shin_Pants_${sideName}`);
    P(0.085, 0.3, 0.035, M.gr, shin, 0, -0.69, 0.056, `Shin_Guard_Grey_${sideName}`);

    [1, -1].forEach((k, ki) => {
      P(0.012, 0.27, 0.014, M.cy, shin, k * 0.027, -0.69, 0.078, `Shin_CyanLine_A_${sideName}_${ki}`);
      P(0.014, 0.22, 0.014, M.cy, shin, k * 0.058, -0.69, 0.03, `Shin_CyanLine_B_${sideName}_${ki}`);
    });

    C(0.05, 0.052, 0.08, M.gr, shin, 0, -0.88, 0, null, `Ankle_Cuff_Grey_${sideName}`);
    P(0.03, 0.02, 0.02, M.cy, shin, 0, -0.88, 0.054, `Ankle_CyanDot_${sideName}`);

    const b = new T.Group();
    b.name = `Boot_${sideName}`;
    b.position.set(0, -0.92, 0);
    b.rotation.y = s * 0.12;
    lg.add(b);

    P(0.114, 0.036, 0.29, M.rub, b, 0, 0.018, 0.04, `Boot_Sole_${sideName}`);
    P(0.1, 0.09, 0.2, M.blk, b, 0, 0.08, 0.02, `Boot_Body_${sideName}`);
    P(0.098, 0.05, 0.07, M.gr, b, 0, 0.06, 0.14, `Boot_Toe_Reinforce_${sideName}`);
    P(0.1, 0.05, 0.075, M.blk, b, 0, 0.05, -0.075, `Boot_Heel_${sideName}`);
    C(0.058, 0.062, 0.11, M.gr, b, 0, 0.15, -0.01, null, `Boot_Collar_${sideName}`);
    P(0.014, 0.03, 0.02, M.cy, b, s * 0.06, 0.16, 0.02, `Boot_CyanTag_${sideName}`);
    C(0.062, 0.062, 0.014, M.hw, b, 0, 0.11, -0.01, null, `Boot_CollarRing_${sideName}`);
    P(0.1, 0.014, 0.03, M.hw, b, 0, 0.1, 0.06, `Boot_Buckle_${sideName}`);
    [0, 1, 2, 3].forEach(i => P(0.11, 0.006, 0.012, M.blk, b, 0, 0.003, -0.07 + i * 0.07 + 0.02, `Tread_${sideName}_${i}`));
  });

  return character;
}

// Export function
async function exportToGLB(characterGroup, outFilePath) {
  const dir = path.dirname(outFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const exporter = new GLTFExporter();
  return new Promise((resolve, reject) => {
    exporter.parse(
      characterGroup,
      (gltf) => {
        fs.writeFileSync(outFilePath, Buffer.from(gltf));
        console.log(`Exported: ${outFilePath} (${gltf.byteLength} bytes)`);
        resolve(outFilePath);
      },
      (error) => {
        console.error(`Export failed for ${outFilePath}:`, error);
        reject(error);
      },
      { binary: true }
    );
  });
}

async function run() {
  console.log("Generating 3D models for Crimson Wraith and Cyan Phantom...");

  const crimson = buildCrimsonWraith();
  const cyan = buildCyanPhantom();

  const crimsonPath = path.resolve('../../assets/characters/crimson_wraith/crimson_wraith.glb');
  const cyanPath = path.resolve('../../assets/characters/cyan_phantom/cyan_phantom.glb');

  await exportToGLB(crimson, crimsonPath);
  await exportToGLB(cyan, cyanPath);

  console.log("Both characters generated successfully!");
}

run();
