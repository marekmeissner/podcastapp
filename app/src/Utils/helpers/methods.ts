export const pad = (n: any, width: number, z = 0) => {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

export const getMinutesAndSeconds = (position: number) => ([
    pad(Math.floor(position / 60), 2),
    pad(position % 60, 2),
  ]);