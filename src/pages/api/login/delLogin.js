import connection from "../../../../lib/db";

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id_funcionario } = req.body; // Lendo o id do corpo da requisição

        if (!id_funcionario) {
            return res.status(400).json({ error: 'ID do funcionário não fornecido' });
        }

        try {
            const [result] = await connection.execute(
                'DELETE FROM funcionario WHERE id_funcionario = ?',
                [id_funcionario]
            );

            // Verifique se alguma linha foi afetada
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.status(200).json({ message: 'Usuário removido com sucesso' });
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
