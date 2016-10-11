import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { Tweet } from './tweet';


@Injectable()
export class FeedService {

  private tweets = [
    new Tweet(1, 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', 'Glen', new Date(), ['Joe'], []),
    new Tweet(2, 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight', 'Joe', new Date(), [], ['Mary']),
    new Tweet(3, 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', 'Mary', new Date(), ['Glen'], ['Mary']),
    new Tweet(4, 'People think that computer science is the art of geniuses but the actual reality is the opposite, just many people doing things that build on each other, like a wall of mini stones', 'Glen', new Date(), ['Joe', 'Mary'], []),
    new Tweet(5, 'You can’t have great software without a great team, and most software teams behave like dysfunctional families.', 'Joe', new Date(), [], ['Mary', 'Glen']),
  ];

  constructor(private http: Http, private userService: UserService) { }

  getCurrentFeed(): Observable<Tweet[]> {
    return this.http.get("/api/tweets").map(resp => {
      console.log(resp.json());
      var fetchedTweets = [];
      for (let tweet of resp.json().data) {
        fetchedTweets.push(this.getTweetFromJson(tweet));
      }
      return fetchedTweets as Array<Tweet>;
    });
  }

  private getTweetFromJson(obj: Tweet): Tweet {
    return new Tweet(
      obj.id, obj.body, obj.author, obj.date, obj.retweets, obj.favorites)
  }

  private isUserInCollection(collection: string[], userId: string): boolean {
    return collection.indexOf(userId) != -1;
  }

  favoriteTweet(tweet: Tweet) {
    if (!this.isUserInCollection(tweet.favorites, this.userService.getCurrentUser())) {
      tweet.favorites.push(this.userService.getCurrentUser());
      this.updateTweet(tweet).subscribe(resp => console.log(resp));
    }
  }

  reTweet(tweet: Tweet) {
    if (!this.isUserInCollection(tweet.retweets, this.userService.getCurrentUser())) {
      tweet.retweets.push(this.userService.getCurrentUser());
      this.updateTweet(tweet).subscribe(resp => console.log(resp));
    }
  }

  updateTweet(tweet: Tweet) {
    let body = JSON.stringify(tweet);

    let url = `/api/tweets/${tweet.id}`;

    return this.http.put(url, body).map(resp => {
        console.log(resp);
        if (resp.status == 204) {
          console.log("Update tweet successfully. Yay!");
        }
      });
  }

  postNewTweet(tweetText: string): Observable<Tweet> {
    let body = JSON.stringify({
      body: tweetText, author: this.userService.getCurrentUser(),
      date: new Date(), retweets: [], favorites: []
    });

    return this.http.post('/api/tweets', body).map(resp => {
      console.log(resp.json());
      return this.getTweetFromJson(resp.json().data);
    });
  }

  getFriends(): Observable<string[]> {
    return this.http.get("/api/friends").map(resp => resp.json().data as string[]);
  }
}
