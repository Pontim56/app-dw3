import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
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
interface Comentario {
    id_comentario: number;
    nome_obra: number;
    nota_comentario: number;
}

export default function PaginaDaVinci() {
    const [data, setData] = useState<Obra[]>([]);
    const [pintores, setPintores] = useState<Pintor[]>([]);
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [notas, setNotas] = useState<{ [key: number]: number | '' }>({});
    const [medias, setMedias] = useState<{ [key: number]: number }>({});
    
    const [idObra, setIdObra] = useState<number | string>('');
    const [nomeObra, setNomeObra] = useState('');
    const [dataCriacao, setDataCriacao] = useState('');

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/daVinci/getObraDaVinci');
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados get obra');
                }
                const result = await response.json();
                setData(result);

                const response2 = await fetch('/api/daVinci/getDaVinci');
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados get pintor');
                }
                const result2Text = await response2.text();
                const result2 = JSON.parse(result2Text);
                setPintores(result2);

                const response3 = await fetch('/api/daVinci/getComentarioDaVinci');
                if (!response3.ok) {
                    throw new Error('Erro ao buscar dados');
                }
                const result3 = await response3.json();
                setComentarios(result3);

                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    // Função para enviar a nota ao backend
    const handleNotaSubmit = async (idObra: number) => {
        const nota = notas[idObra];
        if (nota === undefined || nota === '') return;

        try {
            const response = await fetch('/api/comentario/addComentario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    obra_id_obra: idObra,
                    nota_comentario: nota,
                }),
            });
            if (!response.ok) {
                throw new Error('Erro ao adicionar nota');
            }
            const result = await response.json();
            console.log('Nota adicionada com sucesso', result);
            // Aqui você pode limpar o campo ou mostrar uma mensagem de sucesso
            setNotas((prevNotas) => {
                const updatedNotas = { ...prevNotas };
                delete updatedNotas[idObra];
                return updatedNotas;
            });
        } catch (error: any) {
            console.error('Erro ao enviar nota:', error.message);
        }
    };

    // Função para deletar uma nota/comentário
    const handleDelete = async (id_comentario: number) => {
        try {
            const response = await fetch(`/api/comentario/deleteComentario?id_comentario=${id_comentario}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao remover comentário');
            }

            // Atualiza o estado local removendo o comentário deletado
            setComentarios(comentarios.filter((comentario) => comentario.id_comentario !== id_comentario));
        } catch (error: any) {
            console.error('Erro ao remover comentário:', error.message);
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{`Erro: ${error}`}</p>;


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log("Sending data:", { idObra, nomeObra, dataCriacao });
            const response = await fetch('/api/daVinci/addObraDaVinci', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // id_obra: idObra,
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
            // setIdObra('');
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
                    <p key={item.id_obra} className='flex items-center flex-col w-72  justify-between '>

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
                        <input
                            type="number"
                            placeholder="Nota"
                            min={0}
                            max={10}
                            value={notas[item.id_obra] || ''}
                            onChange={(e) => setNotas({ ...notas, [item.id_obra]: +e.target.value })}
                            className='mb-2 p-2 border rounded text-black'
                        />

                        {/* Botão para enviar nota */}
                        <button
                            onClick={() => handleNotaSubmit(item.id_obra)}
                            className="p-2 text-black bg-yellow-100 rounded"
                        >
                            Enviar Nota
                        </button>
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

                            {/* <input
                                className="mb-2 mr-2 p-2 border rounded w-1/5"
                                type="text"
                                placeholder="ID"
                                value={idObra}
                                onChange={(e) => setIdObra(e.target.value)}
                                required
                            /> */}
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
            <div className="w-1/2 bg-yellow-100 p-4 rounded my-8">
                <h2 className="text-xl text-black font-bold mb-4">Comentários Cadastrados</h2>
                {comentarios.map((comentario) => (
                    <div key={comentario.id_comentario} className="mb-4 p-4 text-black bg-yellow-50 rounded shadow">
                        <p>Obra: {comentario.nome_obra}</p>
                        <p>Nota: {comentario.nota_comentario}</p>

                        {/* Botão para remover comentário */}
                        <button
                            onClick={() => handleDelete(comentario.id_comentario)}
                            className="p-2 text-white bg-red-500 rounded"
                        >
                            Remover
                        </button>
                    </div>
                ))}
            </div>

            <Link href="/">
                <button className='p-2 m-2 mb-5 bg-red-300 rounded text-black '>
                    Voltar
                </button>
            </Link>


        </div>
    );
}
