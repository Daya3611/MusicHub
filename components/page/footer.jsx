import Link from "next/link";
import Logo from "./logo";

export default function Footer() {
    return (
        <footer className="py-5 backdrop-blur-3xl mt-8 px-6 md:px-20 lg:px-32">
            <div className="text-center">
                {/* <h1 className="text-xl font-bold">Music<span className="opacity-50">hub</span></h1> */}
                <Logo/>
                <p className="text-center text-muted-foreground text-sm mt-2  font-light">I dont own the api it belongs to its respective owners  jiosaavn.com  , built for educational purposes.</p>
            </div>
            
            
            <p className="text-center text-sm text-muted-foreground">Made with ♥ by <a className="underline text-primary hover:text-primary" href="https://github.com/Daya3611">Daya3611</a>.</p>
            <div className="flex gap-3 items-center justify-center mt-3">
                
                <Link target="_blank" className="text-sm opacity-80 font-light underline hover:opacity-100" href="https://dayanandgawade.in">Portfolio</Link>
                <Link target="_blank" className="text-sm opacity-80 font-light underline hover:opacity-100" href="https://instagram.com/_daya3611">Instagram</Link>
            </div>
        </footer>
    )
}