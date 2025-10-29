import Contact from "../components/ContactForm";

function ContactPage() {
    return (
        <div>
            {/* Main Heading */}
            <h1 className="bg-black text-white uppercase text-center text-3xl py-2 mb-10 font-extrabold italic">
                Get In <span className="text-teal">Touch</span>
            </h1>
            <Contact />
        </div>
    );
}

export default ContactPage;
