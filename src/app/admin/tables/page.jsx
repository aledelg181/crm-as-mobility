'use client'

import { useState, useEffect } from 'react';
import {
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';

export default function Component() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ key: '_id', order: 'desc' }); // Cambiamos el campo inicial a '_id' y orden descendente
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Datos de clientes en producción:', data.clients);
        setClients(data.clients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = Array.isArray(clients)
    ? clients
        .filter((client) => {
          const searchValue = search.toLowerCase();
          return (
            client.full_name?.toLowerCase().includes(searchValue) ||
            client.pais?.toLowerCase().includes(searchValue) ||
            client.correo_electronico?.toLowerCase().includes(searchValue) ||
            client.telefono?.toLowerCase().includes(searchValue)
          );
        })
        .sort((a, b) => {
          if (sort.order === 'asc') {
            return a[sort.key] > b[sort.key] ? 1 : -1;
          } else {
            return a[sort.key] < b[sort.key] ? 1 : -1;
          }
        })
        .slice((page - 1) * pageSize, page * pageSize)
    : [];

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (key) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ key, order: 'asc' });
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header
        style={{
          backgroundColor: '#1976d2',
          color: '#fff',
          padding: '16px',
          borderRadius: '4px 4px 0 0',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Gestión de Clientes</h1>
      </header>
      <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
        <div
          style={{
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Buscar clientes..."
            value={search}
            onChange={handleSearch}
            fullWidth
            variant="outlined"
            style={{ marginRight: '16px' }}
          />
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('full_name')} style={{ cursor: 'pointer' }}>
                Nombre {sort.key === 'full_name' && (sort.order === 'asc' ? '▲' : '▼')}
              </TableCell>
              <TableCell onClick={() => handleSort('pais')} style={{ cursor: 'pointer' }}>
                País {sort.key === 'pais' && (sort.order === 'asc' ? '▲' : '▼')}
              </TableCell>
              <TableCell onClick={() => handleSort('correo_electronico')} style={{ cursor: 'pointer' }}>
                Correo Electrónico {sort.key === 'correo_electronico' && (sort.order === 'asc' ? '▲' : '▼')}
              </TableCell>
              <TableCell onClick={() => handleSort('telefono')} style={{ cursor: 'pointer' }}>
                Teléfono {sort.key === 'telefono' && (sort.order === 'asc' ? '▲' : '▼')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow key={client._id}>
                  <TableCell>{client.full_name || 'No disponible'}</TableCell>
                  <TableCell>{client.pais || 'No disponible'}</TableCell>
                  <TableCell>{client.correo_electronico || 'No disponible'}</TableCell>
                  <TableCell>{client.telefono || 'No disponible'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay clientes disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '16px',
          borderRadius: '0 0 4px 4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Mostrar</span>
          <Select value={pageSize} onChange={handlePageSizeChange}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          <span>registros por página</span>
        </div>
        <Pagination
          count={Math.ceil(clients.length / pageSize)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
}
