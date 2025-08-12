# ng-generic-table

> Componente de tabla genérica para Angular 16+ con soporte para temas claro/oscuro, filtros, paginación y más.

# Demo

[Ver demo en GitHub Pages](https://fissban.github.io/GenericTable/)

# GenericTableWorkspace

[![Ver en GitHub](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/fissban/GenericTable)

# ng-generic-table

<img width="800" height="300" alt="tabla-modo-claro" src="https://github.com/user-attachments/assets/b6f63946-4eaa-4f5a-86a1-6cc1ab08850a" />
<img width="800" height="300" alt="tabla-modo-oscuro png" src="https://github.com/user-attachments/assets/e92f5d51-8786-4ed5-a1f8-4307c100d4a0" />

## Requisitos

- **Angular**: >=16.2.0
- **Bootstrap**: >=5.3.0
- **bootstrap-icons**: >=1.13.1

## Instalación

```bash
npm install ng-generic-table bootstrap bootstrap-icons
```

## Uso básico

1. Importa el módulo en tu aplicación:

```typescript
import { GenericTableModule } from 'ng-generic-table';

@NgModule({
  imports: [GenericTableModule]
})
export class AppModule { }
```

2. Agrega los estilos de Bootstrap y Bootstrap Icons en tu `angular.json`:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css",
  "src/styles.css"
]
```

3. Usa el componente en tu template:

```html
<generic-table [data]="tuDataSource" [columns]="columnas" [config]="config"></generic-table>
```


## Compatibilidad

- Angular 16+
- Bootstrap 5+


## Definición de columnas

El array `columns` define las columnas que se mostrarán en la tabla. Cada columna debe seguir el modelo `TableColumn`:

| Propiedad     | Tipo                                      | Requerido | Descripción                                                                 |
|---------------|-------------------------------------------|-----------|-----------------------------------------------------------------------------|
| `key`         | string                                    | Sí        | Identificador único de la columna.                                          |
| `label`       | string                                    | Sí        | Etiqueta o título del encabezado.                                           |
| `visible`     | boolean                                   | Sí        | Define si la columna es visible.                                            |
| `sortable`    | boolean                                   | Sí        | Indica si la columna es ordenable.                                          |
| `filterable`  | boolean                                   | Sí        | Indica si la columna es filtrable.                                          |
| `cellType`    | CellType                                  | Sí        | Tipo de celda para renderizar el contenido.                                 |
| `template`    | TemplateRef<any>                          | No        | Plantilla personalizada (si `cellType` es `TEMPLATE`).                      |
| `pipe`        | { model: PipeTransform; args?: string[] } | No        | Aplica un Pipe al valor de la columna con argumentos opcionales.            |
| `minWidth`    | number                                    | No        | Ancho mínimo de la columna en píxeles.                                      |
| `maxWidth`    | number                                    | No        | Ancho máximo de la columna en píxeles.                                      |
| `width`       | number                                    | No        | Ancho fijo de la columna en píxeles.                                        |
| `defaultSort` | SortType                                  | No        | Orden inicial de la columna (`SortType.ASC` o `SortType.DESC`).             |

### Tipos de celda (`CellType`)

- `TEXT` — Texto simple
- `NUMBER` — Número
- `DATE` — Fecha
- `DATETIME` — Fecha y hora
- `TIME` — Hora
- `CHECKBOX` — Checkbox
- `TEMPLATE` — Usa la plantilla personalizada definida en `template`
- `PIPE` — Aplica el pipe definido en `pipe`

### Ejemplo de definición:

```typescript
import { CellType, SortType, TableColumn } from 'ng-generic-table';

columns: TableColumn[] = [
  { key: 'id', label: 'ID', visible: true, sortable: true, filterable: true, cellType: CellType.NUMBER, defaultSort: SortType.ASC, width: 90 },
  { key: 'nombre', label: 'Nombre', visible: true, sortable: true, filterable: true, cellType: CellType.TEXT, minWidth: 180 },
  { key: 'fecha', label: 'Fecha', visible: true, sortable: true, filterable: false, cellType: CellType.DATE },
  { key: 'activo', label: 'Activo', visible: true, sortable: false, filterable: true, cellType: CellType.CHECKBOX },
  // Ejemplo usando PIPE (inyecta el pipe en tu componente y pásalo aquí)
  // { key: 'monto', label: 'Monto', visible: true, sortable: true, filterable: true, cellType: CellType.PIPE, pipe: { model: currencyPipe, args: ['USD', 'symbol', '1.2-2'] } }
];
```

### Configuración de la tabla

La interfaz `GenericTableConfig` permite personalizar el comportamiento general de la tabla, como la paginación, filtros, exportación y mensajes personalizados.

#### Definición

```typescript
export type GenericTableConfig = {
  pagination: boolean;                // Habilita o deshabilita la paginación
  pageSize: number;                   // Cantidad de filas por página
  pageSizeOptions: [5, 10, 25, 50];   // Opciones disponibles para el tamaño de página
  showGlobalFilter: boolean;          // Muestra/oculta el filtro global
  showExportButton: boolean;          // Muestra/oculta el botón de exportar
  showColumnConfigButton: boolean;    // Muestra/oculta el botón de configuración de columnas
  responsive: { enable: boolean; breakpoint: number }; // Modo responsive y breakpoint (px)
  noDataMessage: string;              // Mensaje a mostrar cuando no hay datos
}
```

#### Propiedades

| Propiedad                | Tipo                  | Descripción                                                        |
|--------------------------|---------------------- |--------------------------------------------------------------------|
| `pagination`             | boolean               | Habilita o deshabilita la paginación.                              |
| `pageSize`               | number                | Cantidad de filas por página.                                      |
| `pageSizeOptions`        | [5, 10, 25, 50]       | Opciones disponibles para el tamaño de página.                     |
| `showGlobalFilter`       | boolean               | Muestra u oculta el filtro global.                                 |
| `showExportButton`       | boolean               | Muestra u oculta el botón de exportar.                             |
| `showColumnConfigButton` | boolean               | Muestra u oculta el botón de configuración de columnas.            |
| `noDataMessage`          | string                | Mensaje a mostrar cuando no hay datos.                             |

#### Ejemplo de uso

```typescript
import { GenericTableConfig } from 'ng-generic-table';

config: GenericTableConfig = {
  pagination: true,
  pageSize: 10,
  pageSizeOptions: [5, 10, 25, 50],
  showGlobalFilter: true,
  showExportButton: false,
  showColumnConfigButton: true,
  responsive: { enable: true, breakpoint: 500 },
  noDataMessage: 'No hay datos para mostrar'
};
```

Y en el template:


## Desarrollo

Puedes probar la librería usando la demo incluida en `projects/demo-app`.

## Licencia

MIT
