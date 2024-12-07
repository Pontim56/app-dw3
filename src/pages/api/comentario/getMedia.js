import connection from "../../../../lib/db";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { obra_id_obra } = req.query;

        if (!obra_id_obra) {
            return res.status(400).json({ error: 'ID da obra é necessário' });
        }

        try {
            const [result] = await connection.execute(
                'SELECT nota_comentario FROM comentario WHERE obra_id_obra = ?',
                [obra_id_obra]
            );

            if (result.length === 0) {
                return res.status(404).json({ error: 'Nenhum comentário encontrado para esta obra' });
            }

            // Calcular a média das notas
            const notas = result.map(row => row.nota_comentario);
            const media = notas.reduce((acc, nota) => acc + nota, 0) / notas.length;

            res.status(200).json({ media });
        } catch (error) {
            console.error("Erro ao calcular a média:", error);
            res.status(500).json({ error: 'Erro ao calcular a média' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
