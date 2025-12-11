// three-setup.js

import * as THREE from 'three';

export function setupThreeEnvironment(canvas) {
  // 画面サイズを取得
  let width = window.innerWidth;
  let height = window.innerHeight;

  // レンダラー
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas, // レンダリング先のcanvasを指定
    antialias: true, // 画質を上げる設定
  });
  renderer.shadowMap.enabled = true; // 影を有効化
  renderer.setSize(width, height); // サイズを画面幅・高さに指定

  // シーン
  const scene = new THREE.Scene();

  // カメラ
  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  camera.position.set(0, 20, -100); // 後ろに下がって少し上 (水平線を視野に入れる)
  camera.lookAt(0, 0, 0); // 原点方向を見る

  // 光源 (スポットライト)
  const light = new THREE.SpotLight(0xffffff, 10, 1000, Math.PI / 3, 0, 0);
  light.position.set(-20, 100, 0); // 原点のやや左上
  light.castShadow = true; // 影を落とす
  scene.add(light);

  // 地面
  const plane = new THREE.PlaneGeometry(1000, 1000);
  const planeMat = new THREE.MeshStandardMaterial({ color: 0x442211 });
  const ground = new THREE.Mesh(plane, planeMat);
  ground.receiveShadow = true; // 影を受ける
  ground.rotation.x = - Math.PI / 2; // 地面を水平に倒す
  scene.add(ground);

  // 画面リサイズ対応
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  return { renderer, scene, camera, light, ground };
}
