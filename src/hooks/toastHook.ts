import { useState } from "react";

export interface DatosToast {
  mensaje: string;
  titulo?: string;
  tipo?: 'success' | 'danger' | 'warning' | 'info';
  delay?: number;
}

export function useToast() {
  const [toast, setToast] = useState<DatosToast | null>(null);

  function mostrarToast({ mensaje, tipo = "success", titulo = "Aviso", delay = 2500 }: DatosToast) {
    setToast({ mensaje, tipo, titulo, delay });
  }

  function cerrarToast() {
    setToast(null);
  }

  return { toast, mostrarToast, cerrarToast };
}
