/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FeedComponent } from './feed.component';
import { FeedService } from '../feed.service';
import { UserService } from '../user.service';
import { MockFeedService } from '../mock.feed.service';
import { Tweet } from '../tweet';

describe('Component: Feed', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FeedComponent,
      ],
      providers: [
        { provide: FeedService, useClass: MockFeedService },
        UserService,
      ],
      imports: [
        FormsModule
      ]
    });
  });


  it('should create an instance', () => {
    let component = new FeedComponent(null, null);
    expect(component).toBeTruthy();
  });

  it('should retrieve things on init..', () => {
    let fixture = TestBed.createComponent(FeedComponent);
    let feedComponent = fixture.debugElement.componentInstance as FeedComponent;

    expect(feedComponent.loaded).toBeFalsy();
    expect(feedComponent.tweets.length).toEqual(0);

    feedComponent.ngOnInit();

    expect(feedComponent.tweets.length).toEqual(2);
    expect(feedComponent.loaded).toBeTruthy();
  });

  it('should favorite and retweet appropriately..', () => {

    let fixture = TestBed.createComponent(FeedComponent);
    let app = fixture.debugElement.componentInstance as FeedComponent;

    let tweet = new Tweet(125, 'Another Mock Tweet', 'Glen', new Date(), [], []);

    expect(tweet.favorites.length).toEqual(0);
    app.onFavorite(tweet);
    expect(tweet.favorites.length).toEqual(1);

    expect(tweet.retweets.length).toEqual(0);
    app.onRetweet(tweet);
    expect(tweet.retweets.length).toEqual(1);

  });
});
