import multer from 'multer';
import { promisify } from 'util';
import mysql from 'mysql2/promise';
import connection from "../../../../lib/db";

// Configurando multer para armazenar arquivos na memória
const upload = multer({ storage: multer.memoryStorage() });

// Transformando o middleware do multer em uma Promise
const multerMiddleware = promisify((req, res, cb) =>
  upload.single('image')(req, res, cb)
);


// Função principal da API
const handler = async (req, res) => {
  console.log('Método da requisição:', req.method);

  if (req.method === 'POST') {
    try {
      console.log('Iniciando processamento do arquivo...');

      // Processa o arquivo com multer
      await multerMiddleware(req, res);
      console.log('Arquivo processado com sucesso.');

      // Recupera o arquivo enviado
      const file = req.file;
      if (!file) {
        console.log('Nenhum arquivo foi encontrado.');
        return res.status(400).json({ error: 'Nenhuma imagem foi enviada.' });
      }
      console.log('Arquivo recebido:', file);
      

      // Insere a imagem como BLOB no banco
      const query = 'INSERT INTO obra (imagem) VALUES (?)';
      await connection.execute(query, [file.buffer]);
      console.log('Imagem salva no banco com sucesso.');


      res.status(200).json({ message: 'Imagem salva com sucesso!' });
    } catch (error) {
      console.error('Erro no processamento:', error);
      res.status(500).json({ error: 'Erro ao salvar a imagem no banco de dados.' });
    }
  } else {
    console.log('Método não permitido:', req.method);
    res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }
};


// Configuração para desativar o bodyParser do Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
