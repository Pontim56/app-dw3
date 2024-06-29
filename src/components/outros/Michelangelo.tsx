import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function Michelangelo() {
    interface Pintor {
        id_pintor: number;
        nome: string;
        ano_nascimento: Date;
        ano_falecimento: Date;
        nacionalidade: string;
    }
    const [pintores, setPintores] = useState<Pintor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response2 = await fetch('/api/michelangelo/michelangelo');
                if (!response2.ok) {
                    throw new Error('Erro ao buscar dados');
                }
                const result2Text = await response2.text();
                const result2 = JSON.parse(result2Text);
                setPintores(result2);

                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{`Erro: ${error}`}</p>;
    return (
        <div className={`
            bgM
            rounded-2xl
            hover:scale-110 transform transition duration-300 ease-in-out 
            bg-yellow-100
            w-1/5
            h-1/2
        `}>
            <a href="/paginasPintores/paginaMichelangelo">
                {pintores.map((pintor) => (
                    <li className='flex items-center flex-col justify-end h-full te'
                        key={pintor.id_pintor}>
                        {pintor.nome}
                        <p>{pintor.nacionalidade}</p>
                        {format(new Date(pintor.ano_nascimento), 'dd/MM/yyyy')} - {format(new Date(pintor.ano_falecimento), 'dd/MM/yyyy')}
                    </li>
                ))}
                </a>
        </div>
    )
}