if (window.sliders)
  window.sliders.forEach(function(config, index) {
    config.slider = {
      sliderIndex: index,
      currentIndex: 0,
      timer: undefined,
      interval: 5e3,
      next:function(){
        var e;
        if ((this.slider.currentIndex + 1) > (this.slides.length - 1)) {
          this.slider.currentIndex = 0;
          e = document.getElementById(this.slides[this.slider.currentIndex]);
        } else {
          this.slider.currentIndex = this.slider.currentIndex + 1;
          e = document.getElementById(this.slides[this.slider.currentIndex]);
        }
        if (e)
          e.checked = true;
      },
      start:function(){
        if (!this.timer) {
          this.timer = setInterval(
            function() {
              window.sliders[index].slider.next.call(window.sliders[index]);
            }, this.interval
          );
        }
      },
      stop:function(){
        if (this.timer)
          clearInterval(this.timer);
        this.timer = undefined;
      },
      init:function(interval) {
        this.interval = interval || this.interval;
        window.sliders[this.sliderIndex].slides.forEach(
          function(v) {
            var e = document.getElementById(v);
            if (e)
              e.onclick = function(){ window.sliders[index].slider.stop(); };
          }
        );
      }
    };

    config.slider.init(config.interval);
    if (config.autostart)
      config.slider.start();
  });
