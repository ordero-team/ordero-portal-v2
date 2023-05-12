import { MapsAPILoader } from '@agm/core';
import { AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'aka-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @Output() emitCurLocation = new EventEmitter();
  @Output() onClose = new EventEmitter<any>();
  @Output() onSuccess = new EventEmitter<any>();

  @ViewChild('search') public searchElementRef: ElementRef;

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  web_site: string;
  name: string;
  zip_code: string;
  private geoCoder;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.findAdress();
  }

  ngOnInit(): void {
    this.loadMapOnInit();
  }

  loadMapOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getAddress(this.latitude, this.longitude);
        this.zoom = 15;
      });
    }
  }

  public mapReady(map) {
    map.addListener('dragend', () => {
      this.latitude = map.getCenter().lat();
      this.longitude = map.getCenter().lng();
      this.getAddress(map.getCenter().lat(), map.getCenter().lng());
    });
  }

  findAdress() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // some details
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.address = place.formatted_address;
          this.web_site = place.website;
          this.name = place.name;
          this.zip_code = place.address_components[place.address_components.length - 1].long_name;
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      this.ngZone.run(() => {
        // this.gs.log('results', results);
        // this.gs.log('status', status);
        if (status === 'OK') {
          if (results[0]) {
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    });
  }

  markerDragEnd(event: google.maps.MouseEvent) {
    this.latitude = event.latLng.lat();
    this.longitude = event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }

  async SubmitMap() {
    this.onSuccess.emit({
      address: this.address,
      latlong: `${this.latitude},${this.longitude}`,
    });
  }

  close() {
    this.onClose.emit();
  }
}
