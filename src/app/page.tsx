'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Uygulama render & veri yüklemeleri bittikten sonra çağır
    // Aksi halde Mini App splash ekranı kapanmaz (sonsuz loading görünür)
    sdk.actions.ready().then(() => setReady(true));
  }, []);

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold">Merhaba Dünya 👋</h1>
      <p className="mt-3 text-neutral-600">
        Bu, Farcaster Mini App için en basit örnek.
      </p>

      <div className="mt-6 rounded-md border p-4 text-left">
        <p className="text-sm">
          {ready
            ? 'Mini App hazır! (sdk.actions.ready() çağrıldı)'
            : 'Hazırlanıyor...'}
        </p>
      </div>
    </main>
  );
}