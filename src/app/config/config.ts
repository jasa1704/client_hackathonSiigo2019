

export const URL_SERVICIOS = 'http://localhost:3000';

export default class Config {
  static LOGO_MIALCALDIA = "../../assets/img/Logos/Logoventanaprincipal.png";

  //Variables utilizadas para los PDFs
  static base = 20;
  static logoSize = {
    x: 49,
    y: 21
  };
  static marginPaper = {
    left: Config.base,
    right: Config.base,
    up: Config.base + 10,
    down: Config.base,
  }

  static bodyPaper = {
    width: Config.marginPaper.right - Config.marginPaper.left,
    high: Config.marginPaper.down - Config.marginPaper.up,
    title: Config.marginPaper.up + 4,
    startWithTitle: Config.marginPaper.up + 10,
    startWithOutTitle: Config.marginPaper.up,
    startNewPage: Config.marginPaper.up - 10,
  }

}

