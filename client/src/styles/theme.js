//Define your standard font sizes here
const font_sizes = {};
//Define your standard line height here
const line_heights = {};
//Define your standard base colours here
const base_colours = {
  primary: "#7BD0DC",
  secondary: "#4385FF",
  white: "#FAFAFA",
  black: "#0F0F0F",
  button: "lightgray"
};

export const theme = {
  breakpoints: [640, 960],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  maxWidths: [480, 960, 1440],
  fontWeights: {
    normal: "400",
    bold: "500"
  },
  fontSizes: {
    ...font_sizes
  },
  lineHeights: { ...line_heights },
  colors: {
    ...base_colours
  },
}