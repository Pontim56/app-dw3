import connection from "../../../../lib/db";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id_funcionario, data_nascimento, senha_funcionario, telefone_funcionario } = req.body;

        console.log("Received data:", { id_funcionario, data_nascimento, senha_funcionario, telefone_funcionario });

        if (!id_funcionario || !data_nascimento || !senha_funcionario || !telefone_funcionario) {
            console.log("Missing required fields");
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos' });
        }

        try {
            const [result] = await connection.execute(
                'INSERT INTO funcionario (id_funcionario, data_nascimento, senha_funcionario, telefone_funcionario) VALUES (?, ?, ?, ?)',
                [id_funcionario, data_nascimento, senha_funcionario, telefone_funcionario]
            );
            console.log("DB Insert Result:", result);

            const newLogin = {
                id_funcionario,
                data_nascimento,
                senha_funcionario,
                telefone_funcionario,
            };
            res.status(201).json(newLogin);
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
