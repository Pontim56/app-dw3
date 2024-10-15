import connection from "../../../../lib/db";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { obra_id_obra, nota_comentario } = req.body;

        // Validação dos campos recebidos
        if (!obra_id_obra || typeof nota_comentario !== 'number' || nota_comentario < 0 || nota_comentario > 10) {
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos ou nota inválida' });
        }

        try {
            // Inserção no banco de dados, id_comentario será gerado automaticamente pelo AUTO_INCREMENT
            const [result] = await connection.execute(
                'INSERT INTO comentario (nota_comentario, obra_id_obra) VALUES (?, ?)',
                [nota_comentario, obra_id_obra]
            );

            console.log("Comentário inserido com sucesso:", result);

            // O id_comentario gerado automaticamente será retornado como insertId
            const newComentario = {
                id_comentario: result.insertId,  // Pega o id gerado automaticamente
                nota_comentario,
                obra_id_obra,
            };

            res.status(201).json(newComentario);
        } catch (error) {
            console.error("Erro no banco de dados:", error);
            res.status(500).json({ error: 'Erro ao adicionar o comentário' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
