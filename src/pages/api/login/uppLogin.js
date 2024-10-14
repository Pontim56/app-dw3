// pages/api/login/updateLogin/[id].ts
import connection from "../../../../lib/db";

export default async function handler(req, res) {
    if (req.method === 'PUT') { // Muda para PUT para atualização
        const { id_funcionario, data_nascimento, senha_funcionario, telefone_funcionario } = req.body;

        console.log("Received data for update:", { id_funcionario, data_nascimento, senha_funcionario, telefone_funcionario });

        if (!id_funcionario || !data_nascimento || !senha_funcionario || !telefone_funcionario) {
            console.log("Missing required fields");
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos' });
        }

        try {
            // Atualiza os dados no banco de dados
            const [result] = await connection.execute(
                'UPDATE funcionario SET data_nascimento = ?, senha_funcionario = ?, telefone_funcionario = ? WHERE id_funcionario = ?',
                [data_nascimento, senha_funcionario, telefone_funcionario, id_funcionario]
            );
            console.log("DB Update Result:", result);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            const updatedUsuario = {
                id_funcionario,
                data_nascimento,
                senha_funcionario,
                telefone_funcionario,
            };
            res.status(200).json(updatedUsuario);
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
