// pointer-lock.js

import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export function setupPointerLockControls(camera, domElement) {
  let isLocked = false;
  const controls = new PointerLockControls(camera, domElement);

  domElement.addEventListener("mousedown", () => controls.lock());
  domElement.addEventListener("mouseup", () => controls.unlock());

  controls.addEventListener('lock', () => isLocked = true);
  controls.addEventListener('unlock', () => isLocked = false);

  return { controls, isLockedRef: () => isLocked };
}
