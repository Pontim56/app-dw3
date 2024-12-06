import connection from "../../../../lib/db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: "ID da obra não fornecido" });
        }

        try {
            const [rows] = await connection.execute(
                "SELECT imagem FROM obra WHERE id_obra = ?",
                [id]
            );

            if (rows.length === 0) {
                return res.status(404).json({ error: "Imagem não encontrada" });
            }

            const image = rows[0].imagem;

            res.setHeader("Content-Type", "image/png"); // Ajuste para o tipo de imagem no banco
            res.send(image);
        } catch (error) {
            console.error("Erro ao buscar a imagem:", error);
            res.status(500).json({ error: "Erro ao buscar a imagem" });
        }
    } else {
        res.status(405).json({ error: "Método não permitido" });
    }
}
