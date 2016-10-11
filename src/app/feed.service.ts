import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { Tweet } from './tweet';


@Injectable()
export class FeedService {

  constructor(private http: Http, private userService: UserService) { }

  getCurrentFeed(): Observable<Tweet[]> {
    return this.http.get("/api/tweets").map(resp => {
      console.log(resp.json());
      var fetchedTweets = [];
      for (let tweet of resp.json().data) {
        fetchedTweets.push(this.getTweetFromJson(tweet));
      }
      return fetchedTweets as Array<Tweet>;
    }).catch(this.handleError);
  }

  private handleError(err) {
    console.log(err);
    return Observable.throw(err);
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
      } else {
        throw `Error fetching tweet ${tweet.id}. Received status code: ${resp.status}`;
      }
    }).catch(this.handleError);
  }

  postNewTweet(tweetText: string): Observable<Tweet> {
    let body = JSON.stringify({
      body: tweetText, author: this.userService.getCurrentUser(),
      date: new Date(), retweets: [], favorites: []
    });

    return this.http.post('/api/tweets', body).map(resp => {
      console.log(resp.json());
      return this.getTweetFromJson(resp.json().data);
    }).catch(this.handleError);
  }

  getFriends(): Observable<string[]> {
    return this.http.get("/api/friends").map(resp => resp.json().data as string[]).catch(this.handleError);
  }
}
