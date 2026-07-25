import { createContext, lazy, Suspense, useCallback, useContext, useMemo, useState } from "react";

const ContactModal = lazy(() => import("./ContactModal"));

const QuoteModalContext = createContext(null);

export function QuoteModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openQuoteModal = useCallback(() => setIsOpen(true), []);
  const closeQuoteModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ openQuoteModal, closeQuoteModal }), [openQuoteModal, closeQuoteModal]);

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      {isOpen && (
        <Suspense fallback={null}>
          <ContactModal isOpen={isOpen} onClose={closeQuoteModal} />
        </Suspense>
      )}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal precisa ser usado dentro de <QuoteModalProvider>");
  }
  return ctx;
}
