import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import localeEsHN from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { LoadingInterceptor } from './interceptors/loading.interceptor';


registerLocaleData( localeEsHN );


/**
 * Modulo principal de la aplicacion, contiene
 * todos los componentes y modulos de inicio
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MenubarModule,
    HttpClientModule,
    ButtonModule,
    AvatarModule,
    OverlayPanelModule,
    MenuModule,
    ProgressSpinnerModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    }
  ],
  bootstrap: [ AppComponent],
})
export class AppModule { }
