import Link from "next/link";
export default function Valen() {
  const fake_data = ["4-2022", "5-2022", "1-2023", "2-2023"];
  return (
    <>
      <div id="contentbody">
        <h1 id="page-title">Valens äventyr</h1>
        <p>
          Här kan du hitta alla äventyr som Valen varit med om! Valen delas ut i slutet av varje
          sektionsmöte av sektionens talman. Den eller de som får valen bedöms ha bidragit extra
          mycket under mötet, med hjälp, humor eller något helt annat.
        </p>
        <ul>
          {fake_data.map((sm) => (
            <li key={sm}>
              <Link href={"valen/" + sm}>SM#{sm}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
