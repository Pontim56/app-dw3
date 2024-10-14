import Image from "next/image";
import Link from "next/link";

export default function Retangulo1(){
    return(
        <div className={`
            bg-yellow-100

            w-full
            h-full
            bg-gray-400
            flex flex-col justify-between
            rounded-2xl p-4

            hover:scale-110 transform transition duration-300 ease-in-out
            text-black
        `}>
            <p className="text-3xl">Cadastrar</p>
            <Link href="/basicos/login"><Image className="hover:scale-125 transform transition duration-300 ease-in-out" src="/images/arrow-right.png" alt="Seta para a direita" width={40} height={10} /></Link>
             
        </div>
    )
}