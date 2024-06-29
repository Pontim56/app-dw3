import Image from "next/image";

export default function Retangulo6(){
    return(
        <div className={`
            bg6
            w-full
            h-full
          bg-gray-600
          flex items-end
            rounded-2xl p-4

            hover:scale-110 transform transition duration-300 ease-in-out 
        `}>
            <Image className="hover:scale-125 transform transition duration-300 ease-in-out" src="/images/arrow-right.png" alt="Seta para a direita" width={40} height={10} />
        </div>
    )
}