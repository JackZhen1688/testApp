import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Page } from './interface-page';

@Injectable()
export class ShareService {

  private _page$ = new BehaviorSubject<Page>(<Page>({csuname: '', changed: false}));
  changedVar = this._page$.asObservable();

  changeVar(csunameStr: string, changeBln: boolean) {
   let page = <Page>({csuname: csunameStr, changed: changeBln});
   this._page$.next(page);
  }

}