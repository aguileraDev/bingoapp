import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketWebService } from '@shared/services/socket-web.service';

/* Local Url: http://localhost:9091 */
const config: SocketIoConfig = { url: 'http://localhost:9091', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [CookieService, SocketWebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
