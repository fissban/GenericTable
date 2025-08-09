import { PipeTransform, TemplateRef } from "@angular/core";

export type GenericTableConfig =
{
    pagination: boolean;
    pageSize: number;
    pageSizeOptions: [5, 10, 25, 50],

    showGlobalFilter: boolean;
    showExportButton: boolean;
    showColumnConfigButton: boolean;

    noDataMessage: string,
}

export type TableColumn =
    {
        // Identificador único de la columna
        key: string;
        // Etiqueta o título que se muestra en el encabezado de la tabla
        label: string;
        // Define si la columna es visible (por defecto, se asume visible)
        visible: boolean;

        // Indica si la columna es ordenable
        sortable: boolean;
        // Indica si la columna es filtrable
        filterable: boolean;
        // Tipo de celda que se utilizará para renderizar el contenido de la columna
        cellType: CellType;
        // Plantilla personalizada para renderizar el contenido de la columna
        template?: TemplateRef<any>;
        // Permite aplicar una transformación al valor de la columna mediante un Pipe junto con sus argumentos
        pipe?: { model: PipeTransform, args?: string[]; };

        // Ancho mínimo de la columna en píxeles
        minWidth?: number;
        // Ancho máximo de la columna en píxeles
        maxWidth?: number;
        // Ancho de la columna en píxeles
        width?: number;

        // Orden predeterminado ('asc' o 'desc') para establecer el orden inicial
        defaultSort?: SortType;
    };

export enum SortType
{
    ASC = 'asc',
    DESC = 'desc'
}

export enum CellType
{
    CHECKBOX = 'CHECKBOX',
    TEXT = 'TEXT',
    NUMBER = 'NUMBER',
    DATE = 'DATE',
    DATETIME = 'DATETIME',
    TIME = 'TIME',
    TEMPLATE = 'TEMPLATE', // Requiere definir el valor en la propiedad 'template'
    PIPE = 'PIPE' // Requiere definir el valor en la propiedad 'pipe'
}