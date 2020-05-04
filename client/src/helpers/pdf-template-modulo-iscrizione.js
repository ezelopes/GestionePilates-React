import React from "react";
import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({ family: 'Roboto', src: 'source' });

const styles = StyleSheet.create({
    body: {
        paddingTop: 20,
        paddingHorizontal: 35,
        paddingBottom: 20,
    },
    image: {
        height: 60,
        width: 100,
    },
    date: {
        textAlign: 'right',
        fontSize: 10,
        marginTop: 5,
        marginRight: 15,
    },
    title: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 15,
        fontWeight: 'bold',
    },
    content: {
        textAlign: 'left',
        fontSize: 10,
        marginTop: 15,
        lineHeight: 1.6
    }
});

const ModuloIscrizione = ({ allievaInfo }) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Image style={styles.image} src="../images/PILATES_LOGO.png" />
        <View style={styles.date}>
            <Text> Data ____/____/________ </Text>
        </View>
        <View style={styles.title}>
          <Text> DOMANDA DI ISCRIZIONE A SOCIO / ATLETA </Text>
        </View>
        <View style={styles.content}>
          <Text>
            Il sottoscritto/a <Text>{allievaInfo.Nome}</Text> <Text>{allievaInfo.Cognome}</Text> nato/a a <Text>{allievaInfo.LuogoNascita}</Text> il <Text>{allievaInfo.DataNascita}</Text> C.F. <Text>{allievaInfo.CodiceFiscale}</Text>. Residente in via <Text>{allievaInfo.Indirizzo}</Text> a <Text>{allievaInfo.Citta}</Text>. Cellulare: <Text>{allievaInfo.Cellulare}</Text> Email: <Text>{allievaInfo.Email}</Text>
          </Text>
          
          <Text style={{textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>
            richiede la tessere associativa alla A.S.D PIL ART sito a STEZZANO, Via CESARE BATTISTI n. 9/A
          </Text>
         
          
          <Text style={{marginTop: 15}}>
            1-Dichiaro di conoscere lo Statuto, di accettarlo integralmente, si impegna a fare quanto nelle sue possibilità per il raggiungimento degli scopi sociali e ad osservare le deliberazioni degli organi sociali, di conoscere le condizioni delle polizze assicurative presenti sul sito www.acsi.it. 2-Informativa GDPR UE 679/16: La scrivente Associazione dichiara che, tutti i dati sensibili personali saranno utilizzati solo per scopi sportivi. La parte cartacea sarà archiviata presso la sede sociale di VIA C. BATTISTI 9/A e/o presso lo studio commerciale PROGGETTO IMPRESA SRL, la parte in formato digitale sarà custodita dal Presidente e/o il Segretario della stessa ASD. I dati per i tesseramenti saranno inseriti nella piattaforma nazionale di ACSI (ente di promozione sportiva). 
            <Text style={{fontWeight: 'bold'}}>
               3-Autorizzo ad effettuare ed utilizzare riprese fotografiche e video per poter propagandare le attività sociali sui canali ufficiali dell’Associazione (sitoweb/facebook/ecc...).
            </Text>
            <Text>Delle voci 1, 2, 3 <Text style={{fontWeight: 'bold'}}>ACCETTO</Text></Text>
          </Text>

          <Text style={{marginTop: 15}}>
            La disciplina sportiva svolta nella ASD PIL ART è <Text>{allievaInfo.Disciplina}</Text>, per cui il socio ci consegna un certificato medico di idoneità sportiva con scadenza <Text>{allievaInfo.DataCertificato}</Text>, del tipo:
          </Text>
          <Text style={{marginTop: 15}}>
            ___ AGONISTICA, certificato di idoneità agonistica sportiva
          </Text>
          <Text>
            ___ NON AGONISTICA, certificato di idoneità per attività sportive non agonistiche
          </Text>
          <Text style={{marginTop: 15}}>
            La copertura assicurativa proposta è (barrare la copertura scelta)  ___ Base    ___ Integrativa     ___ Superintegrativa
          </Text>
          <Text style={{marginTop: 15}}>
            N. Tessera ACSI assegnato __________________
          </Text>
          <Text style={{textAlign: 'right'}}>
            Firma __________________________
          </Text>
          
          <Text style={{ fontSize: 12, marginTop: 15, fontWeight: 'bold' }}>
            PER I MINORI
          </Text>
          <Text style={{marginTop: 15}}>
            Figlio fiscalmente a carico del genitore: <Text>{allievaInfo.NomeGenitore}</Text> <Text>{allievaInfo.CognomeGenitore}</Text>
          </Text>
          <Text style={{marginTop: 15}}>
            Codice Fiscale di chi firma: <Text>{allievaInfo.CodiceFiscaleGenitore}</Text>
          </Text>
          <Text style={{marginTop: 15}}>
            Firma del genitore ______________________________  
          </Text>
        </View>

        {/* 
        <View>
          <Text>
            Il sottoscritto/a {props.allievaInfo.Nome} ${props.allievaInfo.Cognome} nato/a a {props.allievaInfo.LuogoNascita} il {props.allievaInfo.DataNascita}
            C.F. {props.allievaInfo.CodiceFiscale}. Residente in via {props.allievaInfo.Indirizzo} a {props.allievaInfo.Citta}. Cellulare: {props.allievaInfo.Cellulare}
            Email: {props.allievaInfo.Email}
          </Text>
        </View> */}
      </Page>
    </Document>
  );
}

