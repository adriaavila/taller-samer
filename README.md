# Taller Samer

Sistema web para gestión operativa de un taller mecánico, con foco en jornadas, órdenes de trabajo, planificación y control interno.

## Qué es este proyecto

Taller Samer plantea una interfaz administrativa para centralizar procesos que normalmente se manejan de forma dispersa dentro de un taller: registro de horas, seguimiento de trabajo, control de recursos y visibilidad operativa.

## El reto

El reto principal fue **transformar la operación de un taller en una experiencia digital clara, rápida y accionable**.

En este tipo de negocio suele haber mucha fricción operativa:

- seguimiento manual de jornadas
- órdenes de trabajo poco visibles
- poca trazabilidad de recursos y tiempos
- dificultad para arrancar el día con una visión clara del estado del taller

## Cómo lo resolví

- Diseñé un dashboard orientado a operación diaria, no solo a visualización.
- Organicé accesos directos para las tareas clave: registrar jornada, gestionar órdenes y revisar planificación.
- Incorporé indicadores y gráficos para dar contexto sin saturar la interfaz.
- Priorizé una estructura limpia para que el producto se sienta usable desde el primer vistazo.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts

## Lo que hace valioso este proyecto

Este proyecto demuestra capacidad para llevar un flujo operativo tradicional a un entorno digital con lógica de producto. No se trata solo de una interfaz bonita: se trata de **ordenar trabajo real**.

## Aprendizajes

- Las herramientas internas deben optimizar decisiones, no solo mostrar datos.
- En entornos operativos, claridad y velocidad pesan más que complejidad visual.
- Un buen dashboard nace de entender el día a día del negocio.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Inicio rápido

Instala dependencias:

```bash
npm install
```

Inicia el entorno de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Validación

```bash
npm run lint
npm run build
```

## Notas

- Los scripts usan `webpack` en vez de Turbopack para evitar fallos de compilación en entornos restringidos.
- `.env.local` incluye variables de Convex y Clerk, pero la interfaz actual funciona con datos locales de ejemplo y no requiere esos servicios para arrancar.
- El dashboard, los equipos y las ordenes de trabajo incluyen datos iniciales para que la app sea revisable desde el primer arranque.

## Rutas principales

- `/` panel general
- `/log-hours` registro de jornada
- `/work-orders` ordenes de trabajo
- `/equipment` gestion de equipos

## Producción

```bash
npm run build
npm run start
```

## Enlace del proyecto

- Repositorio: https://github.com/adriaavila/taller-samer
