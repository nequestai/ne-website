export const isPixelPainted = (imageDataOriginal, row, column) =>
  imageDataOriginal.data[(row * 300 + column) * 4 + 3] > 0;

export const isClockHandArea = (row, column) => row >= 130 && row <= 225 && column >= 130 && column <= 225;

export const isDigitArea = (row, column) => !isClockHandArea(row, column) || true;

export const convertToGrayscale = (image) => {
  const dataGrayscale = [];
  const { data } = image;

  for (let i = 0; i < image.width * image.height; i += 1) {
    const j = i * 4;
    const avg = (data[j + 0] + data[j + 1] + data[j + 2]) / 3;
    const normalized = avg / 255.0;
    dataGrayscale.push(normalized);
  }

  return dataGrayscale;
};

export const getClockScore = (fetchState) => {
  const { T_clock, Dp_clock, Do_clock, Ha_clock, Ob_clock } = fetchState;
  return Number.parseFloat(1.1 * T_clock + 0.3 * Dp_clock + 0.2 * Do_clock + 0.2 * Ha_clock + 1.2 * Ob_clock).toFixed(
    2,
  );
};

export const getSpiralScore = (fetchState) => {
  const { T_spiral, Ls_spiral, Td_spiral, Ds_spiral, W_spiral, C_spiral } = fetchState;
  return Number.parseFloat(
    1.1 * T_spiral + 0.2 * Ls_spiral + 1.2 * Td_spiral + 0.2 * Ds_spiral + 1.2 * W_spiral + 1.1 * C_spiral,
  ).toFixed(2);
};

export const percentile = (arr, val) =>
  (100 * arr.reduce((acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0)) / arr.length;
