'use client';

import { useState } from 'react';

/* Un <form> común (anda sin JS). Lo único que agrega el JS es no dejar mandar dos veces: el token
 * sirve una sola vez, y el segundo clic llegaría a /demo/lista como "link inválido" aunque la demo
 * se haya creado con el primero. */
export default function BotonConfirmar({ accion, token, texto }: { accion: string; token: string; texto: string }) {
  const [enviando, setEnviando] = useState(false);
  return (
    <form method="post" action={accion} onSubmit={() => setEnviando(true)}>
      <input type="hidden" name="token" value={token} />
      <button type="submit" className="cta" disabled={enviando}>
        {texto}
        <span className="flecha" aria-hidden="true">
          →
        </span>
      </button>
    </form>
  );
}