// const styles = StyleSheet.create({
//     body: {
//       paddingTop: 35,
//       paddingBottom: 65,
//       paddingHorizontal: 35,
//     },
//     section: {
//       margin: 10,
//       padding: 10,
//     flexGrow: 1
//     }
//   });

// const ModuloIscrizione = (props) => {
//   const { allievaInfo } = props;
//   console.log("pdf props", props.allievaInfo);
//   return (
//     <Document>
//       <Page size="A4" style={styles.body}>
//         {/* <Image
//           style={styles.image}
//           src="../images/PILATES_LOGO.png"
//         /> */}
//         <View style={styles.section}>
//           <Text> Data ____/____/________ </Text>
//         </View>
//         <View style={styles.section}>
//           <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>
//             DOMANDA DI ISCRIZIONE A SOCIO / ATLETA
//           </Text>
//         </View>
//         <Text>
//           Il sottoscritto/a {allievaInfo.Nome} ${allievaInfo.Cognome} nato/a a {allievaInfo.LuogoNascita} il {allievaInfo.DataNascita}
//           C.F. {allievaInfo.CodiceFiscale}. Residente in via {allievaInfo.Indirizzo} a {allievaInfo.Citta}. Cellulare: {allievaInfo.Cellulare}
//           Email: {allievaInfo.Email}
//         </Text>
//         <Text style={{ fontWeight: 'bold' }}>
//           richiede la tessere associativa alla A.S.D PIL ART sito a STEZZANO, Via CESARE BATTISTI n. 9/A
//         </Text>
//         <Text style={{ fontSize: '8px' }}>
//           1-Dichiaro di conoscere lo Statuto, di accettarlo integralmente, si impegna a fare quanto nelle sue possibilità per il raggiungimento degli scopi sociali e ad osservare le deliberazioni degli organi sociali, di conoscere le condizioni delle polizze assicurative presenti sul sito www.acsi.it. 2-Informativa GDPR UE 679/16: La scrivente Associazione dichiara che, tutti i dati sensibili personali saranno utilizzati solo per scopi sportivi. La parte cartacea sarà archiviata presso la sede sociale di VIA C. BATTISTI 9/A e/o presso lo studio commerciale PROGGETTO IMPRESA SRL, la parte in formato digitale sarà custodita dal Presidente e/o il Segretario della stessa ASD. I dati per i tesseramenti saranno inseriti nella piattaforma nazionale di ACSI (ente di promozione sportiva).
//         </Text>
//         <Text style={{ fontSize: '10px', fontWeight: 'bold' }}>
//           3-Autorizzo ad effettuare ed utilizzare riprese fotografiche e video per poter propagandare le attività sociali sui canali ufficiali dell’Associazione (sitoweb/facebook/ecc...), 
//         </Text>
//         <Text style={{ fontSize: '8px' }}>
//           delle voci 1, 2, 3
//         </Text>
//         <Text style={{ fontSize: '10px', fontWeight: 'bold' }}>
//           ACCETTO
//         </Text>
//         <Text style={{ fontSize: '10px' }}>
//           La disciplina sportiva svolta nella ASD PIL ART è {allievaInfo.Disciplina}, per cui il socio ci consegna un certificato medico di idoneità sportiva con scadenza {allievaInfo.DataCertificato}, del tipo:
//         </Text>
//         <Text>
//           ___ AGONISTICA, certificato di idoneità agonistica sportiva
//         </Text>
//         <Text>
//           ___ NON AGONISTICA, certificato di idoneità per attività sportive non agonistiche
//         </Text>
//         <Text>
//           La copertura assicurativa proposta è (barrare la copertura scelta)
//         </Text>
//         <Text>
//           ___ Base \t\t\t  ___ Integrativa \t\t\t ___ Superintegrativa
//         </Text>
//         <Text>
//           'N. Tessera ACSI assegnato __________________
//         </Text>
//         <Text>
//           Firma __________________________
//         </Text>

//         {/* LINE */}

//         <Text style={{ fontWeight: 'bold' }}>
//           PER I MINORI
//         </Text>
//         <Text>
//           Figlio fiscalmente a carico del genitore: {allievaInfo.NomeGenitore} {allievaInfo.CognomeGenitore}
//         </Text>
//         <Text>
//           Codice Fiscale di chi firma: ${allievaInfo.CodiceFiscaleGenitore}
//         </Text>
//         <Text>
//           Firma del genitore ______________________________  
//         </Text>
//       </Page>
//     </Document>
//   )
// }

export default ModuloIscrizione;