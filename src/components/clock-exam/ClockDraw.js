/* eslint-disable func-names */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React, { useCallback, useEffect, useState } from 'react';
import { filter } from 'lodash';
import * as tf from '@tensorflow/tfjs';

import { isClockHandArea, isPixelPainted, convertToGrayscale } from '../../utils';

// Initialize metrics
let startTimestamp;
let stopTimestamp;
let hasClockHands = false;
let hasNumbers = false;
let alpha = 0;
let digitPrediction = [];
let Ha_clock = 0;
let Dp_clock = 0;
let Do_clock = 0;
let Ob_clock = 0;
// let clock_json;

const scan_regions = [
  [129, 0, 171, 42], // 12
  [184, 29, 231, 71], // 1
  [234, 79, 281, 121], // 2
  [258, 129, 300, 171], // 3
  [234, 179, 281, 221], // 4
  [184, 229, 231, 271], // 5
  [129, 258, 171, 300], // 6
  [69, 229, 116, 271], // 7
  [19, 179, 66, 221], // 8
  [0, 129, 42, 171], // 9
  [19, 79, 66, 121], // 10
  [69, 29, 116, 71], // 11
];

let detectionTracker = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
// let idealOrder = [1, 2, 1, 1, 1, 1, 0, 2, 9, 3, 8, 4, 7, 5, 6];

const getNumberRegion = (column, row) => {
  for (let i = 0; i < scan_regions.length; i++) {
    const region = scan_regions[i];
    const [col1, row1, col2, row2] = region;
    if (column >= col1 && column <= col2 && row >= row1 && row <= row2) {
      return { region: i };
    }
  }
  return { region: null };
};

const loadModel = async () => tf.loadLayersModel('models/model.json');

