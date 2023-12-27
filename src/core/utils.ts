export const randomIntFromRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomFloatFromRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const degToRad = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

export const radToDeg = (radians: number) => {
  return radians * (180 / Math.PI);
};
