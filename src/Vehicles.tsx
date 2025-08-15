import React, { useState } from 'react';
import { Truck, Users, Search, Plus, Pencil, Trash2, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Badge } from './components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';

// Mock data
const mockVehicles: Vehicle[] = [
  {
    id: 1,
    registarskiBroj: 'BG-001-AA',
    marka: 'Mercedes',
    model: 'Sprinter',
    status: 'aktivan' as const,
    vlasnik: 'Transport DOO',
    glavniVozac: 'Marko Petrović',
    trenutnaKilometraza: 125000,
  },
  {
    id: 2,
    registarskiBroj: 'NS-002-BB', 
    marka: 'Volkswagen',
    model: 'Crafter',
    status: 'na_popravci' as const,
    vlasnik: 'Transport DOO',
    glavniVozac: 'Ana Jovanović',
    trenutnaKilometraza: 98000,
  },
  {
    id: 3,
    registarskiBroj: 'NI-003-CC',
    marka: 'Ford',
    model: 'Transit',
    status: 'aktivan' as const,
    vlasnik: 'Logistics Ltd',
    glavniVozac: 'Petar Nikolić',
    trenutnaKilometraza: 156000,
  },
];

interface Vehicle {
  id?: number;
  registarskiBroj: string;
  marka: string;
  model: string;
  status: 'aktivan' | 'na_popravci' | 'neaktivan';
  vlasnik: string;
  glavniVozac: string;
  trenutnaKilometraza: number;
}

const Vehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<Vehicle>({
    registarskiBroj: '',
    marka: '',
    model: '',
    status: 'aktivan',
    vlasnik: '',
    glavniVozac: '',
    trenutnaKilometraza: 0,
  });

  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.registarskiBroj.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.marka.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setFormData({
      registarskiBroj: '',
      marka: '',
      model: '',
      status: 'aktivan',
      vlasnik: '',
      glavniVozac: '',
      trenutnaKilometraza: 0,
    });
    setIsModalOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData(vehicle);
    setIsModalOpen(true);
  };

  const handleDeleteVehicle = (id: number) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovo vozilo?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingVehicle) {
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? { ...formData, id: editingVehicle.id } : v));
    } else {
      const newVehicle = { ...formData, id: Date.now() };
      setVehicles([...vehicles, newVehicle]);
    }
    
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      aktivan: { color: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100', label: 'Aktivan' },
      na_popravci: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100', label: 'Na popravci' },
      neaktivan: { color: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100', label: 'Neaktivan' },
    };
    const config = statusMap[status as keyof typeof statusMap] || statusMap.neaktivan;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pregled Vozila</h1>
      </header>
      
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
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                    Registarski Broj
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                    Marka i Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                    Vlasnik
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                    Glavni Vozač
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                    Kilometraža
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                    Akcije
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                {filteredVehicles.map((vehicle) => (
                  <tr 
                    key={vehicle.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {vehicle.registarskiBroj}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {vehicle.marka} {vehicle.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(vehicle.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-300">
                      {vehicle.vlasnik}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-300">
                      {vehicle.glavniVozac}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-300">
                      {vehicle.trenutnaKilometraza.toLocaleString()} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditVehicle(vehicle);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteVehicle(vehicle.id!);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <Truck className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Nema vozila</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                {searchTerm ? 'Nema vozila koja odgovaraju pretragij.' : 'Počnite dodavanjem novog vozila.'}
              </p>
            </div>
          )}
        </div>

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingVehicle ? 'Izmeni Vozilo' : 'Dodaj Novo Vozilo'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="registarskiBroj">Registarski Broj</Label>
                  <Input
                    id="registarskiBroj"
                    value={formData.registarskiBroj}
                    onChange={(e) => setFormData({ ...formData, registarskiBroj: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="marka">Marka</Label>
                  <Input
                    id="marka"
                    value={formData.marka}
                    onChange={(e) => setFormData({ ...formData, marka: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Vehicle['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  >
                    <option value="aktivan">Aktivan</option>
                    <option value="na_popravci">Na popravci</option>
                    <option value="neaktivan">Neaktivan</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="vlasnik">Vlasnik</Label>
                <Input
                  id="vlasnik"
                  value={formData.vlasnik}
                  onChange={(e) => setFormData({ ...formData, vlasnik: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="glavniVozac">Glavni Vozač</Label>
                <Input
                  id="glavniVozac"
                  value={formData.glavniVozac}
                  onChange={(e) => setFormData({ ...formData, glavniVozac: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="trenutnaKilometraza">Trenutna Kilometraža</Label>
                <Input
                  id="trenutnaKilometraza"
                  type="number"
                  value={formData.trenutnaKilometraza}
                  onChange={(e) => setFormData({ ...formData, trenutnaKilometraza: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Odustani
                </Button>
                <Button type="submit">
                  {editingVehicle ? 'Sačuvaj Izmene' : 'Dodaj Vozilo'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Vehicles;