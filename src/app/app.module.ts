import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

// import pages 
import { HomePage } from '../pages/home/home';
import { Tasklist } from '../pages/tasklist/tasklist';
import { Notiflist } from '../pages/notificationlist/notiflist';
import { Taskadd } from '../pages/taskadd/taskadd';
import { Taskdetail } from '../pages/taskdetail/taskdetail';
import { ConnectselectPage } from '../pages/connectselect/connectselect';

// import services 
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { LogService } from '../services/log.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Tasklist,
    Notiflist,
    Taskadd,
    Taskdetail,
    ConnectselectPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, [LogService])
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Tasklist,
    Notiflist,
    Taskadd,
    Taskdetail,
    ConnectselectPage
  ],
  providers: [
    Storage,
    TaskService,
    UserService,
    GroupService,
    LogService
  ]
})
export class AppModule {}
