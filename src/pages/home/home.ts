import { Component, ViewChild, ElementRef, OnInit, NgZone, state } from '@angular/core';
import { NavController, LoadingController, Platform, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { LoginPage } from '../../pages/login/login';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { AuthProvider } from '../../providers/auth/auth';
declare var google;



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef
  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any;
  autocompleteItems: any;
  loading: any;
  constructor(private authprovider: AuthProvider,public loadCtrl: LoadingController,public zone: NgZone,public nativegeocoder: NativeGeocoder,public geolocation: Geolocation,public navCtrl: NavController) {
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];
    this.loading = this.loadCtrl.create();
  }

  ionViewDidLoad() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 41.85, lng: -87.65 },
      zoom: 15
    })
  }

  tryGeolocation() {
    this.loading.present();
    this.clearMarkers();
    this.geolocation.getCurrentPosition().then((resp)=> {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      let marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'I am here!'
      });
      this.markers.push(marker);
      this.map.setCenter(pos);
      this.loading.dismiss();
    }).catch((error) => {
      console.log('Error getting location', error)
      this.loading.dismiss();
    });
  }

  updateSearchResults() {
    if(this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({input: this.autocomplete.input},
    (predictions, status)=> {
      this.autocompleteItems = [];
      if(predictions) {
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          })
        })
      }
    })
  }

  selectSearchResult(item) {
    this.clearMarkers();
    this.autocompleteItems = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status == 'OK' && results[0]) {
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

  clearMarkers() {
    for(var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  back() {
    this.navCtrl.push(DashboardPage)
  }
  
  logout() {
    this.authprovider.signout();
    this.navCtrl.pop();
  }

 

}
