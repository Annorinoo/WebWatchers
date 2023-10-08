# WebWatchers

# Install 

# 1. npm i
# 2. npm install -D tailwindcss
 ``` npm install -D tailwindcss {
    Place this in a tailwind.config.js file:

        / @type {import('tailwindcss').Config} */
        module.exports = {
        content: ["./src//*.{html,js}"],
        theme: {
            extend: {},
        },
        plugins: [],
        }
}
```
# 3. npm install react-alice-carousel
```
    @import "react-alice-carousel/lib/alice-carousel.css";

    # SCSS
    @import "react-alice-carousel/lib/scss/alice-carousel.scss";
```
# 4. npm install classnames
# 5. npm install reactjs-popup
# 6. npm install semantic-ui-react semantic-ui-css
# 7. npm install boostrap
# 

# 1. psql -U postgres
# 2. CREATE DATABASE parent;
# 3. \c parent;
# 4. DROP TABLE public.websites.tags; 
# 4. \q
# 5. npm run seed