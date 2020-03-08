const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const getBase64ImageFromURL = require('./get-base64-image');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfTemplateMinorenni = async (allievaInfo, ricevutaInfo) => {
  const label_logo = await getBase64ImageFromURL('../images/PILATES_LOGO.png');

  const docDefinition = {
    content: [
      {
        image: label_logo, // 'data:images/png;base64,' +
        fit: [100, 100]
        // pageBreak: 'after'
      },
      `${allievaInfo.CodiceFiscale}`,
      `${allievaInfo.Nome}`,
      `${allievaInfo.Cognome}`,
      `${ricevutaInfo.NumeroRicevuta}`
    ]
  };

  return docDefinition;
};

module.exports = pdfTemplateMinorenni;

// document.SetTopMargin(10); document.SetBottomMargin(0);
// document.SetFontSize(10);

// iText.IO.Image.ImageData imageData = iText.IO.Image.ImageDataFactory.Create("PILATES_LOGO.png");
// iText.Layout.Element.Image image = new iText.Layout.Element.Image(imageData).ScaleAbsolute(150, 50); // width and height

// document.Add(image);

// document.Add(new Paragraph($"Ricevuta n° { numeroRicevuta }").SetTextAlignment(TextAlignment.RIGHT));

// document.Add(new Paragraph("L’associazione sportiva dilettantistica PIL-ART con sede legale a Stezzano in Via C. Battisti 9°, C.F. 95229530167").SetTextAlignment(TextAlignment.CENTER));
// document.Add(new Paragraph("DICHIARA").SetTextAlignment(TextAlignment.CENTER));

// if (allieva.maggiorenne)
// {
//     document.Add(new Paragraph($"di aver ricevuto dal/dalla Sig./Sig.Ra {allieva.nome} {allieva.cognome} , C.F. {allieva.codiceFiscale}, " +
//         $"nato/a a {allieva.luogoNascita}, il {allieva.dataNascita.ToString("dd/MM/yyyy")} " +
//         $"residente in {allieva.indirizzo}, {allieva.citta}, la somma di {somma}€ ({sommaEuroInLettere.ToUpper()} Euro) per l'iscrizione al corso di {allieva.disciplina} dal {dataInizioRicevuta} " +
//         $"al {dataScadenza}").SetTextAlignment(TextAlignment.CENTER));
// }
// else
// {
//     document.Add(new Paragraph($"di aver ricevuto dal/dalla Sig./Sig.Ra {allieva.nomeGenitore} {allieva.cognomeGenitore}, " +
//         $"C.F. {allieva.codiceFiscaleGenitore}, il pagamento effetuato tramite {tipoPagamento.ToUpper()} equilavente alla somma di {somma}€ ({sommaEuroInLettere.ToUpper()} Euro), " +
//         $"per l'iscrizione di {allieva.nome} {allieva.cognome}, C.F. {allieva.codiceFiscale} nato/a a {allieva.luogoNascita}, " +
//         $"il {allieva.dataNascita.ToString("dd/MM/yyyy")} residente in {allieva.indirizzo}, {allieva.citta} " +
//         $"al corso di {allieva.disciplina} dal {dataInizioRicevuta} al {dataScadenza}").SetTextAlignment(TextAlignment.CENTER));

//     document.Add(new Paragraph("Si comunica che ai sensi dell-art. 15, comma 1°, lett. I-quinquies del TUIR, le spese, per un importo non superiore a 210 euro all’anno," +
//         " sostenute per l’iscrizione annuale e l’abbonamento, per i ragazzi di età compresa tra 5 e 18 anni, ad associazioni sportive dilettantistiche sono detraibili nella misura" +
//         " del 19% e che l’associazione risulta in possesso dei requisiti a tal fine richiesti").SetTextAlignment(TextAlignment.CENTER));
// }

// document.Add(new Paragraph($"Stezzano, {DateTime.Today.Date.ToString("dd-MM-yyyy")}"));
// document.Add(new Paragraph("Il Presidente").SetTextAlignment(TextAlignment.RIGHT));
// document.Add(new Paragraph("Roxana Carro").SetTextAlignment(TextAlignment.RIGHT));
// document.Add(new Paragraph("Pil Art è affiliata all’ACSI e regolarmente iscritta sul registro del CONI").SetFontSize(8));
