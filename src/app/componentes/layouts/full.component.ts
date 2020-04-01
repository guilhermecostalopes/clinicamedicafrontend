import { MediaMatcher } from "@angular/cdk/layout";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy
} from "@angular/core";
import * as $ from "jquery";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { MenuItems } from "../shared/menu/menu-items";

@Component({
  selector: "app-full-layout",
  templateUrl: "full.component.html",
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit {
  dir = "ltr";
  minisidebar: boolean;
  boxed: boolean;
  danger: boolean;
  blue: boolean = true;
  green: boolean;
  dark: boolean;
  sidebarOpened: any;
  mobileQuery: MediaQueryList;
  public config: PerfectScrollbarConfigInterface = {};
  _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia("(min-width: 768px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngAfterViewInit(): void {
    (<any>$(".srh-btn, .cl-srh-btn")).on("click", function() {
      (<any>$(".app-search")).toggle(200);
    });
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
