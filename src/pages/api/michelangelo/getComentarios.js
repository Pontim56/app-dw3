import connection from "../../../../lib/db";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Consulta SQL para buscar os comentários e o nome da obra correspondente
            const [rows] = await connection.execute(`
                SELECT comentario.id_comentario, comentario.nota_comentario, obra.nome_obra
                FROM comentario
                JOIN obra ON comentario.obra_id_obra = obra.id_obra
            `);
            
            res.status(200).json(rows);
        } catch (error) {
            console.error("Erro ao buscar comentários:", error);
            res.status(500).json({ error: 'Erro ao buscar comentários' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
