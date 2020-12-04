export const calculateDistanceTo = (
  distanceFront: number,
  distanceBehind: number,
  speedBehind: number
) => (distanceFront - distanceBehind) / speedBehind;
