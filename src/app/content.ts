/**
 * Único módulo de contenido textual del sitio (invariante de CLAUDE.md).
 * Ningún componente declara strings de contenido: los importa de aquí.
 */
export const copy = {
  home: {
    index: {
      label: 'Índice',
      items: [
        { number: '01', title: 'Stack', id: 'stack' },
        { number: '02', title: 'Experiencia', id: 'experiencia' },
        { number: '03', title: 'Proyectos', id: 'proyectos' },
        { number: '04', title: 'Formación', id: 'formacion' },
        { number: '05', title: 'Apéndice A', id: 'apendice' },
        { number: '06', title: 'Contacto', id: 'contacto' },
      ],
    },

    // El stack completo y el bloque de IA de la v1 no viven aquí: bajan a las
    // secciones de 2.2. El primer viewport tiene que caber entero.
    hero: {
      eyebrow: 'Portfolio',
      name: 'Pau Miquel',
      role: 'Full stack · TypeScript · IA aplicada',
      lead: 'Ingeniero de software con cerca de tres años construyendo aplicaciones web en entornos profesionales. Hoy añado la capa de IA donde resuelve algo que el código convencional no resuelve mejor.',
      links: [
        { label: 'GitHub', href: 'https://github.com/PauMGDev' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/paumiquelguinot/' },
      ],
      availability: { state: 'disponible', detail: 'agosto 2026' },

      // Señal de scroll al pie del hero. Es un enlace de verdad a la primera
      // sección, no un adorno: si algo indica que hay más abajo, que lleve.
      cue: { label: '↓ 01 — Stack', href: '#stack' },

      // Statement del hero: una frase, fija y subrayada a mano. Rotaba entre
      // cuatro; una frase que se va sola no es una declaración, es un carrusel,
      // y encima obligaba a que el subrayado midiera cuatro anchos distintos.
      // Las otras tres están en el historial si alguna vez se cambia esta.
      statement: 'La IA no arregla una arquitectura mala.',

      // Ficha de datos. Solo lo que se puede defender hoy: ubicación e
      // idiomas entran cuando Pau pase los valores.
      facts: [
        // El estado no entra aquí: ya lo dice el sello, y repetirlo a dos
        // dedos de distancia resta a los dos.
        { label: 'Enfoque', value: 'Full stack con IA aplicada' },
        { label: 'Fondo', value: 'Videojuegos → desarrollo web' },
        { label: 'Busco', value: 'Equipo donde la base y la IA cuenten' },
      ],
    },
    stack: {
      number: '01',
      title: 'Stack',
      lead: 'Un ecosistema TypeScript de punta a punta: Angular con componentes standalone en el frontend, NestJS en el backend, Prisma y PostgreSQL como capa de datos, strict mode en los dos lados y cobertura con Vitest.',
      groups: [
        { label: 'Frontend', items: ['Angular', 'TypeScript', 'Tailwind CSS'] },
        { label: 'Backend', items: ['NestJS', 'Node.js', 'Prisma', 'PostgreSQL'] },
        { label: 'IA aplicada', items: ['Claude API', 'MCP', 'Claude Code'] },
        { label: 'Calidad', items: ['Vitest', 'TDD', 'Strict mode'] },
      ],
      figure: {
        caption: 'Fig. 01 — Flujo de una aplicación. La capa de IA cuelga del backend, nunca del navegador: el modelo recibe lo que el servidor decide, y nada más.',
        // Descripción para lectores de pantalla. El pie visible hace de
        // descripción larga; esto dice qué se ve, no qué significa.
        label: 'Diagrama: navegador, Angular, NestJS y PostgreSQL encadenados, con la API de Claude colgando del backend por una línea discontinua.',
        nodes: ['Navegador', 'Angular', 'NestJS', 'PostgreSQL'],
        aside: 'Claude API',
      },
      secondary: {
        label: 'También he trabajado con',
        items: ['C#', 'ASP.NET', 'Blazor', 'SQL Server', 'Unity', 'MongoDB', 'Express', 'Next.js'],
      },
    },

    experience: {
      number: '02',
      title: 'Experiencia',
      lead: 'La capa de IA la construyo con workflows agénticos: Claude Code con contexto por capas, servidores MCP propios y subagentes especializados. La base sigue siendo la de siempre — arquitectura, testing y código que otro pueda mantener.',

      // Las fechas van aquí en formato máquina porque la figura las dibuja;
      // las de los puestos siguen escritas para leerse. El hueco entre barras
      // es un dato, no un fallo de maquetación: por eso lo explica el pie.
      figure: {
        caption: 'Fig. 02 — Trayectoria. El hueco de 2024-2025: máster y formación en el stack actual.',
        label: 'Línea temporal de 2021 a 2026 con tres etapas: prácticas e ingeniero de software en EFI Cretaprint, y el puesto actual en Robles Sphère, abierto. Entre 2024 y 2026 no hay etapa.',
        from: '2021-01',
        to: '2026-12',
        spans: [
          { label: 'Prácticas', place: 'EFI', from: '2021-08', to: '2021-12' },
          { label: 'Ingeniero', place: 'EFI', from: '2021-12', to: '2024-05' },
          { label: 'Ingeniero IA', place: 'Robles', from: '2026-07', to: '2026-12', open: true },
        ],
      },

      jobs: [
        {
          role: 'Ingeniero de software — Automatización con IA',
          company: 'Robles Sphère',
          period: 'jul 2026 → actualidad',
          lines: [
            'Clasificador automático del correo entrante con la API de Claude, integrado en el flujo administrativo.',
            'Pre-análisis técnico para la renovación del ERP: extracción y estructuración de requisitos con IA.',
            'Auditoría técnica y SEO de los activos web de la empresa.',
          ],
        },
        {
          role: 'Ingeniero de software',
          company: 'EFI Cretaprint Development',
          period: 'dic 2021 → may 2024',
          lines: [
            'Dashboard para empresas con Blazor.',
            'Mantenimiento y creación de bases de datos en SQL Server.',
            'Backend con ASP.NET.',
            'Desarrollo dirigido por tests.',
          ],
        },
        {
          role: 'Contrato de prácticas',
          company: 'EFI Cretaprint Development',
          period: 'ago 2021 → dic 2021',
          lines: [
            'Nueva interfaz para el software interno.',
            'Web de pruebas para la conexión entre dispositivos.',
            'Documentación del proyecto y trabajo peer-to-peer.',
          ],
        },
      ],
    },

    education: {
      number: '04',
      title: 'Formación y certificación',
      // Anotado: la certificación es el único ítem con verificación, así que
      // el tipo la declara opcional en lugar de inventar campos vacíos.
      items: [
        {
          name: 'Máster en Desarrollo Fullstack',
          school: 'UNIR',
          period: 'nov 2025 → jul 2026',
          detail: 'Angular, Node.js, Express, MongoDB y PostgreSQL. Arquitectura limpia, SOLID y patrones. Metodologías ágiles y desarrollo orientado a tests.',
        },
        {
          name: 'Grado en Diseño y Desarrollo de Videojuegos',
          school: 'Universidad Jaume I',
          period: '4 cursos, sin titular',
          detail: 'Unity 2D y 3D con C#, arte y modelado 3D. De ahí viene la costumbre de perseguir los milisegundos.',
        },
        {
          name: 'Claude Code in Action',
          school: 'Anthropic',
          period: 'certificación',
          detail: 'Curso oficial sobre desarrollo con agentes: contexto, herramientas y flujo de trabajo.',
          verify: { label: 'Verificar', href: 'https://verify.skilljar.com/c/7nzxnt37mbfi' },
        },
      ] as ReadonlyArray<{
        name: string;
        school: string;
        period: string;
        detail: string;
        verify?: { label: string; href: string };
      }>,
    },

    projects: {
      number: '03',
      title: 'Proyectos',
      items: [
        {
          name: 'Sudoku Trainer',
          stack: 'TypeScript · Next.js · Prisma · PostgreSQL · Claude API',
          summary:
            'Un sudoku que detecta qué técnica desbloquea tu siguiente movimiento y te la explica. El engine es TypeScript puro, sin dependencias de plataforma: encuentra la técnica y verifica el argumento en servidor. El modelo solo redacta, y nunca ve el tablero.',
          note: 'Caché por patrón y tope de gasto diario: una demo pública no puede comerse la factura.',
          figure: {
            caption: 'Fig. 03 — El engine encuentra la técnica, el servidor verifica el argumento y solo entonces el modelo redacta.',
            label: 'Diagrama: engine de TypeScript, verificación en servidor y API de Claude, encadenados.',
            nodes: ['Engine TS', 'Verificación', 'Claude API'],
          },
          links: [
            { label: 'Demo', href: 'https://sudoku-trainer-mu.vercel.app' },
            { label: 'Código', href: 'https://github.com/PauMGDev/SudokuTrainer' },
          ],
        },
        {
          name: 'MealPlanner',
          stack: 'Angular · NestJS · Prisma · PostgreSQL · Tailwind',
          summary:
            'Planificación semanal de comidas: recetas, control de despensa con caducidades y calendario de menús según lo que hay en casa.',
          note: 'Desarrollado con workflow agéntico: contexto por capas y subagentes especializados en API, datos e interfaz.',
          figure: {
            caption: 'Fig. 04 — La misma pila del stack, en pequeño: un solo lenguaje del formulario a la tabla.',
            label: 'Diagrama: Angular, NestJS y PostgreSQL encadenados.',
            nodes: ['Angular', 'NestJS', 'PostgreSQL'],
          },
          links: [
            { label: 'Demo', href: 'https://meal-planner-azure-ten.vercel.app' },
            { label: 'Código', href: 'https://github.com/PauMGDev/MealPlanner' },
          ],
        },
        {
          name: 'agentic-harness-playbook',
          stack: 'Método · Claude Code · Plantilla copiable',
          summary:
            'Notas de campo sobre cómo hacer que un agente sea fiable para construir software de verdad, con la plantilla de arnés que uso: invariantes escritos, pasos pequeños y un criterio de terminado que se mide.',
          note: 'Esta web es su primera aplicación en público. El repositorio es abierto: el ROADMAP lleva la bitácora de cada decisión y cada fricción, con fecha.',
          figure: {
            caption: 'Fig. 05 — El bucle del arnés. Sin la vuelta al plan es una lista de tareas; con ella, un método.',
            label: 'Diagrama en bucle: plan, build, verify y log, con una flecha de vuelta de log a plan.',
            nodes: ['Plan', 'Build', 'Verify', 'Log'],
            loop: true,
          },
          links: [
            { label: 'Playbook', href: 'https://github.com/PauMGDev/agentic-harness-playbook' },
            { label: 'Esta web', href: 'https://github.com/PauMGDev/paumiquel-v2' },
          ],
        },
      ],
    },


    appendix: {
      number: '05',
      title: 'Apéndice A — Fuera del código',
      note: 'Cuatro líneas para que la conversación no empiece por el currículum.',
      // Textos provisionales: son los que Pau escribió en docs/DESIGN.md,
      // menos el de Sudoku, que repetía el proyecto. Pau los reescribe.
      items: [
        {
          tag: 'A.1',
          icon: 'cpu',
          title: 'Electrónica de sobremesa',
          text: 'Desmonto aparatos para entender cómo están hechos. Volver a montarlos es opcional.',
        },
        {
          tag: 'A.2',
          icon: 'spade',
          title: 'TCGs',
          text: 'Juegos de cartas coleccionables: lectura de patrones y probabilidad disfrazadas de afición.',
        },
        {
          tag: 'A.3',
          icon: 'guitar',
          title: 'Guitarra',
          text: 'La práctica deliberada, aplicada a algo que no compila.',
        },
        {
          tag: 'A.4',
          icon: 'mountain',
          title: 'Moto y montaña',
          text: 'Donde no llega la cobertura.',
        },
      ],
    },

    contact: {
      number: '06',
      title: 'Contacto',
      lead: 'Abierto a nuevas oportunidades y colaboraciones. El correo es la vía más rápida.',
      email: 'paumgdev@gmail.com',
      emailNote: 'Respondo en el día.',
      links: [
        { label: 'GitHub', href: 'https://github.com/PauMGDev' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/paumiquelguinot/' },
      ],
    },

    seo: {
      title: 'Pau Miquel — Full stack TypeScript con IA aplicada',
      description:
        'Desarrollador full stack en TypeScript con capa de IA aplicada en producción. Angular, Node y Postgres, de la base de datos a la interfaz.',
      imageAlt: 'Pau Miquel — full stack TypeScript con IA aplicada',
    },
  },

  tokens: {
    seo: {
      title: 'Tokens — paumiquel.com',
      description:
        'Guía viva del sistema de diseño de paumiquel.com: papel, tinta, tipografía y marginalia con sus ratios de contraste medidos.',
    },
    eyebrow: 'Sistema de diseño',
    title: 'Tokens',
    lead: 'Cuaderno de ingeniería, voz editorial. Esta página existe para decidir sobre ella: papel, tinta, tipografía y marginalia puestos a tamaño real, con sus ratios medidos.',
    meta: [
      ['Paso', '1.2'],
      ['Fecha', '2026-08-06'],
      ['Autoridad', 'docs/DESIGN.md'],
    ],

    palette: {
      number: '01',
      title: 'Papel y tinta',
      note: 'Los ratios los calcula node scripts/contrast.mjs sobre src/tokens.css. Los filetes no llevan ratio: son retícula, no información.',
      swatches: [
        // El rojo lápiz se descartó en 1.2: un solo acento, el azul tinta.
        { token: '--color-paper', hex: '#FAF9F6', use: 'Papel', ratio: '' },
        { token: '--color-paper-deep', hex: '#F2EFE7', use: 'Ficha', ratio: '' },
        { token: '--color-ink', hex: '#1C1B1A', use: 'Tinta', ratio: '16.33:1 AAA' },
        { token: '--color-ink-soft', hex: '#55514B', use: 'Marginalia', ratio: '7.48:1 AAA' },
        { token: '--color-accent', hex: '#1D4ED8', use: 'Enlace', ratio: '6.37:1 AA' },
        { token: '--color-accent-strong', hex: '#16389B', use: 'Hover y foco', ratio: '9.62:1 AAA' },
        { token: '--color-seal', hex: '#2F6B4F', use: 'Sello', ratio: '5.98:1 AA' },
        { token: '--color-rule', hex: '#D8D4CB', use: 'Filete', ratio: 'decorativo' },
        { token: '--color-rule-strong', hex: '#C3BDB1', use: 'Línea de margen', ratio: 'decorativo' },
      ],
    },

    type: {
      number: '02',
      title: 'Pareja tipográfica',
      note: 'Fraunces para display y cuerpo, IBM Plex Mono para marginalia. Dos archivos, 77kB. Se eligió sobre esta misma página frente a Newsreader + Space Mono y Source Serif 4.',
      label: 'Fraunces + IBM Plex Mono',
      display: 'Pau Miquel',
      subhead: 'Full stack con IA aplicada',
      running:
        'Desarrollo aplicaciones de principio a fin en TypeScript y añado la capa de IA cuando resuelve algo que el código convencional no resuelve mejor. En producción eso ha sido un clasificador de correo que ordena la bandeja de entrada de un equipo de soporte sin que nadie tenga que etiquetar nada a mano.',
      monoLine: 'Angular · Node · Postgres — Robles, 2024→',
    },

    figure: {
      number: '03',
      title: 'Figura y marginalia',
      note: 'El pie de figura es el lenguaje de anotación de toda la web: número, raya, frase corta que trabaja. La línea vertical de la izquierda recorre toda la hoja.',
      caption: 'Fig. 01 — Escala tipográfica sobre la retícula de página.',
      sidenote: 'La marginalia va en mono a 12px, tinta suave. Nunca compite con el cuerpo: acompaña.',
    },

    seal: {
      number: '04',
      title: 'Disponibilidad',
      note: 'Sello de tinta girado 2°, no badge de app. Un solo uso por página: vive en el hero.',
      stamp: 'disponible',
      stampMeta: 'agosto 2026',
    },
  },
} as const;
