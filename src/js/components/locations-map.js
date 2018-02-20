class LocationsMap {
  constructor() {
    this.$map = $('#locations-map');
    this.$markerImg = this.$map.data('marker-img');
    this.$mapCenter = this.$map.data('map-center').split(',').map(parseFloat);
    this.$mapZoom = this.$map.data('map-zoom');
    this.$marker1Coords = this.$map.data('marker-1').split(',');
    this.$marker2Coords = this.$map.data('marker-2').split(',');
    this.$title = $('.locations__text-title');
    this.$street = $('.locations__text-street');

    if (this.$map.length) this.init();
  }

  init() {
    this.initMap();
  }

  initMap() {
    const _this = this;

    const locationMap = new google.maps.Map(document.getElementById('locations-map'), {
      center: new google.maps.LatLng(this.$mapCenter[0], this.$mapCenter[1]),
      zoom: this.$mapZoom,
      disableDefaultUI: true
    });

    const markers = [
      this.$marker1Coords,
      this.$marker2Coords
    ];

    let marker, i;

    for (i = 0; i < markers.length; i++) {
      const lat = parseFloat(markers[i][2]);
      const lng = parseFloat(markers[i][3]);
      const title = markers[i][0];
      const street = markers[i][1];
      const position = new google.maps.LatLng(lat, lng);

      marker = new google.maps.Marker({
        position: position,
        icon: `${this.$markerImg}`,
        map: locationMap
      });

      google.maps.event.addListener(marker, 'click', ((i) => {
        return () => {

          _this.$title.text(title);
          _this.$street.text(street);

          // locationMap.setCenter(marker.getPosition());
          // locationMap.setZoom(16);

          // marker.setIcon('static/img/map-marker-zoom.png');
        };
      })(i));
    }

    google.maps.event.addDomListener(window, 'load', () => {
      _this.$title.text(this.$marker1Coords[0]);
      _this.$street.text(this.$marker1Coords[1]);
    });
  }
}

export const LocationsMapAPI = new LocationsMap();
