/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import {Tweet} from './tweet';

describe('Tweet', () => {
  it('should create an instance', () => {
    expect(new Tweet(1, '', '', new Date(), [], [])).toBeTruthy();
  });
});
