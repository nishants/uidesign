(function () {
  "use strict"
  var
      setWidth = function ($e, width, duration) {
        return $e.animate({
          width: width,
        }, duration).promise();
      },
      LoaderBar = function ($bar) {
        this.$bar = $bar;
        this.updateTime = 450;
      };

  // assumes to last after extpectdTime in millis,
  // if stop is not invoked before that,
  // projects a new expected time and re adjsuts.
  LoaderBar.prototype.waitFor = function (expectedTime) {
    this.expectedTime = expectedTime;
    this.timeLeft = expectedTime;
    var self = this;
    if (this.timer) {
      clearInterval(this.timer);
    }
    self.$bar.width(0);
    this.timer = setInterval(
        function () {
          self.update();
        }, this.updateTime);

    setTimeout(function () {
      self.$bar.show();
    }, this.updateTime);
  };


  LoaderBar.prototype.update = function () {
    this.timeLeft -= this.updateTime;
    if (this.timeLeft < 0) {
      this.timeLeft = (this.expectedTime / 1.1);
    }
    var maxWidth = $(window).width(),
        percentageTimepassed = (this.timeLeft * 1.0) / this.expectedTime,
        currentWidth = maxWidth - (maxWidth * percentageTimepassed);
    setWidth(this.$bar, currentWidth, this.updateTime);
  };

  // goes to full width, and fades out
  LoaderBar.prototype.stop = function () {
    clearInterval(this.timer);
    setWidth(
        this.$bar,
        $(window).width(),
        this.updateTime);
    this.$bar.fadeOut();

  };
  window.DataLoader = LoaderBar;
}).call(this);