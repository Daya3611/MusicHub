import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-5 mt-8 px-6 md:px-20 lg:px-32">
            <div>
                <h1 className="text-xl font-bold">Music<span className="opacity-50">hub</span></h1>
                <p className="text-xs text-muted-foreground">Made with Nextjs by <a className="underline hover:text-primary" href="https://github.com/Daya3611">Daya3611</a> hosted on vercel.</p>
            </div>
            <p className="text-muted-foreground text-sm mt-2 max-w-lg">I dont own the api it belongs to its respective owners (jiosaavn.com), built for educational purposes.</p>
            <div className="flex gap-3 mt-3">
                <Link target="_blank" className="text-sm opacity-80 font-light underline hover:opacity-100" href="https://dayanandgawade.in">Portfolio</Link>
                <Link target="_blank" className="text-sm opacity-80 font-light underline hover:opacity-100" href="https://instagram.com/_daya3611">Instagram</Link>
            </div>
        </footer>
    )
}