(function(){
  "use strict"
  var Country = function(map, country){
    var isoCode = country.code;
    var selector = "." + isoCode + ".land",
        coast = map.find(selector),
        inland = coast.find(selector);

    this.land =  inland.length ? inland : coast;
    this.position = country.position;
    this.land.css("fill", "blue");
    this.land.children().css("fill", "blue");//required of island countries like Philllipines
  };

  Country.prototype.highlight = function(){
    this.land.css("fill", "red");
    this.land.children().css("fill", "red");//required of island countries like Philllipines
  };

  var Map = function($map, $wrapper){
    var countries = {};
    var self = this;
    countriesToInitialize.forEach(function(country){
      countries[country.code] = new Country($map, country);
      countries[country.code].land.on("click", function(){
        countries[country.code].highlight();
        self.findCountry(country.code);
      });
    });
    this.countries = countries;
    this.$wrapper = $wrapper;
  };

  Map.prototype.findCountry = function(isoCode){
    var country = this.countries[isoCode];
    this.$wrapper.css("transform", country.position);
    country.highlight();
    return country;
  };

  window.Map = Map;
}).call(this);