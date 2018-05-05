export const intersectRect = (r1, r2) => {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
};

export const containRect = (r1, r2) => {
  return !(
    r2.left < r1.left ||
    r2.right > r1.right ||
    r2.top < r1.top ||
    r2.bottom > r1.bottom
  );
};

export const intersectHalf = (r1, r2) => {
  if (!intersectRect(r1, r2)) return false;
  if (containRect(r1, r2)) return true;
  const area = (r2.right - r2.left) * (r2.bottom - r2.top);
  const section = {
    left: Math.max(r1.left, r2.left),
    right: Math.min(r1.right, r2.right),
    top: Math.max(r1.top, r2.top),
    bottom: Math.max(r1.bottom, r2.bottom)
  };
  return (
    (section.right - section.left) * (section.bottom - section.top) / area > 0.5
  );
};
