import Link from "next/link";
import { useState } from "react";

//göm majjelåtar mellan månad 6 och 9
function HideDate(currentMonth){
  if (currentMonth < 6 || currentMonth > 9) {
    return false;
  } 
  return true;
}

function Sangbok() {
  const [search, setSearch] = useState("");
  const [alphabetical, setAlphabetical] = useState(false)
  const currentMonth = (new Date).getMonth()

  return (
    <div id="contentbody">
      <h1>Sångbok</h1>
      <p>
        Nedan finner du samtliga sånger från sektionens officiella sångbok. Fysisk kopia av
        sångboken finns att köpa för 130 kr. Prata med försäljningsansvarig! Samtliga illustrationer
        är skapade av Rebecka Ingram CL18.
      </p>

      <div className="inputfält-sångbok">
        <input
          type="text"
          placeholder="Sök efter sång..."
          onChange={(e) => setSearch(e.target.value)}
          className="searchbar sångbok"
        />
        <div className="filter">Sortera på kategori</div>
        <input
          type="checkbox"
          onChange={() => setAlphabetical(!alphabetical)}
          className="filterbutton"
        />
      </div>

      {
        sånger
        .filter((sång) => {
          return search.toLowerCase() === ""
            ? sång
            : sång.title.toLowerCase().includes(search.toLowerCase());
          })
        .sort(
          alphabetical?
          function(a, b){
          if(a.kategori < b.kategori) { return -1; }
          if(a.kategori > b.kategori) { return 1; }
          return 0;
          }
          :
          function(a, b){
            if(a.title < b.title) { return -1; }
            if(a.title > b.title) { return 1; }
            return 0;
          })
        .map((sång) => ((sång.hemlig && HideDate(currentMonth))? "" :
          <Link href={`sangbok${sång.href}`} className="sånglänk" key={sång.href}>
            <div>
              <span className="sångtitel">{sång.title}</span>
              <span className="sångsida">&nbsp; s.{sång.sida}</span>
            </div>
            <div className="sångkategori">&nbsp; {sång.kategori}</div>
          </Link>
        ))
      }
    </div>
  );
}
export default Sangbok;


