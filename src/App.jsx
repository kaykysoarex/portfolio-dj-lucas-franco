import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import { useIsMobile } from "./hooks/useIsMobile";
import { QuoteModalProvider } from "./components/ContactModal/QuoteModalContext";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import DesktopExperience from "./DesktopExperience";
import MobileExperience from "./MobileExperience";

const AvailabilityToast = lazy(() => import("./components/AvailabilityToast/AvailabilityToast"));

export default function App() {
  useLenis();
  const isMobile = useIsMobile(700);

  return (
    <QuoteModalProvider>
      <BrowserRouter>
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo
        </a>

        <CustomCursor />

        {isMobile ? <MobileExperience /> : <DesktopExperience />}

        <WhatsAppButton />
        <Suspense fallback={null}>
          <AvailabilityToast />
        </Suspense>
      </BrowserRouter>
    </QuoteModalProvider>
  );
}
