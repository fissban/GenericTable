import { Component, Input, OnInit, ViewEncapsulation, OnChanges, SimpleChanges, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as XLSX from 'xlsx-js-style';
import { GenericTableConfig, SortType, TableColumn } from '../models/models';

@Component
    ({
        selector: 'generic-table',
        templateUrl: './generic-table.component.html',
        styleUrls: ['./generic-table.component.css'],
        encapsulation: ViewEncapsulation.None
    })
export class GenericTableComponent implements OnInit, OnChanges
{
    @ViewChild('excelTable', { read: ElementRef }) excelTable: ElementRef<HTMLDivElement> | any;

    // Entrada de datos para la tabla
    @Input({ required: true }) public data: (Record<string, any> & { rowClass?: string; })[] = [];
    // Configuración de columnas
    @Input({ required: true }) public columns: TableColumn[] = [];
    // Identificador único para cada tabla
    @Input({ required: true }) public tableId: string = 'default-table';
    // Configuración de la tabla, con valores por defecto
    @Input({ required: false }) public config: GenericTableConfig = {
        pagination: true,
        pageSize: 5,
        pageSizeOptions: [5, 10, 25, 50],

        showGlobalFilter: true,
        showExportButton: true,
        showColumnConfigButton: true,
        responsive: { enable: false, breakpoint: 0 },
        noDataMessage: 'No hay datos disponibles.'
    };

    public showConfigMenu = false;

    public columnsFilters: { [key: string]: any; } = {};
    // Controla la visualización de los filtros
    public columnsShowFilter: { [key: string]: boolean; } = {};


    // Filtro global para buscar en la tabla
    public globalFilterInput: string = '';
    public globalFilters: string[] = [];

    // Clave actual de ordenamiento
    public sortKey: string = '';
    // Orden de clasificación: 'asc' o 'desc'
    public sortOrder: SortType = SortType.ASC;

    // Índice del elemento que se está arrastrando
    public draggingIndex: number | null = null;

    // Estado de paginación
    public currentPage: number = 1;

    isResponsiveActive = false;

    constructor()
    {
        //
    }

    public ngOnInit(): void
    {
        const configStr = localStorage.getItem('table-config-' + this.tableId);
        if (configStr)
        {
            const config = JSON.parse(configStr);
            // Reordena según lo guardado
            this.columns.sort((a, b) =>
            {
                const idxA = config.columns.findIndex((c: any) => c.key == a.key);
                const idxB = config.columns.findIndex((c: any) => c.key == b.key);
                return idxA - idxB;
            });
            // Visibilidad según lo guardado

            this.columns.forEach(col =>
            {
                const found = config.columns.find((c: any) => c.key == col.key);
                if (found) col.visible = found.visible;
            });
        }

        this.evaluateResponsive();
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        if (changes['columns'] && Array.isArray(this.columns) && this.columns.length > 0)
        {
            // Solo setea si no hay sortKey o si la columna con defaultSort cambió
            const defaultSortCol = this.columns.find(col => col.defaultSort);
            if (defaultSortCol)
            {
                this.sortKey = defaultSortCol.key;
                this.sortOrder = defaultSortCol.defaultSort!;
            }
        }
    }

    // Retorna los datos filtrados (sin paginar)
    public getFilteredData(): any[]
    {
        let result = this.data;

        // Filtros por columna
        for (const key of Object.keys(this.columnsFilters))
        {
            if (this.columnsFilters[key])
            {
                result = result.filter(row => row[key] == this.columnsFilters[key]);
            }
        }

        // Filtro global
        if (this.globalFilters.length > 0) 
        {
            result = result.filter(row =>
                this.globalFilters.every(filter =>
                    this.columns.some(header => 
                    {
                        const value = row[header.key];
                        return value != undefined && value != null && value.toString().toLowerCase().includes(filter.toLowerCase());
                    })
                )
            );
        }

        // Ordenamiento
        if (this.sortKey)
        {
            result = result.sort((a, b) =>
            {
                const valA = a[this.sortKey];
                const valB = b[this.sortKey];

                if (valA == null && valB != null) return this.sortOrder == 'asc' ? -1 : 1;
                if (valA != null && valB == null) return this.sortOrder == 'asc' ? 1 : -1;
                if (valA == null && valB == null) return 0;

                if (valA < valB) return this.sortOrder == 'asc' ? -1 : 1;
                if (valA > valB) return this.sortOrder == 'asc' ? 1 : -1;
                return 0;
            });
        }
        return result;
    }

    // Devuelve los datos de la página actual (paginados)
    public getPagedData(): (Record<string, any> & { rowClass?: string; })[]
    {
        if (!this.config?.pagination) return this.getFilteredData();
        const filtered = this.getFilteredData();
        const start = (this.currentPage - 1) * (this.config.pageSize || 10);
        const end = start + (this.config.pageSize || 10);
        return filtered.slice(start, end);
    }

    // Cambia la cantidad de items por página y reinicia la página actual
    public onItemsPerPageChange(value: number): void
    {
        if (this.config)
        {
            this.config.pageSize = value;
            this.currentPage = 1;
        }
    }

    // Total de páginas para la paginación
    public get totalPages(): number
    {
        if (!this.config?.pagination) return 1;
        const total = this.data ? this.data.length : 0;
        const perPage = this.config.pageSize || 10;
        return Math.max(1, Math.ceil(total / perPage));
    }

    // Cambia de página
    public goToPage(page: number): void
    {
        if (page < 1 || page > this.totalPages) return;
        this.currentPage = page;
    }


    // Retorna únicamente las columnas visibles
    public getVisibleColumns(): TableColumn[]
    {
        return this.columns.filter(h => h.visible);
    }

    // Retorna opciones únicas basadas en la clave especificada
    public getColumnOptions(key: string): any[]
    {
        return Array.from(new Set(this.data.map(row => row[key]))).filter(v => v != undefined && v != null);
    }

    // Alterna la visualización del filtro para la columna indicada
    public toggleFilter(key: string): void
    {
        this.columnsShowFilter[key] = !this.columnsShowFilter[key];
    };

    // Establece el filtro para una columna y guarda la configuración
    public setFilter(key: string, event: Event | ''): void
    {
        let value = '';
        if (event != '')
        {
            value = (event.target as HTMLInputElement).value;
        }
        this.columnsFilters[key] = value;
        this.columnsShowFilter[key] = false;
        this.saveTableConfig();
    }

    // Aplica el filtro global
    public applyGlobalFilter(): void
    {
        // Solo dispara el getter filteredData, no es necesario nada aquí si usas el getter
    };

    // Limpia el filtro global aplicado
    public clearGlobalFilter(): void
    {
        this.globalFilterInput = '';
        this.globalFilters = [];
        this.applyGlobalFilter();
    };

    // Realiza la ordenación de la columna especificada
    public sortColumn(key: string): void
    {
        if (this.sortKey == key)
        {
            this.sortOrder = this.sortOrder == SortType.ASC ? SortType.DESC : SortType.ASC;
        }
        else
        {
            this.sortKey = key;
            this.sortOrder = SortType.ASC;
        }
    }

    // Reordena las columnas tras la acción de drag & drop
    public dropColumn(event: CdkDragDrop<string[]>): void
    {
        moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
        this.saveTableConfig();
    };

    // Inicia la operación de arrastre de una columna
    public onDragStarted(index: number): void
    {
        this.draggingIndex = index;
    };

    // Finaliza la operación de arrastre de una columna
    public onDragEnded(): void
    {
        this.draggingIndex = null;
    };

    // Función para actualizar la visibilidad de la columna
    public onVisibilityChange(header: TableColumn, event: Event): void
    {
        const inputElement = event.target as HTMLInputElement;
        header.visible = inputElement.checked;
        // Guarda la configuración actualizada de la tabla si es necesario
        this.saveTableConfig();
    };

    // Guarda la configuración actual de la tabla en localStorage
    public saveTableConfig(): void
    {
        const config = { columns: this.columns.map(col => ({ key: col.key, visible: col.visible })) };
        localStorage.setItem('table-config-' + this.tableId, JSON.stringify(config));
    };

    //genera un chip al presionar espacio o enter en el input de filtro global
    public onGlobalFilterKeydown(event: KeyboardEvent): void
    {
        if (event.key == ' ' || event.key == 'Enter') 
        {
            const value = this.globalFilterInput.trim();
            //evita agregar filtros vacíos o duplicados
            if (value && !this.globalFilters.includes(value)) 
            {
                this.globalFilters.push(value);
                this.globalFilterInput = '';
                this.applyGlobalFilter();
            }
            event.preventDefault();
        }
    }

    //elimina un filtro global específico por su índice
    public removeGlobalFilter(index: number): void
    {
        this.globalFilters.splice(index, 1);
        this.applyGlobalFilter();
    }

    public exportToExcel(): void
    {
        const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.excelTable.nativeElement, { raw: true });
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
        XLSX.writeFileXLSX(workbook, 'data.xlsx', { compression: true });
    }

    @HostListener('window:resize')
    onWindowResize()
    {
        this.evaluateResponsive();
    }

    private evaluateResponsive()
    {
        const enabled = this.config?.responsive?.enable;
        const bp = this.config?.responsive?.breakpoint ?? Number.POSITIVE_INFINITY;
        this.isResponsiveActive = !!enabled && window.innerWidth <= bp;
    }
}
