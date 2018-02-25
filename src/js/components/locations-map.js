import { TweenMax } from 'gsap';

class LocationsMap {
  constructor() {
    this.$map = $('#locations-map');

    if (this.$map.length) this.init();
  }

  init() {
    this.initMap();
  }

  initMap() {
    this.$markerImg = this.$map.data('marker-img');
    this.$mapZoom = this.$map.data('map-zoom');
    this.$mapCenter = this.$map.data('map-center').split(';').map(parseFloat);
    this.$activeMarker = this.$map.data('marker-active') - 1;
    this.$title = $('.locations__text-title');
    this.$street = $('.locations__text-street');
    this.markersCount = 10;
    const _this = this;

    const locationMap = new google.maps.Map(document.getElementById('locations-map'), {
      center: new google.maps.LatLng(this.$mapCenter[0], this.$mapCenter[1]),
      zoom: this.$mapZoom,
      disableDefaultUI: true
    });

    const markersData = [];
    const markers = [];
    let formattedMarkerData;

    for (let k = 1; k < this.markersCount; k++) {
      const markerData = _this.$map.data(`marker-${k}`);

      if (!markerData) continue;

      formattedMarkerData = markerData.split(';');
      markersData.push(formattedMarkerData);
    }

    for (const i of markersData.keys()) {
      const lat = parseFloat(markersData[i][2]);
      const lng = parseFloat(markersData[i][3]);
      const title = markersData[i][0];
      const street = markersData[i][1];
      const position = new google.maps.LatLng(lat, lng);
      const iconZoomed = { url: `${_this.$markerImg}`, scaledSize: new google.maps.Size(75, 79) };

      const marker = new google.maps.Marker({
        position: position,
        icon: `${_this.$markerImg}`,
        map: locationMap
      });

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', ((marker, i) => {
        return function () {

          for (const j of markers.keys()) {
            markers[j].setIcon(`${_this.$markerImg}`);
          }

          TweenMax.fromTo(_this.$title, .7, { y: -25, autoAlpha: 0 }, { ease: Elastic.easeOut.config(1, 0.3), y: 0, autoAlpha: 1 });
          TweenMax.fromTo(_this.$street, .7, { y: -25, autoAlpha: 0 }, { ease: Elastic.easeOut.config(1, 0.3), y: 0, autoAlpha: 1 });

          _this.$title.text(title);
          _this.$street.text(street);

          this.setIcon(iconZoomed);
          this.setAnimation(google.maps.Animation.BOUNCE);

          setTimeout(() => {
            marker.setAnimation(null);
          }, 500);

        };
      })(marker, i));
    }

    google.maps.event.addDomListener(window, 'load', () => {
      google.maps.event.trigger(markers[_this.$activeMarker], 'click');
    });
  }
}

export const LocationsMapAPI = new LocationsMap();
