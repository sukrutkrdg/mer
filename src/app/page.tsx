'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // İçerik/görseller ekranda hazır hale geldikten sonra çağır.
    // Bu çağrı splash ekranını kapatır.
    const doReady = async () => {
      try {
        await sdk.actions.ready();
        setIsReady(true);
      } catch (e) {
        console.error('sdk.actions.ready() hata verdi:', e);
      }
    };

    // Eğer büyük bir görselin yüklenmesini beklemek istiyorsan:
    if (document.readyState === 'complete') {
      doReady();
    } else {
      const onLoad = () => doReady();
      window.addEventListener('load', onLoad, { once: true });
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold">Merhaba Dünya 👋</h1>
      <p className="mt-3 text-neutral-600">
        Bu, Farcaster Mini App için basit bir örnek.
      </p>

      <div className="mt-6 rounded-md border p-4 text-left">
        <p className="text-sm">
          {isReady ? 'Mini App hazır (ready() çağrıldı)' : 'Hazırlanıyor...'}
        </p>
      </div>
    </main>
  );
}