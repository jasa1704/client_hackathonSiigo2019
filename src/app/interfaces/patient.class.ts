class Patient {
  public tpdoc: string;
  public numdoc: number;
  public nombre1: string;
  public nombre2: string;
  public apellido1: string;
  public apellido2: string;
  public sexo: string;
  public raza: string;
  public estadoCivil: string;
  public hijos: number;
  public celular: number;
  public correo: string;
  public fechaN:any = new Date();
  public fechaC:any = new Date();
  public direccion: string;
  public zona: string;
  public departamento: string;
  public municipio: string;
  public nivelEducativo: string;
  public regimenSS: string;
  public entidad: string;
  public nombreAcudiente: string;
  public celularAcudiente: string;
  public correoAcudiente: string;
  public img?: string;
  public role?: string;
  public _id?: string;
}

export { Patient }
