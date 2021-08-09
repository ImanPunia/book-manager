import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PageContentComponent } from '../page-content/page-content.component';
import { SliderTabComponent } from '../slider-tab/slider-tab.component';

@Injectable({
  providedIn: 'root'
})
export class PageSwitchService {
  navTabs:  SliderTabComponent[] = [];
  navBody: PageContentComponent[] = [];
  activeTab!: SliderTabComponent;
  activePage!: PageContentComponent;

  navChangeSubject: Subject<pageChange>  = new Subject<pageChange>();
  actionEvent = new EventEmitter();

  constructor() { }

  registerNavTabs(tabs: SliderTabComponent[]){
    tabs.forEach(tab => {
      this.navTabs.push(tab);
    });
  }

  registerNavBody(bodys: PageContentComponent[]){
    bodys.forEach(body => {
      this.navBody.push(body);
    });
  }

  notifyNavChange(event: pageChange){
    this.navChangeSubject.next(event);
  }

  switchNavPage(index: string){
    let switched =  false;
    const oldTab = this.activeTab;
    const nextTab  = this.navTabs.find( e => e.index === index);
    const nextPageBody= this.navBody.find(e => e.index === index);

    if(nextTab && nextPageBody){
      switched = this.switch(nextTab,nextPageBody);

      if(switched){
        const pageChangeValue = new pageChange(oldTab?oldTab.index: undefined, nextTab.index);
        this.notifyNavChange(pageChangeValue);
      }
    }

  }

  switch(nextTab: SliderTabComponent,nextPage:PageContentComponent): boolean{
    let switched = false;
    switched = this.switchTab(nextTab, switched);
    this.switchNavBody(nextPage);
    return switched;
  }

  switchTab(nextTab:SliderTabComponent, switched: boolean):  boolean{
    if(this.activeTab !== nextTab){
      if(this.activeTab){
        this.activeTab.isActive = false;
      }
      nextTab.isActive =true;
      this.activeTab = nextTab;
      switched = true;
    }
    return switched;
  }

  switchNavBody(nextTabBody: PageContentComponent){
    if(nextTabBody && nextTabBody !==  this.activePage){
      if(this.activePage){
        this.activePage.isActive  = false;

      }
      nextTabBody.isActive = true;
      this.activePage = nextTabBody;
    }
  }

}

export class pageChange{
  constructor(public oldIndex: string|undefined, public newIndex:string){}
}
