import socket from '@/socket.js';
import '@/css/draw.scss';
import { getState, setState } from '@/state.js';

class DrawComponent extends HTMLElement {
  constructor() {
    super();

    this.state = {
      drawing: false,
      current: {
        color: '#000000',
      },
    };
    this.setCurrent = (color) => {
      return (this.state.current = {
        color: color,
      });
    };

    this.innerHTML = /*html*/ `
      <div id='draw-container' class='draw-container'>
        <div id="draw-inputs">
          <input type="color" id="drawcolor" name="drawcolor" value="#000000">
          <label for="drawcolor">Color</label>
        </div>
        <canvas id="whiteboard"></canvas>
      </div>

    `;
  }
  connectedCallback() {
    const dpr = window.devicePixelRatio;
    console.log(dpr)
    const drawComponent = this.querySelector('#draw-component');
    const drawContainer = this.querySelector('#draw-container');

    const canvas = this.querySelector('#whiteboard');
    let rect = canvas.getBoundingClientRect();
    const colorPicker = this.querySelector('#drawcolor');
  
    console.log('connected!', this);

    setState({ current: { color: '#000000' } });
    // const canvasContainer = this.querySelector('#draw-container');

    const context = canvas.getContext('2d', { alpha: true });

    let drawing = false;

    let current = this.state.current;



    console.log('color');
    console.log(current);

    onResize();
    window.addEventListener('resize', onResize, true);

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 1), false);

    //Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 1), false);

    socket.on('drawing', onDrawingEvent);

    
    

    colorPicker.addEventListener('change', watchColorPicker, false);

    function onMouseDown(e) {
      
      const { current } = getState();
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    }

    function onMouseUp(e) {
      const { current } = getState();
      if (!drawing) {
        return;
      }
      drawing = false;
      drawLine(current.x, current.y, e.clientX || 0, e.clientY || 0, current.color, false);
    }

    function onMouseMove(e) {
      const { current } = getState();

      if (!drawing) {
        return;
      }
      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color,
        true
      );
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
      setState({current})
    }

    function watchColorPicker(e) {
      let color = e.target.value;
      setState({
        current: {
          color: color,
        },
      });
    }

    // limit the number of events per second
    function throttle(callback, delay) {
      let previousCall = new Date().getTime();
      return function () {
        let time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    }

    function onDrawingEvent(data) {
      const containerWidth = drawContainer.clientWidth;
      const containerHeight = drawContainer.clientHeight;
      console.log(data)
      let w = canvas.width;
      let h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, false);
    }

    function onResize() {
      // canvas.width = rect.width;
      // canvas.height = rect.height;
      const containerWidth = drawContainer.clientWidth;
      const containerHeight = drawContainer.clientHeight;
      const canvasOffsetX = canvas.offsetLeft;
      const canvasOffsetY = canvas.offsetTop;
      
      canvas.width = containerWidth;
      canvas.height = containerHeight;
      // canvas.width = window.innerWidth - canvasOffsetX;
// canvas.height = window.innerHeight - canvasOffsetY;
      // canvas.width = canvas.canvasOffsetX;
      // canvas.height = canvas.canvasOffsetY;
    }
    function drawLine(x0, y0, x1, y1, color, emit) {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 1;
      context.stroke();
      context.closePath();
      // context.textAlign = 'center'

      console.log(context)


      if (!emit) {
        return;
      }

      let w = canvas.width;
      let h = canvas.height;
      
      socket.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color,
      });
    }


    function getMousePos(e) {
      let canBoundX = canvas.offsetLeft;
      let canBoundY = canvas.offsetTop;
      let x = e.clientX - canBoundX;
      let y = e.clientY - canBoundY;
      return { x: x, y: y };
    }
  }

  disconnectedCallback() {
    console.log('disconnected', this);
  }
  static get observedAttributes() {
    return ['room', 'user'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`attr: ${name} changed from ${oldValue} to ${newValue}`);
    console.log(oldValue);
    console.log(newValue);
  }
}

export default DrawComponent;
