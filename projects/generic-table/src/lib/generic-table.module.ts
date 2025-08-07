import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GenericTableComponent } from './component/generic-table.component';

@NgModule({
    declarations:
        [
            GenericTableComponent
        ],
    imports:
        [
            CommonModule,
            FormsModule,
            DragDropModule
        ],
    exports:
        [
            GenericTableComponent
        ]
})
export class GenericTableModule { }
