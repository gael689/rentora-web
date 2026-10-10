/* ── El contrato de alquiler de autos ─────────────────────────────────────────
 *
 * BORRADOR. El copy lo decide Gael: esto es una propuesta para que la edite, no texto final.
 *
 * Ataca la búsqueda "contrato de alquiler de autos modelo". El que busca eso quiere saber qué
 * tiene que decir su contrato, así que la página lo dice parte por parte, en tono informativo y
 * con la aclaración de que no es asesoramiento legal.
 *
 * No hay descarga todavía: el modelo de ejemplo se pide por contacto y se adapta a cada
 * rentadora. Todo lo que se afirma del sistema sale de `contenido.ts` (MODULOS, FAQS, CIFRAS). */

import type { PaginaContrato } from './tipos';

export const CONTRATO_PAG: PaginaContrato = {
  slug: 'contrato-de-alquiler-de-autos',
  nombre: 'Contrato de alquiler de autos',
  title: 'Contrato de alquiler de autos: modelo y partes',
  description:
    'Qué tiene que tener un contrato de alquiler de autos en Argentina: partes, vehículo, plazo, garantía, franquicia, conductores, multas y jurisdicción.',
  h1: 'Qué tiene que decir un *contrato de alquiler de autos*',
  bajada: 'Las partes de un contrato de rent a car, en orden, y un modelo de ejemplo para arrancar.',
  citable:
    'Un contrato de alquiler de autos identifica a las partes y al vehículo, fija plazo, lugar de entrega y precio, y define la garantía, la franquicia, los conductores autorizados, el uso permitido y quién responde por multas y daños. Cierra con la jurisdicción y la firma. Cada contrato tiene que poder reimprimirse con el texto exacto que se firmó.',
  partes: [
    {
      titulo: 'Las partes',
      texto:
        'De la rentadora, razón social, CUIT y domicilio. Del cliente, nombre, documento, domicilio y condición frente al IVA; si es una empresa, quién la representa y firma.',
    },
    {
      titulo: 'El vehículo y su estado',
      texto:
        'Marca, modelo, patente y categoría, con kilómetros, combustible y daños previos a la salida, que son la referencia para la devolución.',
    },
    {
      titulo: 'Plazo, lugar y horario',
      texto:
        'Fecha, hora y lugar de entrega y de devolución. Si se devuelve en otra sucursal, el contrato lo dice y dice si tiene cargo.',
    },
    {
      titulo: 'Precio, pago y garantía',
      texto:
        'El precio con coberturas y extras, cómo se paga, y la garantía: cuánto se retiene, en qué medio y cuándo se libera.',
    },
    {
      titulo: 'Franquicia y coberturas',
      texto:
        'La franquicia de la categoría, a cuánto la baja cada cobertura contratada y qué queda excluido de toda cobertura, como manejar alcoholizado o sin licencia vigente.',
    },
    {
      titulo: 'Conductores autorizados',
      texto:
        'Quiénes pueden manejar, con documento y licencia. El que no figura en el contrato maneja sin autorización, y eso suele dejar afuera la cobertura.',
    },
    {
      titulo: 'Uso permitido y prohibiciones',
      texto:
        'Qué no se puede hacer con el auto: subalquilarlo, llevar pasajeros por paga, remolcar o salir del país sin autorización escrita. Y si hay límite de kilómetros.',
    },
    {
      titulo: 'Multas, daños y siniestros',
      texto:
        'Quién responde por las multas del período, cómo se cargan los daños y qué hace el cliente ante un choque o un robo.',
    },
    {
      titulo: 'Devolución tardía',
      texto: 'La tolerancia en la hora de devolución, cuánto se cobra después y qué pasa si el auto no vuelve.',
    },
    {
      titulo: 'Jurisdicción',
      texto: 'Qué ley se aplica y qué tribunales intervienen si hay un conflicto.',
    },
    {
      titulo: 'Firma y anexos',
      texto:
        'La firma del cliente, la fecha y los documentos que se firman con el contrato y forman parte de él, como el documento de franquicia.',
    },
  ],
  secciones: [
    {
      titulo: 'Por qué versionar el clausulado',
      parrafos: [
        'El clausulado cambia: se suma una prohibición, el abogado corrige una cláusula. Si la rentadora reimprime un contrato viejo con el texto de hoy, el papel dice cosas que ese cliente nunca firmó. Versionar es guardar cada texto con su fecha y atar cada contrato a la versión vigente el día de la firma.',
      ],
    },
    {
      titulo: 'Papel, firma en pantalla o link remoto',
      parrafos: [
        'El papel sirve si el firmado se escanea y queda junto al contrato. La firma en pantalla ahorra la impresora, y el link remoto sirve para la empresa que firma desde su oficina. En los tres casos importa que el contrato firmado aparezca cuando se lo busca.',
      ],
    },
    {
      titulo: 'Errores comunes',
      parrafos: [
        'Usar un modelo bajado de internet sin adaptarlo, con coberturas que no vendés y una jurisdicción que no es la tuya. Cambiar una cláusula a mano y que después nadie sepa cuál era la original. No anotar a los conductores adicionales.',
        'Este texto es informativo y no reemplaza el asesoramiento legal: el contrato que firmen tus clientes tiene que revisarlo un abogado.',
      ],
    },
  ],
  modelo: {
    titulo: 'Un contrato modelo para arrancar',
    texto:
      'Hay un contrato modelo de ejemplo con estas partes ya redactadas. Se adapta a tu operación: tus categorías, tus coberturas, tus sucursales y lo que tu abogado quiera agregar o sacar.',
    cta: 'Pedime el modelo',
  },
  enRentora:
    'El clausulado está versionado y cada contrato guarda un snapshot congelado del texto del día de la firma, así que se reimprime idéntico años después. Las cláusulas se pueden editar para un contrato puntual: la editada queda marcada como modificada y se puede volver al original. Se firma en pantalla, por un link al teléfono que podés dar de baja, o en papel subiendo el firmado. Con una casilla sale también el documento de la franquicia, y cada contrato admite hasta 3 conductores.',
  preguntas: [
    {
      p: '¿Hay un modelo de contrato de alquiler de autos que sirva para cualquier rentadora?',
      r: 'Un modelo sirve como punto de partida, pero cada rentadora tiene que adaptarlo a su operación y hacerlo revisar por un abogado.',
    },
    {
      p: '¿Qué pasa si cambio el contrato y después tengo que reimprimir uno viejo?',
      r: 'Si el clausulado está versionado, el contrato viejo se reimprime con el texto que rigió el día de la firma. Si no lo está, se reimprime con el texto actual, que el cliente nunca firmó.',
    },
    {
      p: '¿Vale la firma en pantalla?',
      r: 'La validez de cada forma de firma conviene consultarla con un abogado. Lo que la rentadora sí tiene que asegurar es que el contrato firmado quede guardado y se pueda reimprimir igual.',
    },
    {
      p: '¿Hay que anotar a los conductores adicionales en el contrato?',
      r: 'Sí. Cada persona que va a manejar tiene que figurar con su documento y su licencia, y es la forma de saber quién manejaba si llega una multa.',
    },
  ],
};
