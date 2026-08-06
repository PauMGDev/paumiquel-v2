# F4 — Datos del clasificador de correo

Materia prima del case study de `/proyectos/clasificador-email`. Se rellena
aquí y de aquí sale la página: lo que no esté escrito en este archivo no
aparece en la web. Sin número inventado, sin "aproximadamente", sin rellenar
un hueco con una suposición razonable.

Responder en bruto vale: frases sueltas, notas, lo que sea. El orden y la
redacción son trabajo del paso, no tuyo.

Tres respuestas válidas por campo:

- el dato;
- **NO MEDIDO** — se sabe que no se sabe, y la página lo dirá así;
- **NO PUBLICABLE** — existe pero no sale, ni en rango.

Un campo vacío no es ninguna de las tres: bloquea el paso.

---

## 0. Confidencialidad — RESPONDIDO 2026-08-06

- **NDA o política que revisar: SÍ, existe.** Pau responde a la vez que no hace
  falta aprobación de nadie de la empresa, así que la revisión del documento la
  hace él y la decisión de publicar es suya. Queda escrito aquí porque es la
  única condición del case study que no se puede verificar desde el repo.
- **Nombrar a Robles Sphère junto al detalle del sistema: SÍ.**
  (PENDIENTE de confirmar: la pregunta era de dos ramas y la respuesta fue
  "sí"; se toma como "sí, la empresa puede nombrarse". Si era la otra rama, el
  case study se escribe sin nombrar al empleador y cambia desde la primera
  frase.)
- **Aprobación de la empresa: no hace falta.**
- **Nombres reales de las categorías: publicables.**
- **Volúmenes: solo orden de magnitud.** Nada de cifras exactas: "cientos al
  día", no "412 al día". Aplica también a los resultados del bloque 4.
- **Capturas: permitidas, pero hoy no hay ninguna.** La página se diseña para
  sostenerse sin captura; si llega una después, entra como figura numerada y
  no obliga a rehacer la maqueta.

## 1. Problema

- ¿Quién recibía el correo y qué hacía con él? (rol, no nombre)
- Volumen antes: correos al día o a la semana.
- Tiempo que se iba en clasificar a mano.
  Y decir si es **medido** o **estimado**: las dos cosas valen, confundirlas no.
- ¿Qué costaba clasificar mal? (respuesta tardía, pedido perdido, otra cosa)
- ¿Qué se intentó antes? (reglas de Outlook, filtros, nada)

## 2. Arquitectura

Esto dibuja la Fig. 06. Si falta una pieza, la figura miente.

- ¿Dónde corre y cada cuánto? (cron, servicio permanente, disparado por evento)
- ¿Cómo entra el correo? (IMAP, Graph API, webhook, buzón compartido)
- ¿Qué se le manda al modelo exactamente? (cuerpo entero, solo asunto y
  remitente, adjuntos, metadatos)
- ¿Qué modelo, y por qué ese?
- ¿Prompt caching, batch, o llamada directa?
- ¿Qué devuelve? (cuántas categorías, si hay confianza, si resume)
- ¿Qué hace el sistema con la respuesta? (mover, etiquetar, crear ticket, avisar)
- ¿Hay base de datos? ¿Qué guarda y cuánto tiempo?
- Fallos: reintentos, cola, qué pasa si la API cae.
- ¿Hay umbral de confianza para mandar a revisión humana? ¿Cuál?
- Coste: tope de gasto y coste real (por mes o por 1.000 correos).

## 3. Decisiones

Tres o cuatro que quieras defender. Formato: qué decidiste, contra qué
alternativa, y por qué. Por ejemplo, por qué IA y no reglas; por qué ese
modelo; qué decidiste NO hacer.

**Una de ellas tiene que ser algo que saliera mal y corrigieras.** Un case
study sin una decisión revertida se lee como folleto, y quien lo evalúa lo
sabe.

## 4. Resultados

Cada número con su método, o no es un número:

- Precisión: sobre cuántos correos, contra qué referencia, en qué periodo.
- Tiempo antes vs después.
- Cuánto lleva en producción.
- Volumen procesado hasta hoy.
- ¿Qué dice quien lo usa?

Si no hay medición, **NO MEDIDO** y la sección lo dirá. Un case study que
admite que no midió la precisión sostiene mejor el escrutinio que uno con un
94% de origen desconocido.
