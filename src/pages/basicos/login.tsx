
// import { useEffect, useState } from 'react';

// interface Usuario {
//     id_funcionario: number;  // Definido como number
//     data_nascimento: string;
//     senha_funcionario: string;
//     telefone_funcionario: number; // Definido como number
// }

// export default function PaginaLogin() {
//     const [usuarios, setUsuarios] = useState<Usuario[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Ajustar o tipo para número (ou string) onde for necessário
//     const [idFuncionario, setIdFuncionario] = useState<number | ''>(''); 
//     const [dataNascimento, setDataNascimento] = useState('');
//     const [senhaFuncionario, setSenhaFuncionario] = useState('');
//     const [telefoneFuncionario, setTelefoneFuncionario] = useState<number | ''>(''); // Alterado para number

//     const [editandoUsuarioId, setEditandoUsuarioId] = useState<number | null>(null);

//     useEffect(() => {
//         const fetchUsuarios = async () => {
//             try {
//                 const response = await fetch('/api/login/login');
//                 if (!response.ok) {
//                     throw new Error('Erro ao buscar usuários');
//                 }
//                 const result = await response.json();
//                 setUsuarios(result);
//                 setLoading(false);
//             } catch (error: any) {
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };

//         fetchUsuarios();
//     }, []);

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const payload = {
//             id_funcionario: idFuncionario, // Garantindo que seja um número
//             data_nascimento: dataNascimento,
//             senha_funcionario: senhaFuncionario,
//             telefone_funcionario: telefoneFuncionario, // Garantindo que seja um número
//         };

//         try {
//             const response = await fetch('/api/login/addLogin', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(payload),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || 'Erro ao cadastrar usuário');
//             }

//             const newUsuario = await response.json();
//             setUsuarios([...usuarios, newUsuario]);
//             resetForm();
//         } catch (error: any) {
//             setError(error.message);
//         }
//     };

//     const handleUpdate = async (usuarioId: number) => { // Alterado para número
//         const payload = {
//             id_funcionario: idFuncionario,
//             data_nascimento: dataNascimento,
//             senha_funcionario: senhaFuncionario,
//             telefone_funcionario: telefoneFuncionario,
//         };

//         try {
//             const response = await fetch(`/api/login/uppLogin`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(payload),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || 'Erro ao atualizar usuário');
//             }

//             const updatedUsuario = await response.json();
//             setUsuarios(usuarios.map(u => u.id_funcionario === usuarioId ? updatedUsuario : u));
//             resetForm();
//             setEditandoUsuarioId(null);
//         } catch (error: any) {
//             setError(error.message);
//         }
//     };

//     const startEditing = (usuario: Usuario) => {
//         setIdFuncionario(usuario.id_funcionario); // Converte automaticamente
//         setDataNascimento(usuario.data_nascimento);
//         setSenhaFuncionario(usuario.senha_funcionario);
//         setTelefoneFuncionario(usuario.telefone_funcionario); // Converte automaticamente
//         setEditandoUsuarioId(usuario.id_funcionario);
//     };

//     const resetForm = () => {
//         setIdFuncionario(''); // Manter como string para controle de formulário
//         setDataNascimento('');
//         setSenhaFuncionario('');
//         setTelefoneFuncionario(''); // Manter como string para controle de formulário
//     };

//     if (loading) return <p>Carregando...</p>;
//     if (error) return <p>{`Erro: ${error}`}</p>;

//     return (
//         <div className="max-w-screen flex flex-col items-center bg-black p-4 text-white">
//             <div className='w-1/5 h-20 bg-yellow-100 rounded text-black flex justify-center items-center mb-6'>
//                 <h2 className="text-2xl font-bold">Cadastro de Login</h2>
//             </div>

//             <div className='flex flex-col items-center'>
//                 <form onSubmit={editandoUsuarioId ? () => handleUpdate(editandoUsuarioId) : handleSubmit} className="bg-white text-black p-6 rounded-lg shadow-md">
//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                         <input
//                             className="p-2 border rounded"
//                             type="number" // Mudar para number
//                             placeholder="ID Funcionário"
//                             value={idFuncionario}
//                             onChange={(e) => setIdFuncionario(Number(e.target.value) || '')} // Converter para número
//                             required
//                         />
//                         <input
//                             className="p-2 border rounded"
//                             type="date"
//                             placeholder="Data de Nascimento"
//                             value={dataNascimento}
//                             onChange={(e) => setDataNascimento(e.target.value)}
//                             required
//                         />
//                         <input
//                             className="p-2 border rounded"
//                             type="password"
//                             placeholder="Senha"
//                             value={senhaFuncionario}
//                             onChange={(e) => setSenhaFuncionario(e.target.value)}
//                             required
//                         />
//                         <input
//                             className="p-2 border rounded"
//                             type="number" // Mudar para number
//                             placeholder="Telefone"
//                             value={telefoneFuncionario}
//                             onChange={(e) => setTelefoneFuncionario(Number(e.target.value) || '')} // Converter para número
//                             required
//                         />
//                     </div>
//                     <div className="flex justify-center">
//                         <button
//                             type="submit"
//                             className="p-2 bg-yellow-200 text-black rounded"
//                         >
//                             {editandoUsuarioId ? 'Salvar Alterações' : 'Cadastrar'}
//                         </button>
//                     </div>
//                 </form>

//                 <div className="w-full max-w-4xl bg-yellow-100 text-black rounded p-6 mt-10 shadow-md">
//                     <h3 className="text-xl font-bold mb-4">Usuários Cadastrados</h3>
//                     <ul>
//                         {usuarios.length > 0 ? (
//                             usuarios.map((usuario) => (
//                                 <li key={usuario.id_funcionario} className="mb-2 border-b border-gray-200 pb-2">
//                                     <p>ID: {usuario.id_funcionario}</p>
//                                     <p>Senha: {usuario.senha_funcionario}</p>
//                                     <p>Data de Nascimento: {usuario.data_nascimento}</p>
//                                     <p>Telefone: {usuario.telefone_funcionario}</p>
//                                     <button
//                                         onClick={() => startEditing(usuario)}
//                                         className="p-2 bg-yellow-200 text-black rounded mt-2"
//                                     >
//                                         Editar
//                                     </button>
//                                 </li>
//                             ))
//                         ) : (
//                             <p>Nenhum usuário cadastrado</p>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Usuario {
    id_funcionario: number;
    data_nascimento: string;
    senha_funcionario: string;
    telefone_funcionario: number;
}

