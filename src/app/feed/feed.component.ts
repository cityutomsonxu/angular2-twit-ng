import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  tweets = [];
  tweetText = "";


  constructor(private userService: UserService, private feedService: FeedService) { }

  ngOnInit() {
    this.tweets = this.feedService.getCurrentFeed();
  }


  onFavorite(tweet) {
    this.feedService.favoriteTweet(tweet);
  }

  onRetweet(tweet) {
    this.feedService.reTweet(tweet);
  }

  onNewTweet() {
    console.log(this.tweetText);
    this.feedService.postNewTweet(this.tweetText);
    this.tweetText = "";
  }

}
