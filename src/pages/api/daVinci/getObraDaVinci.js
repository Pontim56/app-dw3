import connection from "../../../../lib/db";


export default async function handler(req, res) {
  try {
    const [rows] = await connection.execute('SELECT * FROM obra WHERE pintor_id_pintor = 1');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
