import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GoogleAnalyticsService, SocketService } from './shared/services';
import { ITrack } from './shared/model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public scroll: number;
  public track: ITrack;
  public track_link: SafeResourceUrl;
  public duration: number = 0;
  constructor(public ga: GoogleAnalyticsService, private socket: SocketService, private sanitizer: DomSanitizer) { }

  @HostListener('window:scroll', ['$event'])
  public onScroll(): void {
    this.scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  public ngOnInit() {

    this.track = {
      artist: ['Bobby Womack'],
      created: '2019-07-09T02:16:18.683Z',
      duration: 200973,
      externalURL: 'https://open.spotify.com/track/6G7MHIvSDR3ehXPkuDFAlM',
      genres:
        ['classic soul',
          'disco',
          'funk',
          'motown',
          'quiet storm',
          'soul',
          'southern soul'],
      id: '6G7MHIvSDR3ehXPkuDFAlM',
      image: 'https://i.scdn.co/image/928d246343b506c06b01457497e6ed658f16695f',
      name: 'California Dreamin\'',
      query: 'California Dreamin\' by Bobby Womack'
    };
    this.track_link =
      this.sanitizer.bypassSecurityTrustResourceUrl(`https://open.spotify.com/embed/track/${this.track.id}`);
    this.initTrackFlow();
    /*this.socket.initSocket();
    this.socketService.onMessage().subscribe((track: ITrack) => {
      this.track = track;
      this.initTrackFlow();
    });*/
  }

  public initTrackFlow() {
    let x = 0;
    setTimeout(() => {
      this.track = null;
      clearInterval(trackDuration);
      this.duration = 0;
      x = 0;
    }, this.track.duration);
    const trackDuration = setInterval(() => {
      x++;
      this.duration = (x / (this.track.duration / 250)) * 100;
    }, 250);
  }

  public isScroll(): boolean {
    return this.scroll > 75;
  }
}
