
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star } from 'lucide-react';
import { mockRooms } from '@/data/mockData';
import Layout from '@/components/Layout';

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const filteredRooms = mockRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = availabilityFilter === 'all' || 
      (availabilityFilter === 'available' && room.isAvailable) ||
      (availabilityFilter === 'unavailable' && !room.isAvailable);
    
    return matchesSearch && matchesAvailability;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-900">Lista de quartos</h1>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 rounded-lg"
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
          
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-full sm:w-40 h-11 rounded-lg">
              <SelectValue placeholder="Disponíveis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="available">Disponíveis</SelectItem>
              <SelectItem value="unavailable">Indisponíveis</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-full sm:w-32 h-11 rounded-lg">
              <SelectValue placeholder="Valor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="low">Até R$ 300</SelectItem>
              <SelectItem value="medium">R$ 300-400</SelectItem>
              <SelectItem value="high">Acima R$ 400</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid de quartos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.name}</h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-2xl font-bold text-gray-900">
                        R$ {room.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-sm text-gray-500">/Noite</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <button className="text-gray-400 hover:text-yellow-500">
                      <Star size={24} />
                    </button>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      room.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {room.isAvailable ? 'Disponível' : 'Indisponível'}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Link to={`/room/${room.id}`}>
                    <Button 
                      variant="outline" 
                      className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                    >
                      Ver detalhes
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum quarto encontrado com os filtros aplicados.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Rooms;
