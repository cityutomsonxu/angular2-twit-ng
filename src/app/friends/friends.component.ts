import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends = [];
  loaded=false;

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.feedService.getFriends().subscribe(friends => {
      this.friends = friends;
      console.log(friends);
    },(err) => {
      console.log(err);
    }, () => {
      this.loaded=true;
    });
  }

}
