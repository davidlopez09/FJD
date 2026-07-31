import { Header } from "../components/header";
import { Footer } from "../components/footer";

export function LegalLayout({ children }) {
    return (
        <>
            <Header variant="legal" />
            <div id="nav-spacer"></div>
            {children}
            <Footer />
        </>
    );
}
