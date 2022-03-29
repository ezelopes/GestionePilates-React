CREATE DATABASE gestionepilates;
USE gestionepilates;

DROP TABLE IF EXISTS `allieva`;

CREATE TABLE IF NOT EXISTS allieva (
  CodiceFiscale varchar(255),
  Maggiorenne varchar(255),
  Nome varchar(255),
  Cognome varchar(255),
  Citta varchar(255),
  Indirizzo varchar(255),
  Cellulare varchar(255),
  Email varchar(255),
  DataIscrizione DATETIME,
  DataCertificato DATETIME,
  DataNascita DATETIME,
  DataGreenPass DATETIME,
  LuogoNascita varchar(255),
  Disciplina varchar(255),
  NomeGenitore varchar(255),
  CognomeGenitore varchar(255),
  CodiceFiscaleGenitore varchar(255),
  Corso varchar(255),
  Scuola varchar(255),
  PRIMARY KEY (CodiceFiscale)
);

DROP TABLE IF EXISTS `insegnante`;

CREATE TABLE IF NOT EXISTS Insegnante (
  CodiceFiscale varchar(255),
  Nome varchar(255),
  Cognome varchar(255),
  Citta varchar(255),
  Indirizzo varchar(255),
  Cellulare varchar(255),
  Email varchar(255),
  DataIscrizione DATETIME,
  DataCertificato DATETIME,
  DataNascita DATETIME,
  DataGreenPass DATETIME,
  LuogoNascita varchar(255),
  Disciplina varchar(255),
  Corso varchar(255),
  Scuola varchar(255),
  PRIMARY KEY (CodiceFiscale)
);

DROP TABLE IF EXISTS `ricevuta`;

CREATE TABLE IF NOT EXISTS Ricevuta (
  RicevutaID int AUTO_INCREMENT,
  NumeroRicevuta varchar(255),
  TipoPagamento varchar(255),
  TipoRicevuta varchar(255),
  DataRicevuta DATETIME,
  DataInizioCorso DATETIME,
  DataScadenzaCorso DATETIME,
  SommaEuro varchar(255),
  FK_CodiceFiscale varchar(255),
  IncludeQuotaAssociativa bool,
  PRIMARY KEY (RicevutaID),
  FOREIGN KEY (FK_CodiceFiscale) REFERENCES Allieva(CodiceFiscale) ON UPDATE CASCADE
);

