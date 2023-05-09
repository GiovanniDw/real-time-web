import socket from '@/socket.js';
import '@/css/draw.scss';
import { addObserver, getState, setState } from '@/state.js';
import { $ } from '@/helpers/variables';
class WhiteBoard extends HTMLElement {
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

    setTimeout(() => {
      
    }, 0);

    console.log('connected!', this);

    console.log(this.innerHeight);
    console.log(this.innerWidth);
    const { user, isLoggedIn } = getState();
    setState({ current: {color: '#000000'}})

    const canvas = this.querySelector('#whiteboard');
    const colorPicker = this.querySelector('#drawcolor');
    const canvasContainer = this.querySelector('#draw-container');
    let context = canvas.getContext('2d');

    let drawing = false;

    let current = this.state.current;
    console.log('color');
    console.log(current);
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    //Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

    socket.on('drawing', onDrawingEvent);

    window.addEventListener('resize', onResize, false);
    onResize();

    colorPicker.addEventListener('change', watchColorPicker, false);


  

    function onMouseDown(e) {
      
      drawing = true;
      const { current } = getState();
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
      console.log(getMousePos(e))
    }

    function onMouseUp(e) {
      if (!drawing) {
        return;
      }
      drawing = false;
      drawLine(
        current.x,
        current.y,
        e.clientX || 0,
        e.clientY || 0,
        current.color,
        true
      );
    }

    function onMouseMove(e) {
      const { current } = getState();
      if (!drawing) {
        return;
      }
      console.log('getmousepos')
      console.log(getMousePos(e))
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

        console.log(current.x)
        console.log(current.y)
        

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
      let w = canvas.width;
      let h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }

    function drawLine(x0, y0, x1, y1, color, emit) {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 8;
      context.stroke();
      context.closePath();

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

    function onResize() {
      console.log(canvas.offsetHeight);
      console.log(canvas.offsetWidth);
      console.log(canvas)
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }


    function getMousePos(e) {
      let canBoundX = canvas.offsetLeft;
      let canBoundY = canvas.offsetTop;
      let x = e.clientX - canBoundX;
      let y = e.clientY - canBoundY;
      return {x: x, y: y};
  }
  
  }
  

  disconnectedCallback() {
    console.log('disconnected', this);
  }
  static get observedAttributes() {
    return ['room', 'user'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
   console.log(`attr: ${name} changed from ${oldValue} to ${newValue}`)
   console.log(oldValue)
   console.log(newValue)
  }

}

export default WhiteBoard;
