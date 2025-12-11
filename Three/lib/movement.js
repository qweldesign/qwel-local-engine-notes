// movement.js

import * as THREE from 'three';

export function setupMovement(camera) {
  const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false
  };

  // keydown
  document.addEventListener('keydown', (e) => {
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        keys.forward = true;
        break;
      case 'KeyS':
      case 'ArrowDown':
        keys.backward = true;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        keys.left = true;
        break;
      case 'KeyD':
      case 'ArrowRight':
        keys.right = true;
        break;
    }
  });

  // keyup
  document.addEventListener('keyup', (e) => {
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        keys.forward = false;
        break;
      case 'KeyS':
      case 'ArrowDown':
        keys.backward = false;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        keys.left = false;
        break;
      case 'KeyD':
      case 'ArrowRight':
        keys.right = false;
        break;
    }
  });

  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const speed = 0.5;

  // 毎フレーム呼ばれる「移動ベクトルだけ返す関数」
  function getMovementVector() {
    velocity.set(0, 0, 0);

    if (keys.forward) velocity.z -= 1;
    if (keys.backward) velocity.z += 1;
    if (keys.left) velocity.x -= 1;
    if (keys.right) velocity.x += 1;

    // カメラの回転を適用 (進む方向を視線方向に変換)
    direction.copy(velocity).applyQuaternion(camera.quaternion);

    // 上下移動をカットして地面を歩く
    direction.y = 0;

    // スピード調整
    if (velocity.lengthSq() > 0) {
      direction.normalize().multiplyScalar(speed);
    } else {
      direction.set(0, 0, 0);
    }

    return direction; // Vector3 を返す
  }

  return { getMovementVector };
}
