import { css } from 'styled-components';

const sizes = {
  bp1024: 1024,
  bp900: 900,
  bp760: 760,
  bp560: 560,
  bp375: 375,
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export default media;
