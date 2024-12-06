import { useEffect, useState } from "react";

export default function ShowImage({ id }: { id: number }) {
    const [imageSrc, setImageSrc] = useState('');
  
    useEffect(() => {
      fetch(`/api/getBlob?id=${id}`)
        .then((res) => res.json())
        .then((data) => setImageSrc(data.image))
        .catch((err) => console.error(err));
    }, [id]);
  
    return <img src={imageSrc} alt="Imagem do banco" />;
  }
  