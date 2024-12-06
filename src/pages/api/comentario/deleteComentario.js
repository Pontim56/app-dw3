import connection from "../../../../lib/db";

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id_comentario } = req.query;

        if (!id_comentario) {
            return res.status(400).json({ error: 'ID do comentário é necessário' });
        }

        try {
            const [result] = await connection.execute(
                'DELETE FROM comentario WHERE id_comentario = ?',
                [id_comentario]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Comentário não encontrado' });
            }

            res.status(200).json({ message: 'Comentário removido com sucesso' });
        } catch (error) {
            console.error("Erro ao remover comentário:", error);
            res.status(500).json({ error: 'Erro ao remover comentário' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
