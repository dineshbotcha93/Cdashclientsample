import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlowButtonsComponent } from './flow-buttons.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations:[FlowButtonsComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FlowButtonsComponent
  ]
})

export class FlowButtonsModule {}
