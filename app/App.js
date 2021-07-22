import Renderer from "./web-gl/Renderer.js";
export default class App {
    constructor(name) {
        this.canvas = document.getElementById("game");
        this.webGl = new Renderer(this.canvas.getContext("webgl"));
        console.debug(`'${name}' starting...`);
    }
}
const app = new App("Pong");
