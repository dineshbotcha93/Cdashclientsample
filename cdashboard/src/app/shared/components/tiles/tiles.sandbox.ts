import { Injectable }             from "@angular/core";
import { Store }      	          from '@ngrx/store';
import { Subscription }           from "rxjs";
import { Sandbox } 			          from '../../../shared/sandbox/base.sandbox';
import * as store     	          from '../../../shared/store';
import * as tileActions       from '../../../shared/store/actions/tile.action';

import {
  Tile,
}                                 from '../../../shared/models';

@Injectable()
export class TilesSandbox extends Sandbox {
  public tilesLoaded$              = this.appState$.select(store.getTilesLoaded);

  constructor(
    protected appState$: Store<store.State>,
  ) {
    super(appState$);
    this.registerEvents();
  }

  private registerEvents(): void {
  }

  /**
   * Loads products from the server
   */
  public loadTiles(): void {
    this.appState$.dispatch(new tileActions.LoadAction())
  }
}
