// import connection from "../../../../lib/db";

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const {nome_obra, data_criacao } = req.body;
//         const pintor_id_pintor = 1;

//         console.log("Received data:", {nome_obra, data_criacao, pintor_id_pintor });

//         if (!nome_obra || !data_criacao) {
//             console.log("Missing required fields");
//             return res.status(400).json({ error: 'Campos obrigatórios não fornecidos' });
//         }

//         try {
//             const [result] = await connection.execute(
//                 'INSERT INTO obra (nome_obra, data_criacao, pintor_id_pintor) VALUES (?, ?, ?)',
//                 [nome_obra, data_criacao, pintor_id_pintor]
//             );
//             console.log("DB Insert Result:", result);

//             const newObra = {
//                 id_obra: result.insertId,
//                 nome_obra,
//                 data_criacao,
//                 pintor_id_pintor,
//             };
//             res.status(201).json(newObra);
//         } catch (error) {
//             console.error("Database error:", error);
//             res.status(500).json({ error: error.message });
//         }
//     } else {
//         res.status(405).json({ error: 'Método não permitido' });
//     }
// }


import formidable from "formidable";
import fs from "fs";
import connection from "../../../../lib/db";

export const config = {
    api: {
        bodyParser: false, // Desativa o bodyParser interno do Next.js
    },
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        console.log("Recebendo requisição POST...");
        const form = formidable({ multiples: false });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("Erro ao processar o formulário:", err);
                return res.status(500).json({ error: "Erro ao processar o formulário" });
            }

            console.log("Dados recebidos:");
            console.log("Campos:", fields);
            console.log("Arquivos:", files);

            const nome_obra = fields.nome_obra?.[0] || fields.nome_obra; // Garante string simples
            const data_criacao = fields.data_criacao?.[0] || fields.data_criacao; // Garante string simples
            const pintor_id_pintor = 1;

            if (!nome_obra || !data_criacao || !files.image) {
                console.error("Campos obrigatórios ausentes.");
                return res.status(400).json({ error: "Campos obrigatórios não fornecidos" });
            }

            const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
            const imageFilePath = imageFile.filepath;

            console.log("Caminho do arquivo de imagem:", imageFilePath);

            try {
                const imageData = fs.readFileSync(imageFilePath);
                console.log("Tamanho do arquivo de imagem:", imageData.length);

                // Insere os dados no banco de dados
                const [result] = await connection.execute(
                    "INSERT INTO obra (nome_obra, data_criacao, pintor_id_pintor, imagem) VALUES (?, ?, ?, ?)",
                    [nome_obra, data_criacao, pintor_id_pintor, imageData]
                );

                console.log("Inserção no banco realizada com sucesso:", result);

                const newObra = {
                    id_obra: result.insertId,
                    nome_obra,
                    data_criacao,
                    pintor_id_pintor,
                };

                res.status(201).json(newObra);
            } catch (error) {
                console.error("Erro no banco de dados:", error);
                res.status(500).json({ error: error.message });
            }
        });
    } else {
        console.error("Método não permitido:", req.method);
        res.status(405).json({ error: "Método não permitido" });
    }
}
