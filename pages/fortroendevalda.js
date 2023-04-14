import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CommitteeInfo from "../components/CommitteeInfo";
import { getContentData } from "../utils/contents";

export default function Fortroendevalda({ descriptions, contacts, committeesData }) {
  // Descriptions - Objekt med alla nämndbeskrivningar
  // Contacts - Objekt med alla namn och mail till förtroendevalda
  // CommitteeData - namn, icon och id till varje nämnd - används i menyn

  const router = useRouter();
  const [selectedCommittee, setSelectedCommittee] = useState("ctyrelsen");

  // När sidan laddats in så sätter vi selectedCommittee till det angivna i url:en
  useEffect(() => {
    const urlSelect = router.asPath.split("#")[1] || "ctyrelsen";
    setSelectedCommittee(urlSelect);
    console.log("inne");
  }, []);

  // När en användare väljer en nämnd uppdateras url:en och vilken nämnd som visas
  const stateUpdater = (committee) => {
    document.documentElement.scrollIntoView();
    setSelectedCommittee(committee);
  };

  // Nav Tab för varje nämnd/post i menyvalet
  const NavTab = ({ data }) => {
    return (
      <li
        id={data.id}
        className={selectedCommittee === data.id ? "active" : ""}
        onClick={() => stateUpdater(data.id)}>
        <i className={data.icon} /> {data.name}
      </li>
    );
  };

  return (
    <div id="contentbody">
      <div className="förtroendevalda_wrapper">
        <nav className="nämnder_nav">
          <ul id="nämnder_nav_ul">
            <NavTab data={committeesData.board} />

            <h2>Nämnder</h2>
            {committeesData.committees.map((committee, idx) => {
              return <NavTab data={committee} key={idx} />;
            })}
            <br />

            <h2>Övriga förtroendevalda</h2>
            {committeesData.trustees.map((trustee, idx) => {
              return <NavTab data={trustee} key={idx} />;
            })}
            <br />

            <h2>Sektionsföreningar</h2>
            {committeesData.associations.map((association, idx) => {
              return <NavTab data={association} key={idx} />;
            })}
          </ul>
        </nav>
        <div id="förtroendevalda_content">
          <CommitteeInfo
            committee={selectedCommittee}
            description={descriptions[selectedCommittee]}
            contact={contacts[selectedCommittee]}
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  let descriptions = getContentData("namndbeskrivningar");
  let contacts = getContentData("fortroendevalda");
  let committeesData = JSON.parse(getContentData("data")["committees-data"]);
  return {
    props: {
      descriptions,
      contacts,
      committeesData,
    },
  };
}
