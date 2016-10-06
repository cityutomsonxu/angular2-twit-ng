import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FeedComponent } from './feed/feed.component';
import { UserService } from './user.service';
import { FeedService } from './feed.service';
import { MessagesComponent } from './messages/messages.component';
import { FriendsComponent } from './friends/friends.component';
import {routing} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FeedComponent,
    MessagesComponent,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [UserService, FeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
