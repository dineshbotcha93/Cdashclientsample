import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlowDisplayComponent } from './flow-display.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations:[FlowDisplayComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FlowDisplayComponent
  ]
})

export class FlowDisplayModule {}
