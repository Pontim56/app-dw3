import Retangulo1 from "@/components/basicos/Retangulo1";
import Retangulo2 from "@/components/basicos/Retangulo2";
import Retangulo3 from "@/components/basicos/Retangulo3";
import Retangulo4 from "@/components/basicos/Retangulo4";
import Retangulo5 from "@/components/basicos/Retangulo5";
import Retangulo6 from "@/components/basicos/Retangulo6";
import Retangulo7 from "@/components/basicos/Retangulo7";
import Retangulo8 from "@/components/basicos/Retangulo8";

export default function Home() {
    return (
        <div className={`
        w-screen h-screen
        flex 
        flex-wrap justify-center 
        gap-6 
        w
        `}>
            <div className="w-1/5 flex flex-col gap-6 justify-center">
                <div className="h-30/100">
                    <div className="h-1/3 text-lg">
                        Museu Moderno de Arte Antiga
                    </div>
                    <div className="h-2/3">
                        <Retangulo1></Retangulo1>
                    </div>
                </div>
                <div className="h-50/100">
                    <Retangulo5></Retangulo5>
                </div>
            </div>
            <div className="w-1/5 flex flex-col gap-6 justify-center">
                <div className="h-37/100 ">
                    <Retangulo2></Retangulo2>
                </div>
                <div className="h-43/100 ">
                    <Retangulo6></Retangulo6>
                </div>
            </div>
            <div className="w-1/5 flex flex-col gap-6 justify-center">
                <div className="h-47/100">
                    <Retangulo3></Retangulo3>
                </div>
                <div className="h-33/100">
                    <Retangulo7></Retangulo7>
                </div>

            </div>
            <div className="w-1/5 flex flex-col gap-6 justify-center">
                <div className="h-25/100">
                    <Retangulo4></Retangulo4>
                </div>
                <div className="h-55/100">
                    <Retangulo8></Retangulo8>
                </div>
            </div>
        </div>
    )
}