module.exports = {
  options: {
    nokey: true,
    locale: '<%= config.pagespeed.locale %>',
    url: '<%= pkg.protocol %>://<%= pkg.domain %>/'
  },
  desktop: {
    options: {
      strategy: "desktop",
      threshold: '<%= config.pagespeed.threshold.desktop %>',
      paths: '<%= config.pagespeed.pages %>',
    }
  },
  mobile: {
    options: {
      strategy: "mobile",
      threshold: '<%= config.pagespeed.threshold.mobile %>',
      paths: '<%= config.pagespeed.pages %>',
    }
  }
};