//Sånger som nämnder eller refererar till magistratet har en attribut 'hemlig: true'
const sånger = [
  { 
    title: "800 rader", 
    href: "/800_rader", 
    sida: "86",
    kategori: "STEM-sång"
  },
  { 
    title: "Alla sorters punsch", 
    href: "/alla_sorters_punsch", 
    sida: "71",
    kategori: "Punschvisor"
  },
  { 
    title: "Bordeaux, Bordeaux", 
    href: "/bordeaux_bordeaux", 
    sida: "51",
    kategori: "Öl och vin"
  },
  { 
    title: "Byssan full", 
    href: "/byssan_full", 
    sida: "60",
    kategori: "Nubbevisor"
  },
  { 
    title: "CL i mitt hjärta", 
    href: "/cl_i_mitt_hjarta", 
    sida: "93",
    kategori: "Visor om CL",
    hemlig: true
  },
  { 
    title: "Crassus vinsång", 
    href: "/crassus_vinsang", 
    sida: "54",
    kategori: "Öl och vin"
  },
  { 
    title: "Danse Macabre", 
    href: "/danse_macabre", 
    sida: "39",
    kategori: "Rubb och stubb"
  },
  { 
    title: "De har kallat oss svin", 
    href: "/de_har_kallat_oss_svin", 
    sida: "121",
    kategori: "Gäst på fest"
  },
  { 
    title: "Den som spar hen har", 
    href: "/den_som_spar_hen_har", 
    sida: "65",
    kategori: "Nubbevisor"
  },
  { 
    title: "Den vingklippta måsen", 
    href: "/den_vingklippta_masen", 
    sida: "59",
    kategori: "Nubbevisor"
  },
  { 
    title: "Denna thaft", 
    href: "/denna_thaft", 
    sida: "68",
    kategori: "Nubbevisor"
  },
  { 
    title: "Det regnar ner i dalen", 
    href: "/det_regnar_ner_i_dalen", 
    sida: "36",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Djungelpunsch", 
    href: "/djungelpunsch", 
    sida: "72",
    kategori: "Punschvisor"
  },
  { 
    title: "Dominoeffekten", 
    href: "/dominoeffekten", 
    sida: "43",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Du gamla, du fria", 
    href: "/du_gamla_du_fria", 
    sida: "26",
    kategori: "Centralt innehåll"
  },
  { 
    title: "Du gamla vin", 
    href: "/du_gamla_vin", 
    sida: "56",
    kategori: "Öl och vin"
  },
  {
    title: "Du ska få mitt gamla snapsglas", 
    href: "/du_ska_fa_mitt_gamla_snapsglas", 
    sida: "60",
    kategori: "Nubbevisor"
  },
  { 
    title: "Emojivisan", 
    href: "/emojivisan", 
    sida: "79",
    kategori: "STEM-sång"
  },
  { 
    title: "En arkitektstudent", 
    href: "/en_arkitektstudent", 
    sida: "120",
    kategori: "Gäst på fest"
  },
  { 
    title: "En Bergsman älskar", 
    href: "/en_bergsman_alskar", 
    sida: "110",
    kategori: "Gäst på fest"
  },  
  { 
    title: "En gång i månan", 
    href: "/en_gang_i_manen", 
    sida: "61",
    kategori: "Nubbevisor"
  },
  { 
    title: "En kan dricka vatten", 
    href: "/en_kan_dricka_vatten", 
    sida: "38",
    kategori: "Rubb och stubb"
  },
  { 
    title: "En liten blå förgätmigej", 
    href: "/en_liten_bla_forgatmigej", 
    sida: "21",
    kategori: "Centralt innehåll"
  },
  { 
    title: "En liten teknolog", 
    href: "/en_liten_teknolog", 
    sida: "83",
    kategori: "STEM-sång"
  },
  { 
    title: "En matematiker", 
    href: "/en_matematiker", 
    sida: "88",
    kategori: "STEM-sång"
  },
  { 
    title: "En pilsnerdrickare", 
    href: "/en_pilsnerdrickare", 
    sida: "49",
    kategori: "Öl och vin"
  },
  { 
    title: "Enhetsvisan", 
    href: "/enhetsvisan", 
    sida: "78",
    kategori: "STEM-sång"
  },
  { 
    title: "Femton fransyskor", 
    href: "/femton_fransyskor", 
    sida: "52",
    kategori: "Öl och vin"
  },
  { 
    title: "Festen ska börjas", 
    href: "/festen_ska_borjas", 
    sida: "32",
    kategori: "Rubb och stubb"
  },
  { 
    title: "FESTU:s punschvisa", 
    href: "/festus_punschvisa", 
    sida: "73",
    kategori: "Punschvisor"
  },
  { 
    title: "Finland är Finland", 
    href: "/finland_ar_finland", 
    sida: "46",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Fiskarna", 
    href: "/fiskarna", 
    sida: "62",
    kategori: "Nubbevisor"
  },
  { 
    title: "Fkåne faft", 
    href: "/fkane_faft", 
    sida: "68",
    kategori: "Nubbevisor"
  },
  { 
    title: "Flygarsupen", 
    href: "/flygarsupen", 
    sida: "118",
    kategori: "Gäst på fest"
  },
  { 
    title: "Försvarstal för broder Tuck", 
    href: "/forsvarstal_for_broder_tuck", 
    sida: "44",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Fredmans sång nummer 21", 
    href: "/fredmans_sang_nr_21", 
    sida: "30",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Full är bäst", 
    href: "/full_ar_bast", 
    sida: "38",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Fyll på", 
    href: "/fyll_pa", 
    sida: "111",
    kategori: "Gäst på fest"
  },
  { 
    title: "Gråttans sång", 
    href: "/grattans_sang", 
    sida: "96",
    kategori: "Visor om CL"
  },
  {
    title: "Gräv ur skandinaviska tundran",
    href: "/grav_ur_skandinaviska_tundran",
    sida: "67",
    kategori: "Nubbevisor"
  },
  { 
    title: "Gräv ur tundran", 
    href: "/grav_ur_tundran", 
    sida: "67",
    kategori: "Nubbevisor"
  },
  { 
    title: "Gums visa", 
    href: "/gums_visa", 
    sida: "63",
    kategori: "Nubbevisor"
  },
  { 
    title: "Hallen lutar", 
    href: "/hallen_lutar", 
    sida: "40",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Hej tomtegubbar", 
    href: "/hej_tomtegubbar", 
    sida: "63",
    kategori: "Nubbevisor"
  },
  { 
    title: "Hell and Gore", 
    href: "/hell_and_gore", 
    sida: "68",
    kategori: "Nubbevisor"
  },
  { 
    title: "Humlorna", 
    href: "/humlorna", 
    sida: "62",
    kategori: "Nubbevisor"
  },
  { 
    title: "Här kommer det elektriker", 
    href: "/har_kommer_det_elektriker", 
    sida: "111",
    kategori: "Gäst på fest"
  },  
  { 
    title: "I Californien", 
    href: "/i_californien", 
    sida: "42",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Identitetskris", 
    href: "/identitetskris", 
    sida: "90",
    kategori: "Visor om CL"
  },
  { 
    title: "Imperial punsch", 
    href: "/imperial_punsch", 
    sida: "74",
    kategori: "Punschvisor"
  },
  { 
    title: "Imperial system", 
    href: "/imperial_system", 
    sida: "78",
    kategori: "STEM-sång"
  },
  { 
    title: "Ingenjörssektionens sång", 
    href: "/ingenjorssektionens_sang", 
    sida: "117",
    kategori: "Gäst på fest"
  },
  { 
    title: "Integrera", 
    href: "/integrera", 
    sida: "85",
    kategori: "STEM-sång"
  },
  { 
    title: "Jag har aldrig var’t på snusen (m.m.)", 
    href: "/jag_har_aldrig", 
    sida: "98",
    kategori: ""
  },
  { 
    title: "Jag ska festa", 
    href: "/jag_ska_festa", 
    sida: "33",
    kategori: "Rubb och stubb"
  },
  { 
    title: "JASen", 
    href: "/jasen", 
    sida: "59",
    kategori: "Nubbevisor"
  },
  { 
    title: "Kalmarevisan", 
    href: "/kalmare_visan", 
    sida: "34",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Kasta supen", 
    href: "/kastasupen", 
    sida: "61",
    kategori: "Nubbevisor"
  },
  {
    title: "Kemisången", 
    href: "/kemisangen", 
    sida: "78",
    kategori: "STEM-sång"
  },
  { 
    title: "Konglig Fysiks Paradhymn", 
    href: "/konglig_fysiks_paradhymn", 
    sida: "115",
    kategori: "Gäst på fest"
  },
  { 
    title: "Konglig Datasektionens Sektionssång", 
    href: "/data_sektionssang", 
    sida: "110",
    kategori: "Gäst på fest"
  },
  { 
    title: "Kungssången", 
    href: "/kungssangen", 
    sida: "23",
    kategori: "Centralt innehåll"
  },
  { 
    title: "Liljekonvaljen", 
    href: "/liljekonvaljen", 
    sida: "112",
    kategori: "Gäst på fest"
  },
  { 
    title: "Livet i Gråttan", 
    href: "/livet_i_grattan", 
    sida: "92",
    kategori: "Visor om CL"
  },
  { 
    title: "Livsmusik", 
    href: "/livsmusik", 
    sida: "29",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Lyft ditt välförsedda glas", 
    href: "/lyft_ditt_valforsedda_glas", 
    sida: "43",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Långt ner i Småland", 
    href: "/langt_ner_i_smaland", 
    sida: "119",
    kategori: "Gäst på fest"
  },
  { 
    title: "Lärarsången", 
    href: "/lararsangen", 
    sida: "118",
    kategori: "Gäst på fest"
  },
  { 
    title: "Magistratets makt", 
    href: "/magistratets_makt", 
    sida: "94",
    kategori: "Visor om CL",
    hemlig: true
  },
  { 
    title: "Matlab", 
    href: "/matlab", 
    sida: "82",
    kategori: "STEM-sång"
  },
  { 
    title: "Mediehymnen", 
    href: "/mediehymnen", 
    sida: "114",
    kategori: "Gäst på fest"
  },
  { 
    title: "Mellansup", 
    href: "/mellansup", 
    sida: "32",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Moder Kista", 
    href: "/moder_kista", 
    sida: "114",
    kategori: "Gäst på fest"
  },
  { 
    title: "Moosen", 
    href: "/moosen", 
    sida: "58",
    kategori: "Nubbevisor"
  },
  { 
    title: "Musen", 
    href: "/musen", 
    sida: "59",
    kategori: "Nubbevisor"
  },
  { 
    title: "Måsen", 
    href: "/masen", 
    sida: "58",
    kategori: "Nubbevisor"
  },
  { 
    title: "När kaffet är serverat", 
    href: "/nar_kaffet_ar_serverat", 
    sida: "74",
    kategori: "Punschvisor"
  },
  { 
    title: "O gamla klang och jubeltid", 
    href: "/o_gamla_klang_och_jubeltid", 
    sida: "24",
    kategori: "Centralt innehåll"
  },
  { 
    title: "O hemska labb", 
    href: "/o_hemska_labb", 
    sida: "84",
    kategori: "STEM-sång"
  },
  { 
    title: "Ode till skon", 
    href: "/ode_till_skon", 
    sida: "49",
    kategori: "Öl och vin"
  },
  { 
    title: "Osqviksägen", 
    href: "/osqviksagen", 
    sida: "91",
    kategori: "Visor om CL"
  },
  { 
    title: "Planksaft", 
    href: "/planksaft", 
    sida: "66",
    kategori: "Nubbevisor"
  },
  { 
    title: "Pojkar på W", 
    href: "/pojkar_pa_w", 
    sida: "112",
    kategori: "Gäst på fest"
  },
  { 
    title: "Porthos visa", 
    href: "/porthos_visa", 
    sida: "20",
    kategori: "Centralt innehåll" 
  },
  { 
    title: "Punsch, punsch", 
    href: "/punsch_punsch", 
    sida: "71",
    kategori: "Punschvisor"
  },
  { 
    title: "Punschen kommer (kall)", 
    href: "/punschen_kommer_kall", 
    sida: "70",
    kategori: "Punschvisor"
  },
  { 
    title: "Punschen kommer (varm)", 
    href: "/punschen_kommer_varm", 
    sida: "70",
    kategori: "Punschvisor"
  },
  { 
    title: "Punschen! Punschen!", 
    href: "/punschen_punschen", 
    sida: "75",
    kategori: "Punschvisor"
  },
  { 
    title: "Punschens lov", 
    href: "/punschens_lov", 
    sida: "73",
    kategori: "Punschvisor"
  },
  { 
    title: "Siffervisan", 
    href: "/siffervisan", 
    sida: "83",
    kategori: "STEM-sång"
  },
  { 
    title: "S-ingenjören", 
    href: "/s_ingenjoren", 
    sida: "113",
    kategori: "Gäst på fest"
  },  
  { 
    title: "Sista punschvisan", 
    href: "/sista_punschvisan", 
    sida: "76",
    kategori: "Punschvisor"
  },
  { 
    title: "Snapsens ABC", 
    href: "/snapsens_abc", 
    sida: "61",
    kategori: "Nubbevisor"
  },
  { 
    title: "Spegelvisan", 
    href: "/spegelvisan", 
    sida: "56",
    kategori: "Öl och vin"
  },
  { 
    title: "Spritbolaget", 
    href: "/spritbolaget", 
    sida: "31",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Strejk på Pripps", 
    href: "/strejk_pa_pripps", 
    sida: "48",
    kategori: "Öl och vin"
  },
  { 
    title: "Studentsången", 
    href: "/studentsangen", 
    sida: "26",
    kategori: "Centralt innehåll"
  },
  { 
    title: "Supen", 
    href: "/supen", 
    sida: "31",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Sveriges arraktionalhymn", 
    href: "/sveriges_arraktionalhymn", 
    sida: "75",
    kategori: "Punschvisor"
  },
  { 
    title: "Svåra ord", 
    href: "/svara_ord", 
    sida: "28",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Sång om tentor", 
    href: "/sang_om_tentor", 
    sida: "88",
    kategori: "STEM-sång"
  },
  { 
    title: "Sädesfälten", 
    href: "/sadesfalten", 
    sida: "64",
    kategori: "Nubbevisor"
  },
  { 
    title: "Tacksången", 
    href: "/tack_sangen", 
    sida: "21",
    kategori: "Centralt innehåll"
  },
  { 
    title: "Teknogoghymnen", 
    href: "/teknogoghymnen", 
    sida: "22",
    kategori: "Centralt innehåll"
  },
  { 
    title: "Telges sång", 
    href: "/telges_sang", 
    sida: "120",
    kategori: "Gäst på fest"
  },
  { 
    title: "Toj hemtegubbar", 
    href: "/toj_hemtegubbar", 
    sida: "63",
    kategori: "Nubbevisor"
  },
  { 
    title: "Tänk om jag hade lilla nubben", 
    href: "/tank_om_jag_hade_lilla_nubben", 
    sida: "64",
    kategori: "Nubbevisor"
  },
  { 
    title: "Tänk om jag inte var så tråkig", 
    href: "/tank_om_jag_inte_var_sa_trakig", 
    sida: "64",
    kategori: "Nubbevisor"
  },
  { 
    title: "Vårvinets lov", 
    href: "/varvinets_lov", 
    sida: "51",
    kategori: "Öl och vin"
  },
  { 
    title: "Vem sade ordet skål?", 
    href: "/vem_sade_ordet_skal", 
    sida: "60",
    kategori: "Nubbevisor"
  },
  { 
    title: "Veritas hermetica", 
    href: "/veritas_hermetica", 
    sida: "116",
    kategori: "Gäst på fest"
  },
  { 
    title: "Vi älskar öl", 
    href: "/vi_alskar_ol", 
    sida: "50",
    kategori: "Öl och vin"
  },
  { 
    title: "Vi dricka, vi dricka", 
    href: "/vi_dricka_vi_dricka", 
    sida: "32",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Vi kan visa en värld", 
    href: "/vi_kan_visa_en_varld", 
    sida: "95",
    kategori: "Visor om CL",
    hemlig: true
  },
  { 
    title: "Vi ska supa", 
    href: "/vi_ska_supa", 
    sida: "39",
    kategori: "Rubb och stubb"
  },
  { 
    title: "Vikingen", 
    href: "/vikingen", 
    sida: "65",
    kategori: "Nubbevisor"
  },
  { 
    title: "Vinet skänker", 
    href: "/vinet_skanker", 
    sida: "55",
    kategori: "Öl och vin"
  },
  { 
    title: "Änglarna", 
    href: "/anglarna", 
    sida: "62",
    kategori: "Nubbevisor"
  },
  { 
    title: "Öl, öl, öl i glas", 
    href: "/ol_ol_ol_i_glas", 
    sida: "48",
    kategori: "Öl och vin"
  },
];