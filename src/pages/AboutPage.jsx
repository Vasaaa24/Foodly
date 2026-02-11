import qrestLogo from "../assets/qrest-logo.png";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-content">
       

        {/* Informace o aplikaci */}
        <section className="about-section">
          <h2 className="about-section-title">O aplikaci</h2>
          <p className="about-text">
            QRest je moderní aplikace pro objednávání jídel a nápojů přímo u
            vašeho stolu. Stačí naskenovat QR kód, prohlédnout si menu a
            objednat - žádné čekání na obsluhu!
          </p>
        </section>

        {/* Jak to funguje */}
        <section className="about-section">
          <h2 className="about-section-title">Jak to funguje</h2>
          <div className="about-steps">
            <div className="about-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Naskenujte QR kód</h3>
                <p>Na každém stole najdete QR kód pro rychlý přístup</p>
              </div>
            </div>

            <div className="about-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Prohlédněte si menu</h3>
                <p>Kompletní menu s fotkami a popisem každého jídla</p>
              </div>
            </div>

            <div className="about-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Objednejte</h3>
                <p>Vyberte si, přidejte do košíku a potvrďte objednávku</p>
              </div>
            </div>

            <div className="about-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Plaťte jak chcete</h3>
                <p>Kartou online nebo hotově u obsluhy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Výhody */}
        <section className="about-section">
          <h2 className="about-section-title">Výhody</h2>
          <div className="about-features">
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <div className="feature-text">
                <h3>Rychlé</h3>
                <p>Objednávka během několika sekund</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <div className="feature-text">
                <h3>Jednoduché</h3>
                <p>Intuitivní ovládání pro každého</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <div className="feature-text">
                <h3>Bezpečné</h3>
                <p>Zabezpečené platby online</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📸</div>
              <div className="feature-text">
                <h3>Vizuální</h3>
                <p>Fotky všech jídel v menu</p>
              </div>
            </div>
          </div>
        </section>

        {/* Kontakt */}
        <section className="about-section">
          <h2 className="about-section-title">Kontakt</h2>
          <div className="about-contact">
            <p className="contact-info">
              <strong>Email:</strong> info@qrest.cz
            </p>
            <p className="contact-info">
              <strong>Telefon:</strong> +420 123 456 789
            </p>
            <p className="contact-info">
              <strong>Web:</strong> www.qrest.cz
            </p>
          </div>
        </section>

        {/* Verze */}
        <div className="about-footer">
          <p className="about-version">Verze 1.0.0</p>
          <p className="about-copyright">
            © 2026 QRest. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
