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
    this.$title = $('.locations__info-title');
    this.$street = $('.locations__info-street');
    this.markersCount = 10;
    const _this = this;

    const mapStyle = [
      {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "hue": "#00ffa8"
          },
          {
            "saturation": "5"
          },
          {
            "gamma": "6.86"
          },
          {
            "lightness": "-35"
          },
          {
            "weight": "0.75"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#52957e"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "saturation": "62"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "hue": "#00ffcd"
          },
          {
            "saturation": "-4"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "hue": "#00ff80"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "saturation": "30"
          },
          {
            "hue": "#00ffa8"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "off"
          },
          {
            "color": "#84dabd"
          },
          {
            "lightness": "16"
          },
          {
            "weight": "1.88"
          },
          {
            "saturation": "21"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "saturation": "21"
          },
          {
            "color": "#00c996"
          },
          {
            "lightness": "-43"
          },
          {
            "gamma": "1.72"
          },
          {
            "weight": "1.98"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "saturation": "-29"
          },
          {
            "lightness": "2"
          },
          {
            "color": "#d9faef"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "off"
          },
          {
            "saturation": "67"
          },
          {
            "hue": "#00ffa8"
          },
          {
            "lightness": "4"
          }
        ]
      },
      {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2b5d4c"
          },
          {
            "saturation": "-8"
          },
          {
            "lightness": "0"
          },
          {
            "gamma": "4.77"
          },
          {
            "weight": "6.22"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#00583a"
          },
          {
            "saturation": "19"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#90edbb"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "off"
          },
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#b1f3ee"
          }
        ]
      }
    ];

    const locationMap = new google.maps.Map(document.getElementById('locations-map'), {
      center: new google.maps.LatLng(this.$mapCenter[0], this.$mapCenter[1]),
      zoom: this.$mapZoom,
      disableDefaultUI: true,
      styles: mapStyle
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
