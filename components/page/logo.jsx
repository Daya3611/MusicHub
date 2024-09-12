import { Music, Music2Icon, Music3, Music4Icon } from "lucide-react";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="select-none">
            <div className="flex gap-2">
                <h1 className="text-2xl font-bold">Music<span className="opacity-50">hub</span>  </h1>
                
            </div>
        </Link>
    )
}