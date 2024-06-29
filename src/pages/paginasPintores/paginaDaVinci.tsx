import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Obra {
    id_obra: number;
    data_criacao: string;
    nome_obra: string;
    pintor_id_pintor: number;
}
interface Pintor {
    id_pintor: number;
    nome: string;
    ano_nascimento: Date;
    nacionalidade: string;
}


export default function PaginaDaVinci() {
    const [data, setData] = useState<Obra[]>([]);
    const [pintores, setPintores] = useState<Pintor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [idObra, setIdObra] = useState<number | string>('');
    const [nomeObra, setNomeObra] = useState('');
    const [dataCriacao, setDataCriacao] = useState('');

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/davinci/obradavinci');
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }
                const result = await response.json();
                setData(result);

                const response2 = await fetch('/api/davinci/leodavinci');
                if (!response.ok) {
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log("Sending data:", { idObra, nomeObra, dataCriacao });
            const response = await fetch('/api/davinci/addObra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_obra: idObra,
                    nome_obra: nomeObra,
                    data_criacao: dataCriacao,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error response:", errorData);
                throw new Error(errorData.error || 'Erro ao adicionar obra');
            }
            const newObra = await response.json();
            setData([...data, newObra]);
            setIdObra('');
            setNomeObra('');
            setDataCriacao('');
        } catch (error: any) {
            console.error("Error:", error);
            setError(error.message);
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{`Erro: ${error}`}</p>;

    return (
        <div className={`
            overflow-hidden
        max-w-screen 
        flex items-center flex-col

        list-none
        justify-between
        
        `}>

            <div className='w-1/5 h-20 bg-yellow-100 rounded text-black flex justify-center items-center mt-6 mb-20 '>
                {pintores.map((pintor) => (
                    <li className='flex items-center flex-col text-2xl font-bold'
                        key={pintor.id_pintor}>
                        {pintor.nome}
                    </li>
                ))}
            </div>

            <div className='w-screen  list-none flex flex-row flex-wrap justify-center gap-12 '>
                {data.map((item, index) => (
                    <p key={item.id_obra} className='flex items-center flex-col w-72 h-72 justify-between '>

                        <div >
                            <Image src={`/imagesDaVinci/obra_${index + 1}.png`}
                                alt='aa'
                                width={170}
                                height={100}
                                className='rounded hover:scale-110 transform transition duration-300 ease-in-out'
                                sizes='(max-width: 200px)'
                            />
                        </div>
                        <div className='flex items-center flex-col'>
                            <p>{item.nome_obra}</p>
                            {format(new Date(item.data_criacao), 'yyyy')}
                        </div>
                    </p>
                ))}
            </div>

            <div className=' my-10'>
                {!showForm && (
                    <button
                        className="p-2 bg-yellow-100 text-black rounded mt-4"
                        onClick={() => setShowForm(true)}
                    >
                        Adicionar
                    </button>
                )}

                {showForm && (
                    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4 text-black ">
                        <div className='flex w-full'>

                            <input
                                className="mb-2 mr-2 p-2 border rounded w-1/5"
                                type="text"
                                placeholder="ID"
                                value={idObra}
                                onChange={(e) => setIdObra(e.target.value)}
                                required
                            />
                            <input
                                className="mb-2 p-2 border rounded flex-grow"
                                type="text"
                                placeholder="Nome da Obra"
                                value={nomeObra}
                                onChange={(e) => setNomeObra(e.target.value)}
                                required
                            />
                        </div>
                        <div className='flex w-full'>
                            <input
                                type="date"
                                value={dataCriacao}
                                onChange={(e) => setDataCriacao(e.target.value)}
                                className="mb-2 mr-2 p-2 border rounded"
                                required
                            />
                            <button type="submit" className="p-2 mb-2 bg-yellow-100 rounded flex-grow">
                                Adicionar Obra
                            </button>
                        </div>
                        <button className="p-2 bg-yellow-100 rounded text-black w-full" onClick={() => setShowForm(false)}>
                            Esconder
                        </button>
                    </form>
                )}
            </div>
            <a href="/">
                <button className='p-2 m-2 mb-5 bg-red-300 rounded text-black '>
                    Voltar
                </button>
            </a>


        </div>
    );
}