const ClockDraw = ({ fetchState, silenceAlert }) => {
  const [data, setData] = useState('');

  useEffect(
    () => () => {
      startTimestamp = undefined;
      stopTimestamp = undefined;
      hasClockHands = false;
      hasNumbers = false;
      alpha = 0;
      digitPrediction = [];
      Ha_clock = 0;
      Dp_clock = 0;
      Do_clock = 0;
      Ob_clock = 0;
    },
    [],
  );

  useEffect(() => {
    if (fetchState && fetchState.alert) {
      const time =
        stopTimestamp && startTimestamp
          ? (stopTimestamp - startTimestamp) / 1000
          : startTimestamp
          ? (Date.now() - startTimestamp) / 1000
          : 0;

      silenceAlert({
        ...fetchState,
        hasClockHands,
        hasNumbers,
        alpha,
        Ha_clock,
        Dp_clock: Dp_clock === 4 && Do_clock === 4 ? 12 : Dp_clock,
        Do_clock: Dp_clock === 4 && Do_clock === 4 ? 12 : Do_clock,
        clock_json: data,
        Ob_clock,
        T_clock: time,
      });
    }
  }, [fetchState, silenceAlert, startTimestamp, stopTimestamp, data]);

  const cbref = useCallback(async (canvas) => {
    if (canvas) {
      await domHandlers(canvas);
      const ctx = canvas.getContext('2d');
      for (let row = 0; row < 300; row++) {
        for (let column = 0; column < 300; column++) {
          if (row === 150 && column === 150) {
            ctx.strokeStyle = '#3f51b5';
            ctx.fillRect(column - 2, row - 2, 4, 4);
            ctx.stroke();
          }
        }
      }
    }
  }, []);

  const domHandlers = async (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000000';
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
        if (!startTimestamp) {
          startTimestamp = Date.now();
        }
        lastPos = getMousePos(canvas, e);
      },
      { passive: false },
    );

    canvas.addEventListener(
      'mouseup',
      (e) => {
        e.preventDefault();
        drawing = false;
        setData(canvas.toDataURL());
        loadModel().then((model) => {
          getIndividualDigits(canvas, model, 0, 300, 0, 300);
        });
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

    // Get the position of the mouse relative to the canvas
    function getMousePos(canvasDom, mouseEvent) {
      const rect = canvasDom.getBoundingClientRect();
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top,
      };
    }

    // Get a regular interval for drawing to the screen
    window.requestAnimFrame = (function (callback) {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimaitonFrame ||
        function () {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();

    // Draw to the canvas
    function renderCanvas() {
      if (drawing) {
        ctx.strokeStyle = '#3f51b5';
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
      (e) => {
        e.preventDefault();
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

  const getIndividualDigits = (canvas, model, columnInit, columnLimit, rowInit, rowLimit) => {
    const ctx = canvas.getContext('2d');

    // Get image data from canvas context
    const imageDataOriginal = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Separate different digits by grouping adjacent pixels
    let k = 1;
    window[`arrayN${k}`] = [];
    const hands = [];
    let minRow = null;
    let minCol = null;
    let maxRow = null;
    let maxCol = null;

    for (let row = rowInit; row <= rowLimit; row++) {
      for (let column = columnInit; column <= columnLimit; column++) {
        // check if pixel is painted
        if (isPixelPainted(imageDataOriginal, row, column)) {
          // check if clock hands exist
          if (isClockHandArea(row, column)) {
            hands.push({ x: column, y: row });
            if (!minRow && row < 140) {
              minRow = row;
              minCol = column;
            }
            if (row > 180 && column < 180) {
              maxRow = row;
              maxCol = column;
            }
          }
          const numberRegion = getNumberRegion(column, row);
          if (numberRegion && typeof numberRegion.region === 'number') {
            const { region } = numberRegion || {};

            // Tag array with our prediction region
            if (typeof region === 'number') {
              window[`arrayNR${k}`] = region;
              // update detection tracker for Dp_clock value
              detectionTracker = filter(detectionTracker, (n) => n !== region);
            }

            // Get the adjacent pixels if stroke is continuous and assign it to an array
            let nextColumn = 1;
            window[`arrayN${k}`].push(row * 300 + column);
            while (imageDataOriginal.data[(row * 300 + column + nextColumn) * 4 + 3] !== 0) {
              window[`arrayN${k}`].push(row * 300 + column + nextColumn);
              nextColumn++;
            }

            // Check if this array is adjacent to another array in a previous row
            // k is the number or continuous arrays that have been identified
            const arrayAdjusted = [];
            let arrayToMerge = [];

            for (let l = 1; l <= k; l++) {
              for (let element = 0; element < window[`arrayN${k}`].length; element++) {
                arrayAdjusted[element] = window[`arrayN${k}`][element] - 300;
                if (window[`arrayN${l}`].includes(arrayAdjusted[element])) {
                  arrayToMerge.push(l);
                  arrayToMerge.push(k);
                  break;
                }
              }
            }

            // Remove duplicated from array; decrease count k
            if (arrayToMerge.length > 1) {
              arrayToMerge = Array.from(new Set(arrayToMerge));
              k--;
            }

            // Merge adjacent arrays into the same digit; and clear that array
            for (let f = 1; f < arrayToMerge.length; f++) {
              window[`arrayN${arrayToMerge[0]}`] = window[`arrayN${arrayToMerge[0]}`].concat(
                window[`arrayN${arrayToMerge[f]}`],
              );
              window[`arrayN${arrayToMerge[f]}`] = [];
            }

            // Increase count k, initiate arrayNk, move to the correct column
            k++;
            window[`arrayN${k}`] = [];
            column = column + nextColumn - 1;
          }
        }
      }
      if (row === 299 && minRow && minCol && maxRow && maxCol) {
        hasClockHands = true;
      }
    }

    if (hasClockHands) {
      const line_min = (Math.atan2(minRow - 150, minCol - 150) * 180) / Math.PI;
      const line_max = (Math.atan2(maxRow - 150, maxCol - 150) * 180) / Math.PI;
      alpha = line_max - line_min;
      if (alpha > 95 && alpha < 140) {
        Ha_clock = 2;
        console.log('YOU GOT THIS:', alpha, line_min, line_max);
      } else {
        if ((line_min > -45 && line_min < 0) || (line_max < 100 && line_max > 75)) {
          Ha_clock = 1;
        }
        console.log('NOPE:', alpha, line_min, line_max);
      }

      // Check which arrays are valid digits (length > 0); those that are length 0 are temporary arrays
      const validArrays = [];
      for (let i = 1; i < k; i++) {
        if (window[`arrayN${i}`].length > 0) {
          validArrays.push(i);
        }
      }

      const call_predict = () => {
        const results = [];
        for (let i = 0; i < validArrays.length; i++) {
          const { res } = processIndividualImage(window[`arrayN${validArrays[i]}`]);

          const prediction = predict(res, model);
          if (typeof prediction === 'number') {
            results.push({
              prediction,
              region: window[`arrayNR${validArrays[i]}`],
            });
          }
        }

        if (results.length > 0) {
          digitPrediction = results;
          hasNumbers = true;
        }

        return digitPrediction;
      };

      const results = call_predict();
      if (results.length > 0) {
        let score = 0;
        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          const { prediction, region } = result;
          const specialRegions = [0, 10, 11];
          if (region && !specialRegions.includes(region)) {
            if (prediction === region) score++;
          }
          // handle double digits
          // TODO: Make this better by checking order
          if (region === 0) {
            if (prediction === 1 || prediction === 2) score++;
          } else if (region === 10) {
            if (prediction === 1 || prediction === 0) score++;
          } else if (region === 11) {
            if (prediction === 1) score++;
          }
        }

        // update digit order score
        // convert from max 15 to 12 --> 4/5 ratio
        Do_clock = Math.floor(score * 0.8);

        if (!stopTimestamp) {
          stopTimestamp = Date.now();
        }
      }

      if (startTimestamp && stopTimestamp) {
        // update digit placement score
        Dp_clock = 12 - detectionTracker.length;

        console.log(`Total time to draw: ${stopTimestamp - startTimestamp}, DP: ${Dp_clock}, DO: ${Do_clock}`);
      }
    }
  };

  return (
    <div
      style={{
        textAlign: 'center',
        border: '1px dashed',
        borderRadius: '100%',
        width: '300px',
        height: '300px',
        margin: '20px auto',
      }}
    >
      <canvas ref={cbref} width="300" height="300" />
      <canvas id="hiddenBoy" width="300" height="300" style={{ visibility: 'hidden' }} />
      <div id="result" style={{ top: 0, position: 'absolute' }} />
    </div>
  );
};

function processIndividualImage(arrayToProcess) {
  // Use hidden canvas to put indiviual digit
  const canvasIndImage = document.getElementById('hiddenBoy');
  const contextIndImg = canvasIndImage.getContext('2d');
  contextIndImg.clearRect(0, 0, canvasIndImage.width, canvasIndImage.height);

  // Insert array digit into the image data; get columns and rows; put image on canvas
  const imageDataCopy = contextIndImg.getImageData(0, 0, canvasIndImage.width, canvasIndImage.height);
  const columnArray = [];
  const rowArray = [];
  for (let j = 0; j < arrayToProcess.length; j++) {
    imageDataCopy.data[arrayToProcess[j] * 4 + 3] = 255;
    columnArray.push(Math.floor(arrayToProcess[j] / 300));
    rowArray.push(arrayToProcess[j] % 300);
  }
  contextIndImg.putImageData(imageDataCopy, 0, 0);

  // Get the image min and max x and y; Calculate the width and height
  const minX = Math.min.apply(null, rowArray);
  const maxX = Math.max.apply(null, rowArray);
  const minY = Math.min.apply(null, columnArray);
  const maxY = Math.max.apply(null, columnArray);
  const originalWidth = maxX - minX;
  const originalHeight = maxY - minY;

  // Normalize the image and make it similar to the training dataset:
  // Scale the image to an 18 x 18 pixel and center it into a 28 x 28 canvas
  // The largest between the width and height will be scaled to 18 pixel
  // The other will be reduced by the same scale, to preserve original aspect ratio
  let scaleRed;
  if (originalHeight > originalWidth) {
    scaleRed = originalHeight / 18;
  } else {
    scaleRed = originalWidth / 18;
  }

  // Calculate a new Width and Height and new X and Y start positions, to center the image in a 28 x 28 pixel
  const newWidth = originalWidth / scaleRed;
  const newHeight = originalHeight / scaleRed;
  const newXstart = (28 - newWidth) / 2;
  const newYstart = (28 - newHeight) / 2;

  // Draw the scaled and centered image to a new canvas
  const canvasHidden = document.createElement('canvas');
  canvasHidden.width = 28;
  canvasHidden.heigth = 28;
  const contextHidden = canvasHidden.getContext('2d');
  contextHidden.clearRect(0, 0, canvasHidden.width, canvasHidden.height);
  contextHidden.filter = 'invert(1)';
  contextHidden.drawImage(
    canvasIndImage,
    minX,
    minY,
    originalWidth,
    originalHeight,
    newXstart,
    newYstart,
    newWidth,
    newHeight,
  );

  // Get the Image Data from the new scaled, centered, 28 x 28 pixel image
  const imageData2 = contextHidden.getImageData(0, 0, 28, 28);
  return { res: convertToGrayscale(imageData2), image: imageData2 };
}

function predict(image, model) {
  const tensor = tf.tensor(image, [1, 28, 28, 1]);
  const response = Array.from(model.predict(tensor).argMax(1).dataSync())[0];
  tensor.dispose();
  return response;
}

export default ClockDraw;
