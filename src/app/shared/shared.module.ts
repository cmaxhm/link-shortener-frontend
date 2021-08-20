import { NgModule } from '@angular/core';

import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzInputModule } from "ng-zorro-antd/input";

@NgModule({
  declarations: [],
  imports: [
    NzMenuModule
  ],
  exports: [
    NzMenuModule,
    NzInputModule
  ]
})
export class SharedModule { }
