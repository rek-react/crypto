const sourceFolder = './src'
const buildFolder = './build'

export const path = {
    src: {
        html: `${sourceFolder}/*.html`,
        scripts: `${sourceFolder}/assets/scripts/App.js`,
        styles: `${sourceFolder}/assets/styles/style.scss`,
        images: `${sourceFolder}/assets/images/**/*.{jpeg,jpg,png,gif,svg}`,
        iconStyle: `${sourceFolder}/assets/styles/iconsfont/iconsfont.css`,
        icon: `${sourceFolder}/assets/icon/*.*`
    },
    build: {
        html: `${buildFolder}/`,
        scripts: `${buildFolder}/assets/scripts/`,
        styles: `${buildFolder}/assets/styles/`,
        images: `${buildFolder}/assets/images/`,
        icon: `${buildFolder}/assets/icon/`,
        iconStyle: `${buildFolder}/assets/styles/`,
        fonts: `${buildFolder}/assets/fonts/`
    },
    watch: {
        html: `${sourceFolder}/**/*.html`,
        scripts: `${sourceFolder}/assets/scripts/**/*.js`,
        styles: `${sourceFolder}/assets/styles/**/*.scss`,
        images: `${sourceFolder}/assets/images/**/*.{jpeg,jpg,png,gif}`,
        iconStyle: `${sourceFolder}/assets/styles/iconsfont/*.css`,
        icon: `${sourceFolder}/assets/icon/*.*`,
    },
    scrFolder: sourceFolder,
    reset: buildFolder,
}