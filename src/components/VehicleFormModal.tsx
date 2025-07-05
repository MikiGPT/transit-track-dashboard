
import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { toast } from '../hooks/use-toast';

interface Vehicle {
  id?: string;
  registrationNumber: string;
  make: string;
  model: string;
  vin: string;
  year: string;
  status: 'aktivan' | 'na_popravci' | 'neaktivan';
  owner: string;
  mainDriver: string;
  currentMileage: number;
  fuelType: 'benzin' | 'dizel' | 'hibrid' | 'elektricno';
  category: 'kamion' | 'kombi' | 'automobil' | 'autobus';
}

interface VehicleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: Vehicle | null;
}

const VehicleFormModal: React.FC<VehicleFormModalProps> = ({ isOpen, onClose, vehicle }) => {
  const queryClient = useQueryClient();
  const isEditing = !!vehicle;

  const form = useForm<Vehicle>({
    defaultValues: {
      registrationNumber: '',
      make: '',
      model: '',
      vin: '',
      year: '',
      status: 'aktivan',
      owner: '',
      mainDriver: '',
      currentMileage: 0,
      fuelType: 'dizel',
      category: 'kamion',
    },
  });

  useEffect(() => {
    if (vehicle) {
      form.reset(vehicle);
    } else {
      form.reset({
        registrationNumber: '',
        make: '',
        model: '',
        vin: '',
        year: '',
        status: 'aktivan',
        owner: '',
        mainDriver: '',
        currentMileage: 0,
        fuelType: 'dizel',
        category: 'kamion',
      });
    }
  }, [vehicle, form]);

  const mutation = useMutation({
    mutationFn: async (data: Vehicle) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(isEditing ? 'Updating vehicle:' : 'Creating vehicle:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast({
        title: isEditing ? "Vozilo ažurirano" : "Vozilo dodato",
        description: isEditing 
          ? "Podaci o vozilu su uspešno ažurirani." 
          : "Novo vozilo je uspešno dodato u sistem.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom čuvanja vozila.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: Vehicle) => {
    mutation.mutate(data);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Izmeni Vozilo' : 'Dodaj Novo Vozilo'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registarski Broj *</FormLabel>
                    <FormControl>
                      <Input placeholder="BG 123-ABC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VIN Broj *</FormLabel>
                    <FormControl>
                      <Input placeholder="1HGBH41JXMN109186" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marka *</FormLabel>
                    <FormControl>
                      <Input placeholder="Mercedes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model *</FormLabel>
                    <FormControl>
                      <Input placeholder="Sprinter" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Godina Proizvodnje *</FormLabel>
                    <FormControl>
                      <Input placeholder="2020" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategorija *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Izaberite kategoriju" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kamion">Kamion</SelectItem>
                        <SelectItem value="kombi">Kombi</SelectItem>
                        <SelectItem value="automobil">Automobil</SelectItem>
                        <SelectItem value="autobus">Autobus</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tip Goriva *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Izaberite tip goriva" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dizel">Dizel</SelectItem>
                        <SelectItem value="benzin">Benzin</SelectItem>
                        <SelectItem value="hibrid">Hibrid</SelectItem>
                        <SelectItem value="elektricno">Električno</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Izaberite status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="aktivan">Aktivan</SelectItem>
                        <SelectItem value="na_popravci">Na Popravci</SelectItem>
                        <SelectItem value="neaktivan">Neaktivan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="owner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vlasnik *</FormLabel>
                    <FormControl>
                      <Input placeholder="Transport DOO" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mainDriver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Glavni Vozač</FormLabel>
                    <FormControl>
                      <Input placeholder="Marko Petrović" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentMileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trenutna Kilometraža</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="125000" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Odustani
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isEditing ? 'Ažuriranje...' : 'Dodavanje...'}
                  </>
                ) : (
                  isEditing ? 'Ažuriraj' : 'Dodaj Vozilo'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleFormModal;
