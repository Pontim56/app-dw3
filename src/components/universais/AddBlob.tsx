import { useState } from 'react';

export default function UploadImage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      console.log(selectedFile)
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/michelangelo/addObraMichelangelo', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('Upload concluído com sucesso!');
      } else {
        setStatus('Erro ao fazer upload: ${errorText}');
      }
    } catch (error) {
      setStatus('Erro ao fazer upload.');
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Enviar Imagem</button>
      {status && <p>{status}</p>}
    </div>
  );
}
