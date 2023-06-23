/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
import React, { useCallback, useState, useEffect } from 'react';

import { isPixelPainted } from '../../utils';

let startTimestamp;
let stopTimestamp;
let strokeLength = 0;
let stencilLength = 0;
let Td_spiral = 0;
let C_spiral = 0;

const Spiral = ({ fetchState, silenceAlert }) => {
  const [ref, setRef] = useState(null);
  const [refDraw, setRefDraw] = useState(null);
  const [data, setData] = useState('');

  useEffect(
    () => () => {
      startTimestamp = undefined;
      stopTimestamp = undefined;
      strokeLength = 0;
      stencilLength = 0;
      Td_spiral = 0;
      C_spiral = 0;
    },
    [],
  );

  useEffect(() => {
    if (fetchState && fetchState.alert) {
      let time = 0;

      if (stopTimestamp && startTimestamp) {
        time = (stopTimestamp - startTimestamp) / 1000;
      } else if (startTimestamp) {
        time = (Date.now() - startTimestamp) / 1000;
      }

      silenceAlert({
        ...fetchState,
        T_spiral: time,
        Ls_spiral: Math.abs(strokeLength - stencilLength),
        Ds_spiral: time ? strokeLength / time : 0,
        Td_spiral,
        C_spiral,
        W_spiral: 0,
        spiral_json: data,
      });
    }
  }, [fetchState, silenceAlert, startTimestamp, stopTimestamp, data]);

  // enumFromTo :: Int -> Int -> [Int]
  const enumFromTo = (m) => (n) =>
    Array.from(
      {
        length: 1 + n - m,
      },
      (_, i) => m + i,
    );

  const main = useCallback(
    (canvas) => (strColor) => (intCycles) => {
      const ai = 0.02;
      const ri = 0.1;
      const cvs = canvas;
      const ctx = cvs.getContext('2d');
      const s = cvs.width / 2;
      const points = enumFromTo(1)((Math.PI * 2 * intCycles) / ai).map((i) =>
        [Math.cos, Math.sin].map((f) => ri * i * f(ai * i) + s),
      );

      ctx.beginPath();
      points.forEach((xy) => ctx.lineTo(...xy));
      ctx.strokeStyle = strColor;
      ctx.stroke();
      return points;
    },
    [],
  );

  const cbref = useCallback(
    (node) => {
      if (node && !ref) {
        setRef(node);
        main(node)('black')(4);
      }
    },
    [ref],
  );

  const cbrefDraw = useCallback(
    (node) => {
      if (node && !refDraw) {
        setRefDraw(node);
      }

      if (refDraw && ref) {
        domHandlers(refDraw, ref);
      }
    },
    [ref, refDraw],
  );

  const domHandlers = async (canvas, stencil) => {
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#3f51b5';
    ctx.lineWidth = 3;

    // Set up mouse events for drawing
    let drawing = false;
    let mousePos = { x: 0, y: 0 };
    let lastPos = mousePos;

    canvas.addEventListener(
      'mousedown',
      (e) => {
        e.preventDefault();
        drawing = true;
        lastPos = getMousePos(canvas, e);
        if (!startTimestamp) startTimestamp = Date.now();

        canvas.addEventListener(
          'mousemove',
          () => {
            e.preventDefault();
            const x = lastPos.x - mousePos.x;
            const y = lastPos.y - mousePos.y;
            strokeLength += Math.sqrt(x * x + y * y);
          },
          false,
        );
      },
      { passive: false },
    );

    canvas.addEventListener(
      'mousemove',
      (e) => {
        e.preventDefault();
        mousePos = getMousePos(canvas, e);
      },
      { passive: false },
    );

    canvas.addEventListener(
      'mouseup',
      (e) => {
        e.preventDefault();
        drawing = false;

        const stencilCtx = stencil.getContext('2d');
        const ctxDraw = canvas.getContext('2d');
        const stencilData = stencilCtx.getImageData(0, 0, 300, 300);
        const dataDraw = ctxDraw.getImageData(0, 0, 300, 300);
        let area1 = 0;
        let area2 = 0;
        let crossings = 0;

        setData(canvas.toDataURL());

        if (!stencilLength) {
          for (let row = 0; row < 300; row++) {
            let leftX = 0;
            for (let column = 0; column < 300; column++) {
              if (isPixelPainted(stencilData, row, column)) {
                stencilLength++;
                if (!leftX) {
                  // set left
                  leftX = column;
                } else {
                  // found right, so reset
                  area1 += column - leftX;
                  leftX = column;
                }
              }

              // calculate crossings
              if (
                isPixelPainted(stencilData, row, column) &&
                isPixelPainted(dataDraw, row, column) &&
                isPixelPainted(dataDraw, row > 1 ? row - 2 : row, column)
              ) {
                crossings++;
              }
            }
            leftX = 0;
            for (let column = 0; column < 300; column++) {
              if (isPixelPainted(dataDraw, row, column)) {
                if (!leftX) {
                  // start left
                  leftX = column;
                } else {
                  area2 += column - leftX;
                  leftX = column;
                }
              }
            }
          }
        }
        if (area1 && area2) {
          Td_spiral = Math.abs(area1 - area2);
        }
        if (crossings) {
          C_spiral = crossings;
        }
        if (strokeLength > stencilLength && !stopTimestamp) {
          stopTimestamp = Date.now();
        }
      },
      { passive: false },
    );

    // Get the position of the mouse relative to the canvas
    function getMousePos(canvasDom, mouseEvent) {
      const rect = canvasDom.getBoundingClientRect();
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top,
      };
    }

    // Get a regular interval for drawing to the screen
    window.requestAnimFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimaitonFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();

    // Draw to the canvas
    function renderCanvas() {
      if (drawing) {
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        lastPos = mousePos;
      }
    }

    // Allow for animation
    (function drawLoop() {
      window.requestAnimFrame(drawLoop);
      renderCanvas();
    })();

    // Set up touch events for mobile, etc
    canvas.addEventListener(
      'touchstart',
      (e) => {
        e.preventDefault();
        mousePos = getTouchPos(canvas, e);
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
        canvas.dispatchEvent(mouseEvent);
      },
      { passive: false },
    );

    canvas.addEventListener(
      'touchend',
      () => {
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
      },
      { passive: false },
    );

    canvas.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
        canvas.dispatchEvent(mouseEvent);
      },
      { passive: false },
    );

    // Get the position of a touch relative to the canvas
    function getTouchPos(canvasDom, touchEvent) {
      const rect = canvasDom.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top,
      };
    }

    // Prevent scrolling when touching the canvas
    document.body.addEventListener(
      'touchstart',
      (e) => {
        if (e.target === canvas) {
          e.preventDefault();
        }
      },
      { passive: false },
    );

    document.body.addEventListener(
      'touchend',
      (e) => {
        if (e.target === canvas) {
          e.preventDefault();
        }
      },
      { passive: false },
    );

    document.body.addEventListener(
      'touchmove',
      (e) => {
        if (e.target === canvas) {
          e.preventDefault();
        }
      },
      { passive: false },
    );
  };

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        margin: '20px auto',
      }}
    >
      <canvas id="stencil" ref={cbref} width="300" height="300" style={{ position: 'absolute' }} />
      <canvas id="sketch" ref={cbrefDraw} width="300" height="300" style={{ position: 'absolute' }} />
    </div>
  );
};

export default Spiral;
