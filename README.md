# marp-vue-slide

A practical browser-based [Marp](https://github.com/marp-team/marp) slide deck made by [Marp Vue](https://github.com/marp-team/marp-vue). Edit [`public/slide.md`](public/slide.md) to create your slide deck.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yhatt/marp-vue-slide)

## Usage

:point_right: https://marp-vue-slide.netlify.com/

- Navigate slide by arrow keys.
- Toggle fullscreen by hitting <kbd>F</kbd> or <kbd>F11</kbd>.
- Open presenter view window by hitting <kbd>P</kbd>.
- You can export slide to PDF by <kbd>Ctrl/Cmd</kbd>+<kbd>P</kbd> if you are using Chrome/Chromium. Netlify will output an auto-generated PDF to [`/slide.pdf`](https://marp-vue-slide.netlify.com/slide.pdf).
- A raw Markdown can see by accessing to [`/slide.md`](https://marp-vue-slide.netlify.com/slide.md).

## Project setup

```
yarn install
```

### Scripts

- `yarn serve`: Compiles and hot-reloads for development
- `yarn build`: Compiles and minifies for production
- `yarn lint`: Lints and fixes files
- `yarn pdf`: Exports PDF from slide Markdown for production (Powered by [Marp CLI](https://github.com/marp-team/marp-cli))
- `yarn og-image`: Outputs JPG image for Open Graph image

## License

[WTFPL](LICENSE)
