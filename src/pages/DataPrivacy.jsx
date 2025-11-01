import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
    return (
        <>
            <h1 className="bg-black text-white uppercase text-center text-3xl px-0.5 py-0.5 font-extrabold italic">
                Datenschutzerklärung
            </h1>
            <div className="bg-cream text-gray-900 min-h-screen py-16 px-6 md:px-20">
                <div className="max-w-4xl mx-auto leading-relaxed">
                    
                    {/* Verantwortliche Stelle */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-3">1. Verantwortliche Stelle</h2>
                        <p>
                            Diese Website („Sweet Spots“) wird als privates, nicht-kommerzielles Projekt betrieben von: <strong>Simona Wurst</strong>.
                        </p>
                    </section>

                    {/* Datenerhebung */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-3">2. Erhebung und Speicherung personenbezogener Daten</h2>
                        <p>
                            Beim Aufrufen dieser Website werden automatisch bestimmte technische Daten (z. B. IP-Adresse, Zeitpunkt des Zugriffs, Browsertyp) erfasst. 
                            Diese dienen ausschließlich der technischen Bereitstellung und Sicherheit der Website.
                        </p>
                    </section>

                    {/* Google Analytics */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-3">3. Google Analytics 4</h2>
                        <p>
                            Diese Website verwendet <strong>Google Analytics 4 (GA4)</strong> der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. 
                            Die IP-Adresse wird anonymisiert gespeichert. GA4 hilft mir zu verstehen, wie Besucher die Website nutzen.
                        </p>
                        <p className="mt-2">
                            Sie können das Tracking jederzeit manuell deaktivieren:{" "}
                            <Link to="/tracking" className="text-gold font-semibold hover:underline">
                                Tracking-Einstellungen öffnen
                            </Link>
                            .
                        </p>
                        <p className="mt-2">
                            Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). 
                            Die Datenverarbeitung erfolgt ggf. auf Servern in den USA gemäß den Standardvertragsklauseln der EU-Kommission.
                        </p>
                    </section>

                    {/* Kontaktformular */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-3">4. Kontaktformular</h2>
                        <p>
                            Wenn Sie das Kontaktformular nutzen, werden Ihr Name und Ihre E-Mail-Adresse verarbeitet. 
                            Diese Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage genutzt und anschließend gelöscht.
                        </p>
                    </section>

                    {/* Google Login */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-3">5. Anmeldung mit Google (Google Login)</h2>
                        <p>
                            Zur Anmeldung wird der <strong>Google-Login</strong> genutzt. Dabei authentifiziert sich der Nutzer direkt über Google. 
                            Ich erhalte dabei folgende Daten von Google: Vorname, E-Mail-Adresse, Google-ID, Profilbild (falls vorhanden) und eine öffentliche Benutzer-ID.
                        </p>
                        <p className="mt-2">
                            Diese Daten werden ausschließlich zur Profilerstellung und Speicherung persönlicher Merklisten verwendet. 
                            Eine Weitergabe an Dritte erfolgt nicht.
                        </p>
                        <p className="mt-2">
                            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und lit. a DSGVO (Einwilligung über Google).
                        </p>
                    </section>

                    {/* Datenbank */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-3">6. Speicherung von Nutzerdaten</h2>
                        <p>
                            Die Daten werden sicher in einer Cloud-Datenbank gespeichert. Der Zugriff erfolgt ausschließlich über gesicherte Verbindungen (SSL). 
                            Die Speicherung dient ausschließlich der Bereitstellung der Funktionen (z. B. Wunschlisten).
                        </p>
                    </section>

                    {/* Hosting */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-3">7. Hosting</h2>
                        <p>
                            Diese Website wird über internationale Cloud-Hosting-Dienste betrieben, die eine sichere Datenverarbeitung auf Grundlage von 
                            Auftragsverarbeitungsverträgen nach Art. 28 DSGVO gewährleisten. 
                            Eine Datenverarbeitung kann auf Servern außerhalb der EU erfolgen, wobei Standardvertragsklauseln der EU-Kommission Anwendung finden.
                        </p>
                    </section>

                    {/* Rechte */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-3">8. Rechte der betroffenen Personen</h2>
                        <p>
                            Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), 
                            Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch (Art. 21 DSGVO).
                        </p>
                    </section>

                    {/* Widerruf */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-3">9. Widerruf der Einwilligung</h2>
                        <p>
                            Sie können eine erteilte Einwilligung, z. B. zur Nutzung von Google Analytics, jederzeit mit Wirkung für die Zukunft widerrufen – 
                            entweder über die{" "}
                            <Link to="/tracking" className="text-gold font-semibold hover:underline">
                                Tracking-Einstellungen
                            </Link>{" "}
                            oder per E-Mail.
                        </p>
                    </section>

                    {/* Änderungen */}
                    <section>
                        <h2 className="text-2xl font-bold mb-3">10. Änderungen dieser Datenschutzerklärung</h2>
                        <p>
                            Diese Datenschutzerklärung kann bei Änderungen der Website oder rechtlichen Vorgaben angepasst werden. 
                            Die jeweils aktuelle Version finden Sie jederzeit auf dieser Seite.
                        </p>
                    </section>
                </div>

                <p className="text-sm text-gray-600 my-12 text-center">Stand: 30. Oktober 2025</p>
            </div>
        </>
    );
}
