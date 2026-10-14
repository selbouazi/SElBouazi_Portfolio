# Fotos 360° para el hero

Guía de rodaje. El resultado: una tira de fotos de pie girando, recortadas sin fondo, animadas en la web.

## 1. Material

- **24 fotos** (15° por paso). Si quieres más suavidad: 36 (10° por paso).
- Cuerpo **completo**, de pies a cabeza, margen por arriba y por abajo.
- **Fondo liso y de un color que no sea el tuyo** (pared blanca o gris claro; evita ropa blanca si el muro es blanco, mejor negra o de color vivo).
- Luz **igual en todas**: luz de día (no sol directo), nunca mezclar día con bombilla.
- Cámara fija: móvil en **trípode** o apoyado en algo firme. Si no hay trípode, pide a alguien que te grabe girando y yo extraigo los fotogramas (me sirve igual).
- No usar flash.

## 2. Marcas en el suelo

Para que la vuelta salga en el mismo sitio:

1. Ponte de pie, marca con cinta la posición **exacta de tus dos pies**.
2. A ~2,5-3 m, marca la posición del móvil.
3. En el suelo, dibuja (con cinta o tiza) **una circunferencia de ~50 cm de radio** con 24 marcas cada 15°. Atajo: usa un plato grande o un cuenco como plantilla.

## 3. La sesión (20 minutos)

1. Configura el móvil: rejilla activada, **enfoque y exposición bloqueados** (mantén pulsado en pantalla) para que no cambie entre fotos.
2. Temporizador de 3 s o mando Bluetooth (audífonos con botón) para no tocar el móvil.
3. Ponte en la marca de los pies mirando a la cámara. **Brazos ligeramente separados del cuerpo** (que no peguen al torso: al recortar se pegan y quedan mal).
4. Foto. Gira 15° (siguiente marca). Foto. Repite hasta completar la vuelta.
5. **No muevas la ropa entre tomas**: recógete mangas y chaqueta antes de empezar y no la toques.

### Errores que arruinan la secuencia (evítalos)

- Mover el móvil/tripode entre fotos (todo el fondo salta).
- Cambiar la ropa o la pose a mitad.
- Sombras duras en la pared (mejor luz indirecta).
- Mirar a la cámara cuando estás girado de espaldas: la cabeza gira **con el cuerpo**, no con la cámara.
- Zapatos con reflejos o suelo muy brillante.

## 4. Entrega

- Copia las fotos originales (JPEG/HEIC) a esta carpeta `frames/`.
- Si sale un fallo en alguna, repite esa toma: **la secuencia completa tiene que ser seguida**.
- Yo me encargo del resto: recorte de fondo, sprite sheet en WebP con transparencia, animación con `steps()` a 12-15 fps, pausa con `prefers-reduced-motion`, y carga diferida.

## 5. Qué pasa después (por si lo quieres saber)

- Los 24 frames se apilan en **una sola tira horizontal** (sprite sheet) en WebP con alfa → un solo archivo, ~30-60 KB por frame a 640 px.
- Un `<div>` con `background-image` + `background-position` animado con `animation: giro 4s steps(24) infinite`.
- Con `prefers-reduced-motion: reduce` se queda en el primer frame.
- Se oculta en pantallas < 768 px si el peso se dispara (mobile first).

## 6. Pendiente de confirmar

- ¿Peso máximo aceptable en el hero? (estimo ~1 MB para 24 frames; si quieres < 500 KB, bajamos a 16 frames o 480 px)
- ¿La foto va **en lugar del diagrama de red** (que baja a otra sección) o **junto a él**?
