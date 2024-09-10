'use client'
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Modal } from '@mui/material';
import Select, { SingleValue, GroupBase, Props as SelectProps } from 'react-select';
import WorldFlag from 'react-world-flags';
import countryData from './countryData'; // Asegúrate de que este archivo tenga los datos correctos

interface OptionType {
  value: string;
  label: string;
  flag: string;
  code: string;
}

const formatOptions = (data: { name: string; code: string; flag: string }[]): OptionType[] => {
  return data.map(item => ({
    value: item.code,
    label: item.name,
    flag: item.flag,
    code: item.code
  }));
};

const customFormatOptionLabel = (option: OptionType) => (
  <div className="flex items-center">
    <WorldFlag code={option.flag} className="mr-2" style={{ width: 20, height: 20 }} />
    {option.label}
  </div>
);

export default function ToStep() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    country: {} as OptionType,
    email: "",
    phone: ""
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountryChange = (selectedOption: SingleValue<OptionType>) => {
    setFormData({
      ...formData,
      country: selectedOption || ({} as OptionType),
      phone: selectedOption ? selectedOption.code : "",
    });
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit(); 
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/formData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          pais: formData.country.label,
          correo_electronico: formData.email,
          telefono: formData.phone,
        }),
      });
  
      const result = await response.json();
      console.log('Resultado de la API:', result);
  
      if (response.ok) {
        setShowModal(true);
      } else {
        console.error('Error en el servidor:', result.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="min-h-screen flex flex-col items-center justify-center text-white font-sans">
      <Box className="bg-black bg-opacity-100 text-white p-8 rounded-lg shadow-lg w-full border border-gray-300">
        {step === 1 && (
          <Box>
            <Typography variant="h4" className="mb-4 text-white">Paso 1: Nombre Completo</Typography>
            <TextField
              fullWidth
              name="fullName"
              placeholder="Ingresa tu nombre completo"
              value={formData.fullName}
              onChange={handleChange}
              className="mb-4"
              InputProps={{
                style: {
                  color: 'white',
                  backgroundColor: '#444',
                },
              }}
              sx={{
                input: {
                  color: 'white',
                },
              }}
            />
          </Box>
        )}

        {step === 2 && (
          <Box>
            <Typography variant="h4" className="mb-4 text-white">Paso 2: País</Typography>
            <Select<OptionType, false, GroupBase<OptionType>>
              options={formatOptions(countryData)}
              value={formData.country}
              onChange={handleCountryChange}
              getOptionLabel={(option) => option.label} // Devuelve una cadena
              formatOptionLabel={customFormatOptionLabel} // Usa esta función para personalizar el diseño
              getOptionValue={(option) => option.value}
              className="mb-4 text-black"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#333',
                  borderColor: '#444',
                  color: 'white',
                }),
                singleValue: (base) => ({ ...base, color: 'white' }),
                menu: (base) => ({ ...base, backgroundColor: '#222' }),
                option: (base) => ({ ...base, color: 'white' }),
              }}
            />
          </Box>
        )}

        {step === 3 && (
          <Box>
            <Typography variant="h4" className="mb-4 text-white">Paso 3: Correo Electrónico</Typography>
            <TextField
              fullWidth
              name="email"
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="mb-4"
              InputProps={{
                style: {
                  color: 'white',
                  backgroundColor: '#444',
                },
              }}
              sx={{
                input: {
                  color: 'white',
                },
              }}
            />
          </Box>
        )}

        {step === 4 && (
          <Box>
            <Typography variant="h4" className="mb-4 text-white">Paso 4: Teléfono</Typography>
            <Box display="flex" alignItems="center">
              {formData.country && (
                <WorldFlag code={formData.country.flag} style={{ width: 30, height: 20, marginRight: 8 }} />
              )}
              <TextField
                fullWidth
                name="phone"
                placeholder="Ingresa tu número de teléfono"
                value={formData.phone}
                onChange={handleChange}
                InputProps={{
                  style: {
                    color: 'white',
                    backgroundColor: '#444',
                  },
                }}
                sx={{
                  input: {
                    color: 'white',
                  },
                }}
              />
            </Box>
          </Box>
        )}

        <Box display="flex" justifyContent="space-between" mt={4}>
          {step > 1 && (
            <Button onClick={prevStep} className="bg-red-600 text-white hover:bg-red-700">Anterior</Button>
          )}
          <Button onClick={nextStep} className="bg-red-600 text-white hover:bg-red-700">
            {step < 4 ? "Siguiente" : "Finalizar"}
          </Button>
        </Box>
      </Box>

      <Modal open={showModal} onClose={() => setShowModal(true)}>
        <Box className="bg-black bg-opacity-70 text-white p-8 rounded-lg shadow-lg border border-gray-300 mx-4 my-auto max-w-sm">
          <Typography variant="h4" className="mb-4">¡Formulario Completado!</Typography>
          <Typography>Gracias por completar el formulario.</Typography>
          <Button onClick={() => setShowModal(false)} className="mt-4 bg-red-600 text-white hover:bg-red-700">Cerrar</Button>
        </Box>
      </Modal>
    </Container>
  );
}
