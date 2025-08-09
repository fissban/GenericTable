
import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, LOCALE_ID, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CellType, GenericTableConfig, SortType, TableColumn } from 'projects/generic-table/src/public-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})

export class AppComponent implements OnInit, AfterViewInit
{
    title = 'demo-app';

    theme: 'light' | 'dark' = 'light';

    toggleTheme()
    {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-bs-theme', this.theme);
    }

    @ViewChild('tableCellEstado', { static: false }) tableCellEstadoTpl!: TemplateRef<any>;
    @ViewChild('tableCellAccion', { static: false }) tableCellAccionTpl!: TemplateRef<any>;

    tableData: any[] = [];
    tableColumns: TableColumn[] = [];
    tableConfig: GenericTableConfig =
        {
            pagination: true,
            pageSize: 5,
            pageSizeOptions: [5, 10, 25, 50],

            showGlobalFilter: true,
            showExportButton: true,
            showColumnConfigButton: true,

            noDataMessage: 'No hay datos disponibles.'
        };

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit(): void
    {
        this.tableData = [
            { codigo: 1, descripcion: 'John Doe', createdAt: new Date(2025, 6, 10, 14, 23, 0, 0).toISOString(), activo: true },
            { codigo: 2, descripcion: 'Jane Smith', createdAt: new Date(2025, 5, 22, 9, 15, 0, 0).toISOString(), activo: false },
            { codigo: 3, descripcion: 'Alice Johnson', createdAt: new Date(2025, 3, 5, 18, 45, 0, 0).toISOString(), activo: false },
            { codigo: 4, descripcion: 'Bob Brown', createdAt: new Date(2025, 1, 17, 7, 5, 0, 0).toISOString(), activo: true },
            { codigo: 5, descripcion: 'Charlie White', createdAt: new Date(2025, 0, 30, 12, 30, 0, 0).toISOString(), activo: true },
            { codigo: 6, descripcion: 'Diana Prince', createdAt: new Date(2025, 2, 12, 10, 0, 0, 0).toISOString(), activo: false },
            { codigo: 7, descripcion: 'Bruce Wayne', createdAt: new Date(2025, 4, 8, 16, 20, 0, 0).toISOString(), activo: true },
            { codigo: 8, descripcion: 'Clark Kent', createdAt: new Date(2025, 7, 19, 11, 10, 0, 0).toISOString(), activo: true },
            { codigo: 9, descripcion: 'Peter Parker', createdAt: new Date(2025, 8, 2, 8, 45, 0, 0).toISOString(), activo: false },
            { codigo: 10, descripcion: 'Tony Stark', createdAt: new Date(2025, 9, 15, 13, 55, 0, 0).toISOString(), activo: true },
            { codigo: 11, descripcion: 'Natasha Romanoff', createdAt: new Date(2025, 10, 21, 17, 30, 0, 0).toISOString(), activo: false },
            { codigo: 12, descripcion: 'Steve Rogers', createdAt: new Date(2025, 11, 5, 19, 0, 0, 0).toISOString(), activo: true },
            { codigo: 13, descripcion: 'Wanda Maximoff', createdAt: new Date(2025, 6, 14, 15, 10, 0, 0).toISOString(), activo: false },
            { codigo: 14, descripcion: 'Vision', createdAt: new Date(2025, 5, 28, 20, 40, 0, 0).toISOString(), activo: true },
            { codigo: 15, descripcion: 'Scott Lang', createdAt: new Date(2025, 3, 9, 9, 25, 0, 0).toISOString(), activo: false },
            { codigo: 16, descripcion: 'Hope Van Dyne', createdAt: new Date(2025, 2, 23, 14, 50, 0, 0).toISOString(), activo: true },
            { codigo: 17, descripcion: 'Stephen Strange', createdAt: new Date(2025, 1, 3, 18, 5, 0, 0).toISOString(), activo: true },
            { codigo: 18, descripcion: 'T Challa', createdAt: new Date(2025, 0, 27, 7, 40, 0, 0).toISOString(), activo: false },
            { codigo: 19, descripcion: 'Shuri', createdAt: new Date(2025, 8, 13, 12, 15, 0, 0).toISOString(), activo: true },
            { codigo: 20, descripcion: 'Sam Wilson', createdAt: new Date(2025, 9, 29, 16, 35, 0, 0).toISOString(), activo: false },
            { codigo: 21, descripcion: 'Bucky Barnes', createdAt: new Date(2025, 10, 11, 10, 55, 0, 0).toISOString(), activo: true },
            { codigo: 22, descripcion: 'Nick Fury', createdAt: new Date(2025, 11, 25, 21, 20, 0, 0).toISOString(), activo: false },
            { codigo: 23, descripcion: 'Carol Danvers', createdAt: new Date(2025, 6, 6, 13, 10, 0, 0).toISOString(), activo: true },
            { codigo: 24, descripcion: 'Groot', createdAt: new Date(2025, 5, 18, 8, 30, 0, 0).toISOString(), activo: false },
            { codigo: 25, descripcion: 'Rocket Raccoon', createdAt: new Date(2025, 3, 1, 17, 45, 0, 0).toISOString(), activo: true },
        ];
        // Inicializa las columnas sin las plantillas

    }

    ngAfterViewInit(): void
    {
        // Asigna las plantillas después de la inicialización de la vista
        this.tableColumns = [
            {
                key: 'codigo',
                label: 'Código',
                visible: true,
                sortable: true,
                defaultSort: SortType.ASC,
                filterable: true,
                cellType: CellType.NUMBER,

            },
            {
                key: 'descripcion',
                label: 'Descripción',
                visible: true,
                sortable: true,
                filterable: true,
                cellType: CellType.TEXT,
                minWidth: 200
            },
            {
                key: 'createdAt',
                label: 'Fecha de alta',
                visible: true,
                sortable: true,
                filterable: true,
                //pipe: { model: new DatePipe('es-AR'), args: ['dd/MM/yy'] },
                cellType: CellType.DATETIME
            },
            {
                key: 'activo',
                label: 'Estado',
                visible: true,
                sortable: true,
                filterable: false,
                template: this.tableCellEstadoTpl,
                cellType: CellType.TEMPLATE
            },
            {
                key: 'acciones',
                label: 'Acciones',
                visible: true,
                sortable: false,
                filterable: false,
                template: this.tableCellAccionTpl,
                cellType: CellType.TEMPLATE
            }
        ];
        this.cdr.detectChanges();
    }

}