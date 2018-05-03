$(document).ready(function () {
    "use strict";

    var regionData,provinceData,cityData,bloodType,cityOptions, $regions, $provinces, $cities;

    function updateProvince() {
        var provinces = $.map(regionData[this.value], function (province) {
            return $("<option />").text(province);
        });
        $("#province").empty().append(provinces);
    }
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
    $.getJSON("Json_Files/Province.json", function (data) {
        var region;
        regionData = data;
        $regions = $("#region").on("change", updateProvince);
        for (region in regionData) {
            $("<option />").text(region).appendTo($regions);
        }
        $regions.change();
    });
    $.getJSON("Json_Files/Cities.json", function (data) {
        provinceData = data;
        $cities = $("#province").on("change", updateCity);
    });
});