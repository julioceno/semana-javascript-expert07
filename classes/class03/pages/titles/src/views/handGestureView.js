export default class HandGestureView {
  #handsCanvas = document.querySelector('#hands');
  #canvasContext = this.#handsCanvas.getContext('2d');
  constructor() {
    this.#handsCanvas.width = globalThis.screen.availWidth;
    this.#handsCanvas.height = globalThis.screen.availHeight;
  }

  clearCanvas() {
    this.#canvasContext.clearRect(
      0,
      0,
      this.#handsCanvas.width,
      this.#handsCanvas.height
    );
  }

  drawResults(hands) {
    console.log('inicio daqui');
    for (const { keypoints, handedness } of hands) {
      if (!keypoints) continue;

      this.#canvasContext.fillStyle = handedness === 'Left' ? 'red' : 'green';
      this.#canvasContext.strokeStyle = 'white';
      this.#canvasContext.lineWidth = 8;
      this.#canvasContext.lineJoin = 'round';

      // juntas
      this.#drawJoients(keypoints);
    }
  }

  #drawJoients(keypoints) {
    for (const { x, y } of keypoints) {
      this.#canvasContext.beginPath();
      const newX = x - 2;
      const newY = y - 2;

      const radius = 3;
      const startAngle = 0;
      const endAngle = 2 * Math.PI;

      this.#canvasContext.arc(newX, newY, radius, startAngle, endAngle);
      this.#canvasContext.fill();
    }
  }

  loop(fn) {
    requestAnimationFrame(fn);
  }

  scrollPage(top) {
    scroll({
      top,
      behavior: 'smooth',
    });
  }
}
