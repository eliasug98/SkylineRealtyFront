import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useSkyline from '../hooks/useSkyline';
import { toast } from 'react-toastify';
import { useAuth } from "../hooks/useAuth";

function PostProperty() {

  const { handleCreateProperty } = useSkyline();
  const { user } = useAuth({ middleware: 'admin' });

  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    address: "",
    price: '',
    description: "",
    beds: '',
    baths: '',
    garages: '',
    sqft: ''
  });

  const onDrop = useCallback((files) => {
    setAcceptedFiles((prevFiles) => [...prevFiles, ...files]);
    console.log(files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (acceptedFiles.length === 0) {
      toast.warning("Please upload at least one file.");
      return;
    }

    if (!propertyDetails.title || !propertyDetails.address || !propertyDetails.price || !propertyDetails.description || !propertyDetails.beds || !propertyDetails.baths || !propertyDetails.garages || !propertyDetails.sqft) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    // Subir cada archivo individualmente
    const uploadPromises = acceptedFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "kbvcbkkk");
      formData.append("api_key", "448372362299571");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/deq8jrgt5/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        console.log(data); // Mostrar la respuesta JSON en la consola
        return data; // Retornar la respuesta para cada archivo
      } catch (error) {
        console.error("Error uploading file:", error);
        return null;
      }
    });

    try {
      const results = await Promise.all(uploadPromises);
      console.log(results);

      // Filtrar resultados exitosos y actualizar el estado
      const successfulUploads = results.filter(result => result !== null);
      setUploadedImages(successfulUploads);

      // Crear el objeto JSON para enviar
      const propertyData = {
        title: propertyDetails.title,
        address: propertyDetails.address,
        price: propertyDetails.price,
        images: successfulUploads.map((img) => ({
          url: img.secure_url
        })),
        description: propertyDetails.description,
        beds: propertyDetails.beds,
        baths: propertyDetails.baths,
        garages: propertyDetails.garages,
        sqft: propertyDetails.sqft,
        sellerId: user.id
      };

      console.log(propertyData); // Mostrar el objeto JSON en la consola

      // Enviar el objeto JSON al servidor
      const success = await handleCreateProperty(propertyData);

      if (success) {
        toast.success('Property created');

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error('Error submitting property');
      }

    } catch (error) {
      console.log("Error uploading files:", error);
      toast.error('Error submitting property');
    }
  };

  return (
    <div className="mt-10 mb-10 p-10">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Property Title"
          className="border rounded-md p-2 mb-4"
          value={propertyDetails.title}
          onChange={(e) => setPropertyDetails({ ...propertyDetails, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Address"
          className="border rounded-md p-2 mb-4"
          value={propertyDetails.address}
          onChange={(e) => setPropertyDetails({ ...propertyDetails, address: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          className="border rounded-md p-2 mb-4"
          value={propertyDetails.price !== '' ? propertyDetails.price : ''} // Muestra vacío si no hay valor
          onChange={(e) => {
            const value = e.target.value;
            // Permitir vacío o número no negativo
            if (value === "" || Number(value) >= 0) {
              setPropertyDetails({ ...propertyDetails, price: value });
            }
          }}
        />

        <textarea
          placeholder="Description"
          className="border rounded-md p-2 mb-4"
          value={propertyDetails.description}
          onChange={(e) => setPropertyDetails({ ...propertyDetails, description: e.target.value })}
        />

        <input
          type="number"
          placeholder="Beds"
          className="border rounded-md p-2 mb-4"
          value={propertyDetails.beds !== '' ? propertyDetails.beds : ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || Number(value) >= 0) {
              setPropertyDetails({ ...propertyDetails, beds: value });
            }
          }}
        />

        <input
          type="number"
          placeholder="Baths"
          className="border rounded-md p-2 mb-4"
          value={propertyDetails.baths !== '' ? propertyDetails.baths : ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || Number(value) >= 0) {
              setPropertyDetails({ ...propertyDetails, baths: value });
            }
          }}
        />

        <input
          type="number"
          placeholder="Garages"
          className="border rounded-md p-2 mb-4"
          value={propertyDetails.garages !== '' ? propertyDetails.garages : ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || Number(value) >= 0) {
              setPropertyDetails({ ...propertyDetails, garages: value });
            }
          }}
        />

        <input
          type="number"
          placeholder="Square Feet"
          className="border rounded-md p-2 mb-4"
          value={propertyDetails.sqft !== '' ? propertyDetails.sqft : ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || Number(value) >= 0) {
              setPropertyDetails({ ...propertyDetails, sqft: value });
            }
          }}
        />

        <div
          {...getRootProps()}
          style={{
            background: "#e3e3e3",
            padding: "20px",
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="flex items-center gap-4">
              <img src="/img/add_image.svg" className="w-16" alt="" />
              <p className="font-bold">Drag 'n' drop some files here, or click to select files</p>
            </div>
          )}
        </div>

        {acceptedFiles.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {acceptedFiles.map((file) => (
              <img
                key={file.name}
                src={URL.createObjectURL(file)}
                alt=""
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'cover',
                }}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>
        )}
        
        <button type="submit" className="bg-blue-500 text-white font-bold text-2xl hover:bg-blue-800 rounded-md p-2 mt-4 md:w-1/5 h-14">P O S T</button>
      </form>

      {/* Mostrar imágenes subidas */}
      {uploadedImages.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">Uploaded Images:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {uploadedImages.map((image) => (
              <img
                key={image.public_id}
                src={image.secure_url} // Usar la URL segura proporcionada por Cloudinary
                alt=""
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'cover',
                }}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostProperty;