'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { T } from '@/lib/contenido';
import { linkWhatsapp } from '@/lib/sitio';
import Icono from '@/components/sistema/Icono';
import estilos from './BarraMovil.module.css';

/* WhatsApp flotante en mobile: aparece al pasar el hero y se esconde en /contacto. */
export default function BarraMovil() {
  const [visible, setVisible] = useState(false);
  const ruta = usePathname();

  useEffect(() => {
    const alScrollear = () => setVisible(window.scrollY > 620);
    alScrollear();
    window.addEventListener('scroll', alScrollear, { passive: true });
    return () => window.removeEventListener('scroll', alScrollear);
  }, []);

  // En los formularios tapaba el botón de enviar.
  if (ruta === '/contacto' || ruta === '/probar' || ruta.startsWith('/demo/')) return null;

  return (
    <div className={`${estilos.barra} ${visible ? estilos.visible : ''}`}>
      <div className={estilos.texto}>
        <span className={estilos.titulo}>{T.marca}</span>
        <span className={estilos.sub}>{T.barraMovilSub}</span>
      </div>
      {/* En el telefono el boton es WhatsApp, no el formulario: el que entra desde el celular
          y quiere preguntar algo no va a llenar cuatro campos con el pulgar. El formulario
          sigue estando en el cierre y en /contacto. */}
      <a
        href={linkWhatsapp(T.whatsappMensaje)}
        className="cta cta-chico"
        target="_blank"
        rel="noopener"
        data-cta="barra-movil"
      >
        <Icono nombre="whatsapp" tam={18} />
        {T.whatsapp}
      </a>
    </div>
  );
}
