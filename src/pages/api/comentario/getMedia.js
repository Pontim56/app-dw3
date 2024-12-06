import connection from "../../../../lib/db";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id_obra } = req.query;

        if (!id_obra) {
            return res.status(400).json({ error: 'ID da obra é necessário' });
        }

        try {
            // Busca todas as notas da obra e calcula a média
            const [rows] = await connection.execute(
                'SELECT AVG(nota_comentario) as media FROM comentario WHERE obra_id_obra = ?',
                [id_obra]
            );

            if (!rows.length) {
                return res.status(404).json({ error: 'Nenhuma nota encontrada para essa obra' });
            }

            res.status(200).json({ media: rows[0].media });
        } catch (error) {
            console.error("Erro ao calcular média:", error);
            res.status(500).json({ error: 'Erro ao calcular média' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
