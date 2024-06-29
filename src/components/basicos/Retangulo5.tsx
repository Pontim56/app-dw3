import Image from "next/image";

export default function Retangulo5(){
    return(
        <div className={`
            bg5

            w-full
            h-full
          bg-red-600
          flex items-end
            rounded-2xl p-4

            hover:scale-110 transform transition duration-300 ease-in-out 

            
        ` } >
            <a href="/basicos/inicialMichelangelo"><Image className="hover:scale-125 transform transition duration-300 ease-in-out" src="/images/arrow-right.png" alt="Seta para a direita" width={40} height={10} /></a>
        </div>
    )
}