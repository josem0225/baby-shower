# Historias de Usuario - Invitación Baby Shower

A continuación se detallan las historias de usuario para la aplicación de invitación al Baby Shower, basadas en las funcionalidades requeridas.

## 1. Confirmación de Asistencia (RSVP)
**Como** invitado al baby shower,
**Quiero** poder ingresar mi número de teléfono en la aplicación,
**Para** confirmar si asistiré o no al evento de forma rápida y sencilla.

### Criterios de Aceptación:
- El sistema debe conectarse a un documento de Google Sheets (a través de GCP) que contiene la lista predefinida de los 60 invitados y sus respectivos números de teléfono.
- La interfaz debe tener un campo para que el usuario ingrese su número de teléfono.
- Al ingresar el número, el sistema debe validar si pertenece a la lista de invitados.
  - Si no está en la lista, mostrar un mensaje amigable indicando que no se encontró la invitación.
- Si el número es válido, se deben habilitar dos opciones: "Sí asistiré" y "No asistiré".
- Una vez el invitado selecciona su respuesta, esta debe actualizarse en tiempo real (o casi en tiempo real) en el documento de Google Sheets correspondiente.
- Se debe mostrar un mensaje de confirmación tras registrar la respuesta ("¡Gracias por confirmar!").

---

## 2. Sugerencia y Votación de Nombres
**Como** invitado al baby shower,
**Quiero** poder sugerir nombres para el bebé y votar por los nombres que otros han sugerido,
**Para** ayudar a los padres a elegir el nombre interactuando con los demás invitados.

### Criterios de Aceptación:
- Debe existir una sección dedicada a la elección del nombre en la aplicación.
- Los invitados deben poder ver una lista con los nombres ya sugeridos y la cantidad de votos que tiene cada uno.
- Debe haber un formulario o campo de texto que permita al invitado escribir un nuevo nombre y enviarlo a la lista.
- Cada invitado debe poder hacer clic en un botón de "votar" (o similar, como un ícono de corazón/like) junto a los nombres de la lista.
- El sistema debe registrar las sugerencias y los votos, almacenándolos para que todos los usuarios puedan ver la lista actualizada.
- (Opcional) Limitar la cantidad de votos por invitado a un número determinado, o permitir votar libremente.

---

## 3. Información del Evento
**Como** invitado al baby shower,
**Quiero** ver la ubicación, fecha y hora del evento en la página principal,
**Para** poder agendarlo y saber cómo llegar al lugar.

### Criterios de Aceptación:
- La página principal (o sección superior) de la invitación debe mostrar de manera clara y destacada la fecha y la hora del Baby Shower.
- Se debe mostrar la dirección completa del lugar del evento.
- (Opcional pero recomendado) Incluir un enlace directo a Google Maps o Waze, o un mapa interactivo incrustado para facilitar la navegación hacia la ubicación.
- El diseño de esta sección debe ser atractivo y acorde a la temática de un baby shower.
