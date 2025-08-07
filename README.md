
# ng-generic-table

> Componente de tabla genérica para Angular 16+ con soporte para temas claro/oscuro, filtros, paginación y más.

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
<generic-table [data]="tuDataSource" [columns]="columnas"></generic-table>
```


## Compatibilidad

- Angular 16+
- Bootstrap 5+


## Definición de columnas

El array `columns` define las columnas que se mostrarán en la tabla. Cada columna debe seguir el modelo `TableColumn`:

| Propiedad      | Tipo                | Requerido | Descripción                                                                 |
|--------------- |-------------------- |-----------|-----------------------------------------------------------------------------|
| `key`          | string              | Sí        | Identificador único de la columna.                                          |
| `label`        | string              | Sí        | Etiqueta o título que se muestra en el encabezado de la tabla.              |
| `visible`      | boolean             | Sí        | Define si la columna es visible.                                            |
| `sortable`     | boolean             | Sí        | Indica si la columna es ordenable.                                          |
| `filterable`   | boolean             | Sí        | Indica si la columna es filtrable.                                          |
| `cellType`     | CellType            | Sí        | Tipo de celda para renderizar el contenido (`TEXT`, `NUMBER`, etc).         |
| `template`     | TemplateRef<any>    | No        | Plantilla personalizada para la celda (si `cellType` es `TEMPLATE`).        |
| `pipe`         | { obj }             | No        | Permite aplicar un Pipe al valor de la columna.                             |
| `minWidth`     | number              | No        | Ancho mínimo de la columna en píxeles.                                      |
| `defaultSort`  | 'asc' \| 'desc'     | No        | Orden predeterminado para la columna.                                       |

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
import { CellType } from 'ng-generic-table';

columns: TableColumn[] = [
  { key: 'id', label: 'ID', visible: true, sortable: true, filterable: true, cellType: CellType.NUMBER },
  { key: 'nombre', label: 'Nombre', visible: true, sortable: true, filterable: true, cellType: CellType.TEXT },
  { key: 'fecha', label: 'Fecha', visible: true, sortable: true, filterable: false, cellType: CellType.DATE },
  { key: 'activo', label: 'Activo', visible: true, sortable: false, filterable: true, cellType: CellType.CHECKBOX }
];
```



## Desarrollo

Puedes probar la librería usando la demo incluida en `projects/demo-app`.

## Licencia

MIT
