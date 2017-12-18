export default function addListeners(keysDown) {
  window.addEventListener('keydown', (e) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 37:
      case 65:
        keysDown.left = true;
        break;
      case 39:
      case 68:
        keysDown.right = true;
        break;
      case 38:
      case 87:
        keysDown.up = true;
        break;
      case 40:
      case 83:
        keysDown.down = true;
        break;
      case 32:
        keysDown.space = true;
        break;
      case 77:
        keysDown.missile = true;
        break;
      default:
        break;
    }
  });
  window.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 37:
      case 65:
        keysDown.left = false;
        break;
      case 39:
      case 68:
        keysDown.right = false;
        break;
      case 38:
      case 87:
        keysDown.up = false;
        break;
      case 40:
      case 83:
        keysDown.down = false;
        break;
      case 32:
        keysDown.space = false;
        break
      case 77:
        keysDown.missile = false;
        break;
      default:
        break;
    }
  });
}
