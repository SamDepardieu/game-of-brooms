import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

// import pages 
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { Tasklist } from '../pages/tasklist/tasklist';
import { Notiflist } from '../pages/notificationlist/notiflist';
import { Taskadd } from '../pages/taskadd/taskadd';
import { Taskdetail } from '../pages/taskdetail/taskdetail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    Tasklist,
    Notiflist,
    Taskadd,
    Taskdetail
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    Tasklist,
    Notiflist,
    Taskadd,
    Taskdetail
  ],
  providers: [
    Storage
  ]
})
export class AppModule {}
