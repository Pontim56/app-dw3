import connection from "../../../../lib/db";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id_obra, nome_obra, data_criacao } = req.body;
        const pintor_id_pintor = 1;

        console.log("Received data:", { id_obra, nome_obra, data_criacao, pintor_id_pintor });

        if (!id_obra || !nome_obra || !data_criacao) {
            console.log("Missing required fields");
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos' });
        }

        try {
            const [result] = await connection.execute(
                'INSERT INTO obra (id_obra, nome_obra, data_criacao, pintor_id_pintor) VALUES (?, ?, ?, ?)',
                [id_obra, nome_obra, data_criacao, pintor_id_pintor]
            );
            console.log("DB Insert Result:", result);

            const newObra = {
                id_obra,
                nome_obra,
                data_criacao,
                pintor_id_pintor,
            };
            res.status(201).json(newObra);
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
