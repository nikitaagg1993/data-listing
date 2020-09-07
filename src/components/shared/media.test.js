import { media } from './media';

describe('media', () => {
  test('media: sm', () => {
    expect(media.sm([])).toMatchSnapshot();
  });
  test('media: md', () => {
    expect(media.md([])).toMatchSnapshot();
  });
  test('media: lg', () => {
    expect(media.lg([])).toMatchSnapshot();
  });
  test('media: custom', () => {
    expect(media.custom('abc')('display: none')).toMatchSnapshot();
  });
});