export default function PaginaLogin() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [idFuncionario, setIdFuncionario] = useState<number | ''>('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senhaFuncionario, setSenhaFuncionario] = useState('');
    const [telefoneFuncionario, setTelefoneFuncionario] = useState<number | ''>('');

    const [editandoUsuarioId, setEditandoUsuarioId] = useState<number | null>(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('/api/login/login');
                if (!response.ok) {
                    throw new Error('Erro ao buscar usuários');
                }
                const result = await response.json();
                setUsuarios(result);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const payload = {
            id_funcionario: idFuncionario,
            data_nascimento: dataNascimento,
            senha_funcionario: senhaFuncionario,
            telefone_funcionario: telefoneFuncionario,
        };

        try {
            const response = await fetch('/api/login/addLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao cadastrar usuário');
            }

            const newUsuario = await response.json();
            setUsuarios([...usuarios, newUsuario]);
            resetForm();
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleUpdate = async (usuarioId: number) => {
        const payload = {
            id_funcionario: idFuncionario,
            data_nascimento: dataNascimento,
            senha_funcionario: senhaFuncionario,
            telefone_funcionario: telefoneFuncionario,
        };

        try {
            const response = await fetch(`/api/login/uppLogin`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao atualizar usuário');
            }

            const updatedUsuario = await response.json();
            setUsuarios(usuarios.map(u => u.id_funcionario === usuarioId ? updatedUsuario : u));
            resetForm();
            setEditandoUsuarioId(null);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleDelete = async (usuarioId: number) => {
        try {

            const response = await fetch(`/api/login/delLogin`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_funcionario: usuarioId }), // Enviando o id no corpo da requisição
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao remover usuário');
            }

            // Atualiza a lista de usuários removendo o usuário excluído
            setUsuarios(usuarios.filter(usuario => usuario.id_funcionario !== usuarioId));
        } catch (error: any) {
            setError(error.message);
        }
    };

    const startEditing = (usuario: Usuario) => {
        setIdFuncionario(usuario.id_funcionario);
        setDataNascimento(usuario.data_nascimento);
        setSenhaFuncionario(usuario.senha_funcionario);
        setTelefoneFuncionario(usuario.telefone_funcionario);
        setEditandoUsuarioId(usuario.id_funcionario);
    };

    const resetForm = () => {
        setIdFuncionario('');
        setDataNascimento('');
        setSenhaFuncionario('');
        setTelefoneFuncionario('');
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{`Erro: ${error}`}</p>;

    return (
        <div className="max-w-screen flex flex-col items-center bg-black p-4 text-white">
            <div className='w-1/5 h-20 bg-yellow-100 rounded text-black flex justify-center items-center mb-6'>
                <h2 className="text-2xl font-bold">Cadastro de Login</h2>
            </div>

            <div className='flex flex-col items-center'>
                <form onSubmit={editandoUsuarioId ? () => handleUpdate(editandoUsuarioId) : handleSubmit} className="bg-white text-black p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            className="p-2 border rounded"
                            type="number"
                            placeholder="ID Funcionário"
                            value={idFuncionario}
                            onChange={(e) => setIdFuncionario(Number(e.target.value) || '')}
                            required
                        />
                        <input
                            className="p-2 border rounded"
                            type="date"
                            placeholder="Data de Nascimento"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            required
                        />
                        <input
                            className="p-2 border rounded"
                            type="password"
                            placeholder="Senha"
                            value={senhaFuncionario}
                            onChange={(e) => setSenhaFuncionario(e.target.value)}
                            required
                        />
                        <input
                            className="p-2 border rounded"
                            type="number"
                            placeholder="Telefone"
                            value={telefoneFuncionario}
                            onChange={(e) => setTelefoneFuncionario(Number(e.target.value) || '')}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="p-2 bg-yellow-200 text-black rounded"
                        >
                            {editandoUsuarioId ? 'Salvar Alterações' : 'Cadastrar'}
                        </button>
                    </div>
                </form>

                <div className="w-full max-w-4xl bg-yellow-100 text-black rounded p-6 mt-10 shadow-md">
                    <h3 className="text-xl font-bold mb-4">Usuários Cadastrados</h3>
                    <ul>
                        {usuarios.length > 0 ? (
                            usuarios.map((usuario) => (
                                <li key={usuario.id_funcionario} className="mb-2 border-b border-gray-200 pb-2">
                                    <p>ID: {usuario.id_funcionario}</p>
                                    <p>Senha: {usuario.senha_funcionario}</p>
                                    <p>Data de Nascimento: {usuario.data_nascimento}</p>
                                    <p>Telefone: {usuario.telefone_funcionario}</p>
                                    <button
                                        onClick={() => startEditing(usuario)}
                                        className="p-2 bg-yellow-200 text-black rounded mt-2 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(usuario.id_funcionario)} // Chama a função de remover
                                        className="p-2 bg-red-500 text-white rounded mt-2"
                                    >
                                        Remover
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p>Nenhum usuário cadastrado</p>
                        )}
                    </ul>
                </div>
            </div>
            <Link href="//"><button
                className="p-2 m-8 w-32 bg-red-400 text-white rounded "
            >
                Voltar
            </button></Link>
        </div>
    );
}
