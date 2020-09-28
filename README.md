# 🍵 11tea

11tea (Eleventea) is a ready-to-go starter to make website using [Eleventy](https://www.11ty.dev), [Tailwind CSS](https://tailwindcss.com), and [Alpine.js](https://github.com/alpinejs/alpine) which, all together are forming the new fancy TEA-Stack. Have some tea!

## Features

- 🏗 Eleventy with Nunjucks (.njk)
- 🧱 Functional CSS with TailwindCSS
- 🗻 AlpineJS for interactivity
- 🔍 Optimized SEO with a meta.njk file
- 🖼 Eleventy Lazy Images Plugin
- 🏃‍♀️ Build with performance in mind

## Roadmap

- [ ] Finish landingpage
- [ ] Prepare bare documentation
- [ ] Build some examples websites

## How to use

```bash
# clone this repository
git clone git@github.com:halfmage/11tea.git

# navigate to you folder
cd 11tea

# install dependencies
npm install

# build the project to generate css (_tmp folder)
npm run build

# start the watcher
npm run start
```

## Details

- **Tailwind**: The config file in rhe root folder includes future settings with `removeDeprecatedGapUtilities` and `purgeLayersByDefault` set to `true`. Therefore it is already prepared for v2

- **Favicons**: For the generation of social images and favicon files I used [Real Favicon Generator](https://realfavicongenerator.net/) and adopted the file names of the exports so you can easily copy and replace those images

## Contribution

Let me know if something does not work or you have ideas for improvements via the Github issues.

## Shoutouts

- [Greg Wolanski's TEA Starter](https://github.com/gregwolanski/eleventy-tailwindcss-alpinejs-starter) teached me a lot about setting up a eleventy starter in general and I liked the way he inlcuded a optimized tailwind css build without the need of webpack.
