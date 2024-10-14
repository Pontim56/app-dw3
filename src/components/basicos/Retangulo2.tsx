import Image from "next/image";
import Link from "next/link";


export default function Retangulo2(){
    return(
        <div className={`
            bg1

            w-full
            h-full
         bg-orange-500
         flex items-end
            rounded-2xl p-4

            hover:scale-110 transform transition duration-300 ease-in-out 
        `}>
                        <Link href="/basicos/inicialDaVinci"><Image className="hover:scale-125 transform transition duration-300 ease-in-out" src="/images/arrow-right.png" alt="Seta para a direita" width={40} height={10} /></Link>

            {/* <a href="/basicos/inicialMichelangelo"><Image className="hover:scale-125 transform transition duration-300 ease-in-out" src="/images/arrow-right.png" alt="Seta para a direita" width={40} height={10} /></a> */}
            
        </div>
    )
}