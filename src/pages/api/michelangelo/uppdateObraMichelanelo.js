import connection from "../../../../lib/db"; // Altere o caminho para o seu arquivo de configuração do banco de dados

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { id } = req.query;
    const { nome_obra, data_criacao } = req.body;

    if (!id || !nome_obra || !data_criacao) {
        return res.status(400).json({ error: 'ID, nome da obra e data de criação são obrigatórios' });
    }

    try {
        const query = `UPDATE obra SET nome_obra = ?, data_criacao = ? WHERE id_obra = ?`;
        const params = [nome_obra, data_criacao, id];

        const [result] = await pool.execute(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Obra não encontrada' });
        }

        const obraAtualizada = {
            id_obra: id,
            nome_obra,
            data_criacao,
        };

        res.status(200).json(obraAtualizada);
    } catch (error) {
        console.error('Erro ao atualizar obra:', error);
        res.status(500).json({ error: 'Erro ao atualizar obra' });
    }
}