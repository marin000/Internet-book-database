const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/app.js')
    .addEntry('SearchResults', './assets/components/SearchResults/SearchResults.js')
    .addEntry('Home','./assets/components/Home/Home.js')
    .addEntry('BookDetails','./assets/components/BookDetails/BookDetails.js')
    .addEntry('MyLibrary','./assets/components/MyLibrary/MyLibrary.js')
    .addEntry('Favorite','./assets/components/MyLibrary/Favorite.js')
    .addEntry('ForReading','./assets/components/MyLibrary/ForReading.js')
    .addEntry('JustReading','./assets/components/MyLibrary/JustReading.js')
    .addEntry('AlreadyRead','./assets/components/MyLibrary/AlreadyRead.js')
    .addEntry('Register','./assets/components/Register/Register.js')
    .addEntry('Login', './assets/components/Login/Login.js')
    .addEntry('MyProfile','./assets/components/MyProfile/MyProfile.js')
    .addEntry('ForgotPassword','./assets/components/ForgotPassword/ForgotPassword.js')
    .addEntry('ChangePassword', './assets/components/ChangePassword/ChangePassword.js')
    .addEntry('ResetPassword', './assets/components/ResetPassword/ResetPassword.js')
    .addEntry('VideoChat','./assets/components/Room/VideoChat.js')
    .addEntry('Chat','./assets/components/Chat/Chat.js')
    .addEntry('Admin','./assets/components/Admin/Admin.js')
    .addEntry('TriviaCreate','./assets/components/Admin/TriviaCreate/TriviaCreate.js')
    .addEntry('TriviaCheck','./assets/components/Admin/TriviaCheck/TriviaCheck.js')
    .addEntry('TriviaEdit','./assets/components/Admin/TriviaEdit/TriviaEdit.js')
    .addEntry('Trivia','./assets/components/Trivia/Trivia.js')
    .addEntry('TriviaPlay','./assets/components/TriviaPlay/TriviaPlay.js')
    .addEntry('TriviaRankings','./assets/components/TriviaRankings/TriviaRankings.js')
    .addEntry('ContactForm','./assets/components/ContactForm/ContactForm.js')
    .addEntry('Popularity','./assets/components/Popularity/Popularity.js')

    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    .enableStimulusBridge('./assets/controllers.json')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    //.enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you use React
    .enableReactPreset()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
