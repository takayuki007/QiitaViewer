import gulp from 'gulp';
import webpackConfig from './webpack.config.js';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';

// gulpタスクの作成
gulp.task('build', function(){
  gulp.src('src/js/app.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/js/'));
});
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html",
      mypage: "mypage.html"
    }
  });
});
gulp.task('bs-reload', function () {
  browserSync.reload();
});
gulp.task('eslint', function() {
  return gulp.src(['src/**/*.js'])
    .pipe(plumber({
      // エラーをハンドル
      errorHandler: function(error) {
        const taskName = 'eslint';
        const title = '[task]' + taskName + ' ' + error.plugin;
        const errorMsg = 'error: ' + error.message;
        // ターミナルにエラーを出力
        console.error(title + '\n' + errorMsg);
        // エラーを通知
        notify.onError({
          title: title,
          message: errorMsg,
          time: 3000
        });
      }
    }))
    .pipe(eslint({ useEslintrc: true })) // .eslintrc を参照
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(plumber.stop());
});

gulp.task('sass', function(done){
  // stream
  gulp.src('src/sass/app.scss') //タスクで処理するソースの指定
      .pipe(sass()) //処理させるモジュールを指定
      .pipe(gulp.dest('dist/css/')); //保存先を指定

  console.log('sass compile');
  done();
});

// Gulpを使ったファイルの監視
gulp.task('default', ['eslint', 'build', 'browser-sync','sass'], function(){
  gulp.watch('./src/**/*.js', ['build']);
  gulp.watch("./*.html", ['bs-reload']);
  gulp.watch("./dist/**/*.+(js|css)", ['bs-reload']);
  gulp.watch("./src/**/*.js", ['eslint']);
  gulp.watch('./src/**/**/**/*.scss', ['sass'])
});
