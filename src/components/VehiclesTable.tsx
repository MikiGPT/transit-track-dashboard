
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Pencil, Trash2, Loader2 } from 'lucide-react';
import { toast } from '../hooks/use-toast';

interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  status: 'aktivan' | 'na_popravci' | 'neaktivan';
  owner: string;
  mainDriver: string;
  currentMileage: number;
}

interface VehiclesTableProps {
  searchTerm: string;
  onEditVehicle: (vehicle: Vehicle) => void;
}

const VehiclesTable: React.FC<VehiclesTableProps> = ({ searchTerm, onEditVehicle }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const queryClient = useQueryClient();

  // Mock data for now - replace with actual API call
  const mockVehicles = [
    {
      id: '1',
      registrationNumber: 'BG 123-ABC',
      make: 'Mercedes',
      model: 'Sprinter',
      status: 'aktivan' as const,
      owner: 'Transport DOO',
      mainDriver: 'Marko Petrović',
      currentMileage: 125000
    },
    {
      id: '2',
      registrationNumber: 'NS 456-DEF',
      make: 'Volvo',
      model: 'FH16',
      status: 'na_popravci' as const,
      owner: 'Transport DOO',
      mainDriver: 'Stefan Nikolić',
      currentMileage: 89000
    },
    {
      id: '3',
      registrationNumber: 'NI 789-GHI',
      make: 'MAN',
      model: 'TGX',
      status: 'aktivan' as const,
      owner: 'Logistika Plus',
      mainDriver: 'Ana Jovanović',
      currentMileage: 67000
    }
  ];

  const { data: vehiclesData, isLoading, error } = useQuery({
    queryKey: ['vehicles', currentPage, searchTerm],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredVehicles = mockVehicles;
      
      if (searchTerm) {
        filteredVehicles = mockVehicles.filter(vehicle =>
          vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      return {
        data: filteredVehicles,
        meta: {
          total: filteredVehicles.length,
          page: currentPage,
          limit: 10,
          totalPages: Math.ceil(filteredVehicles.length / 10)
        }
      };
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (vehicleId: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleting vehicle:', vehicleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast({
        title: "Uspešno obrisano",
        description: "Vozilo je uspešno obrisano iz sistema.",
      });
      setDeleteDialogOpen(false);
      setVehicleToDelete(null);
    },
    onError: () => {
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom brisanja vozila.",
        variant: "destructive",
      });
    }
  });

  const handleDeleteClick = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (vehicleToDelete) {
      deleteMutation.mutate(vehicleToDelete.id);
    }
  };

  const getStatusBadge = (status: Vehicle['status']) => {
    const statusConfig = {
      aktivan: { variant: 'default' as const, text: 'Aktivan', className: 'bg-green-500 hover:bg-green-600' },
      na_popravci: { variant: 'secondary' as const, text: 'Na Popravci', className: 'bg-yellow-500 hover:bg-yellow-600' },
      neaktivan: { variant: 'destructive' as const, text: 'Neaktivan', className: 'bg-red-500 hover:bg-red-600' }
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.text}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Učitavanje vozila...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 dark:text-red-400">
          Greška prilikom učitavanja vozila. Molimo pokušajte ponovo.
        </p>
      </div>
    );
  }

  if (!vehiclesData?.data.length) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500 dark:text-slate-400">
          {searchTerm ? 'Nema vozila koja odgovaraju pretrazi.' : 'Nema vozila za prikaz.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Registarski Broj</TableHead>
              <TableHead>Marka i Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vlasnik</TableHead>
              <TableHead>Glavni Vozač</TableHead>
              <TableHead>Trenutna Kilometraža</TableHead>
              <TableHead className="text-right">Akcije</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehiclesData.data.map((vehicle) => (
              <TableRow 
                key={vehicle.id}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50"
                onClick={() => console.log('Navigate to vehicle details:', vehicle.id)}
              >
                <TableCell className="font-medium">{vehicle.registrationNumber}</TableCell>
                <TableCell>{vehicle.make} {vehicle.model}</TableCell>
                <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                <TableCell>{vehicle.owner}</TableCell>
                <TableCell>{vehicle.mainDriver}</TableCell>
                <TableCell>{vehicle.currentMileage.toLocaleString()} km</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditVehicle(vehicle);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(vehicle);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {vehiclesData.meta.totalPages > 1 && (
          <div className="p-4 border-t border-gray-200 dark:border-slate-700">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: vehiclesData.meta.totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(vehiclesData.meta.totalPages, prev + 1))}
                    className={currentPage === vehiclesData.meta.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Potvrda brisanja</AlertDialogTitle>
            <AlertDialogDescription>
              Da li ste sigurni da želite da obrišete vozilo "{vehicleToDelete?.registrationNumber}"? 
              Ova akcija se ne može poništiti.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Odustani
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Brisanje...
                </>
              ) : (
                'Obriši'
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default VehiclesTable;
