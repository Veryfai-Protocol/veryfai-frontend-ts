'use client';

import { useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const overlay = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  if (!overlay) {
    return <div></div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-[6px] rounded-xl max-w-md w-full relative">
        {children}
      </div>
    </div>
  );
}
