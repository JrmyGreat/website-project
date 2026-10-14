# Jeremy Clothing: Luxury Fashion Website

Open `index.html` in a browser. You don't need to install or build anything.

## Install it as an app
The site is a Progressive Web App (PWA). An app needs to be served over http(s), not opened as a file.
1. Double-click `start-app.bat`. It starts a local server at http://localhost:8000 and opens it.
2. **Computer (Chrome or Edge):** click **Install the Jeremy App** at the bottom right, or the install icon in the address bar.
3. **Android (Chrome):** open the menu (⋮) and choose **Install app**.
4. **iPhone (Safari):** tap Share, then **Add to Home Screen**.

Phones need to reach the site over the internet, so host the folder first. Free options include GitHub Pages, Netlify and Vercel.

Once installed, the app opens full-screen with its own icon and a bottom tab bar, and pages you've visited work offline.
To publish it to the Google Play Store, upload the hosted URL to https://www.pwabuilder.com.

After changing any site file, raise `VERSION` in `sw.js` so installed apps pick up the update.

## Pages
| Page | File |
|---|---|
| Front page | `index.html` |
| Departments (Women, Men, Child, Toys, Adult) | `department.html?d=women` (also `men`, `child`, `toys`, `adult`) |
| Product details | `details.html?id=w1` (the id comes from `js/data.js`) |
| Contact information | `contact.html` |

## Adding your AI-generated images and videos
- **Hero video:** save your video as `assets/video/hero.mp4`. It fades in automatically. Until then, an animated image shows.
- **Product and department images:** in `js/data.js`, replace any `img:` or `hero:` value with a local path, for example `"assets/img/women-01.jpg"`.
- Images in portrait format (3:4) look best. Light, beige or white backgrounds suit the theme.

## Structure
- `css/style.css`: the white and beige theme, animations and responsive layout
- `js/data.js`: departments and products (edit this to change the catalog)
- `js/main.js`: shared header and footer, page rendering, AI Style Assistant, bag and forms
