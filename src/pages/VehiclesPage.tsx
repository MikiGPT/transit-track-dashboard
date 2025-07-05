
import React, { useState } from 'react';
import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import VehiclesTable from '../components/VehiclesTable';
import VehicleFormModal from '../components/VehicleFormModal';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Plus, Search } from 'lucide-react';

const VehiclesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setIsModalOpen(true);
  };

  const handleEditVehicle = (vehicle: any) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVehicle(null);
  };

  return (
    <AppLayout>
      <Header title="Pregled Vozila" />
      
      <div className="p-6">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <Button onClick={handleAddVehicle} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Dodaj Novo Vozilo
          </Button>
          
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-400" />
            <Input
              type="text"
              placeholder="Pretraži vozila..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Data Table */}
        <VehiclesTable 
          searchTerm={searchTerm}
          onEditVehicle={handleEditVehicle}
        />

        {/* Modal */}
        <VehicleFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          vehicle={editingVehicle}
        />
      </div>
    </AppLayout>
  );
};

export default VehiclesPage;
