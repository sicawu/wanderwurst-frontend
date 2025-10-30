import RandomCafe from "../components/RandomCafe";

function RandomCafePage() {
    return (
        <>
            <RandomCafe />
            <div className="relative bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-2xl shadow-lg p-8 m-6 border border-gray-300 overflow-hidden">
                {/* Background Image for Visual Appeal */}
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20" 
                    style={{ backgroundImage: "url('https://res.cloudinary.com/djkv0io5j/image/upload/v1726719469/Sweet%20Spots/Tan-Coffee-Da-Nang_twqwez.jpg')" }}
                ></div>
                
                <div className="relative z-10">
                    <p className="text-gray-800 leading-relaxed text-lg font-medium italic tracking-wide drop-shadow-sm">
                        Don't worry, I haven't eaten anyone (yet).
                        This is a tribute to Sabrina, one of the most inspiring, supportive and humble woman with the biggest heart that I've met during my travels. I don't know where I would be without you, and I am just infinitely grateful for every moment we spent together.
                        We would have needed something like this when we are indecisive and hungry - which is not a good combination, as many of you probably know.
                        You are missed deeply every single day and I can't wait until I can give you an tropical, sweaty hug again - that you prefer to refuse but can't heheheh.
                    </p>
                </div>
            </div>
        </>
    );
}

export default RandomCafePage;
