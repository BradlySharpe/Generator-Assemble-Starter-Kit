module.exports = {
  options: {
    collections: [
      {
        name: 'post',
        sortby: 'posted',
        sortorder: 'descending'
      },
      {
        name: 'shop',
        sortby: 'title',
        sortorder: 'ascending'
      },
      {
        name: 'catering',
        sortby: 'title',
        sortorder: 'ascending'
      }
    ],
    helpers: '<%= config.src %>config/helpers/**/*.js',
    layout: 'page.hbs',
    layoutdir: '<%= config.src %>config/layouts/',
    partials: '<%= config.src %>config/partials/**/*.hbs'
  },
  posts: {
    files: [
      {
        cwd: '<%= config.src %>content/',
        dest: '<%= config.dest %>',
        expand: true,
        src: ['**/*.hbs', '**/*.md', '!_pages/**/*.hbs']
      },
      {
        cwd: '<%= config.src %>content/_pages/',
        dest: '<%= config.dest %>',
        expand: true,
        src: '**/*.hbs'
      }
    ]
  }
};
