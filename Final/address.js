$(document).ready(function () {
    "use strict";

    var regionData,provinceData,cityData,cityOptions, $regions, $provinces, $cities;


    function updateCity(){
        var cities = $.map(provinceData[this.value], function (city){
            return $("<option />").text(city);
        });
        $("#city").empty().append(cities);
    }
    function updateBaranggay(){
        var baranggays = $.map(cityData[this.value], function (baranggay){
            return $("<option />").text(baranggay);
        });
        $("#brgy").empty().append(baranggays);
    }
    $.getJSON("Province.json", function (data) {
        var province;
        provinceData = data;
        $provinces = $("#province").on("change", updateCity);
        for (province in provinceData) {
            $("<option />").text(province).appendTo($provinces);
        }
        $provinces.change();
    });
    $.getJSON("Cities.json", function (data) {
        provinceData = data;
        $cities = $("#province").on("change", updateBaranggay);
    });
   
   
});