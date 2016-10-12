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
  errorText = "";
  loaded=false;



  constructor(private userService: UserService, private feedService: FeedService) { }

  ngOnInit() {
    this.feedService.getCurrentFeed().subscribe(tweets => {
      console.log(tweets);
      this.tweets = tweets;
    }, (err) => {
      this.errorText = `Oh No! We have experienced an internal error. (the underlying error was ${err}) `;
    }, () => {
      this.loaded=true;
    });
  }


  onFavorite(tweet) {
    this.feedService.favoriteTweet(tweet);
  }

  onRetweet(tweet) {
    this.feedService.reTweet(tweet);
  }

  onNewTweet() {
    console.log(this.tweetText);
    this.feedService.postNewTweet(this.tweetText).subscribe((newTweet) => {
      console.log(newTweet);
      this.tweets.unshift(newTweet);
    }, (err) => {
      this.errorText = `Oh No! We have experienced an internal error. (the underlying error was ${err}) `;
    });
    this.tweetText = "";
  }

}
