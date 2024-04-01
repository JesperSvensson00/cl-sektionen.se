import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

import { app } from "../../firebase/clientApp";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  or,
} from "firebase/firestore";
const firestore = getFirestore(app);

import { updateUser } from "../../utils/authUtils";
import { useAuth } from "../../context/AuthContext";

import CommitteeFeed from "./CommitteeFeed";
import MarkdownRender from "../MarkdownRender";
import ErrorPage from "../ErrorPage";
import { all_committees } from "../../constants/committees-data";

import { menu } from "../../styles/personalrummet.module.css";

export default function UserMenu({ contents }) {
  const [menuSelect, setMenuSelect] = useState("senaste");
  const [error, setError] = useState("");
  const [committeePosts, setCommitteePosts] = useState([]);

  const [userUpdateStatus, setUserUpdateStatus] = useState("");

  const { user, userData, logOut } = useAuth();
  const userCommitteeName = all_committees.find((namnd) => namnd.id == userData.committee).name;
  const router = useRouter();

  // Rensa error om man byter meny
  useEffect(() => {
    setError("");
    document.querySelectorAll(`.${menu} button`).forEach((elem) => {
      elem.style.backgroundColor = null;
    });
    document.querySelector(`#${menuSelect}`).style.backgroundColor = "var(--clr3)";
  }, [menuSelect]);

  // Hämtar de senaste inläggen nämnden skapat
  useEffect(() => {
    if (!userData.committee) {
      return;
    }
    console.log("getDoc - Committee Query");
    const postRef = collection(firestore, "posts");

    //Or allows committee name as publisher. i.e "Näringslivsnämnden" instead of "naringslivsnamnden"
    //Removing this means old test posts will not show up in feed
    //It's likely slightly more efficient to split this up as 2 separate queries but then "limit" will break.
    const committeeQuery = query(
      postRef,
      or(
        where("committee", "==", userData.committee),
        where("committee", "==", userCommitteeName),
        where("creator", "==", userData.uid)
      ),
      orderBy("publishDate", "desc"),
      limit(5)
    );

    getDocs(committeeQuery)
      .then((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          let data = doc.data();
          data.id = doc.id;
          posts.push(data);
        });
        setCommitteePosts(posts);
      })
      .catch((err) => {
        console.error("Fel vid laddning av nämndinlägg:", err);
        setError("Det gick inte att hämta nämndens inlägg, vänligen kontakta webbansvariga.");
      });
  }, [userData.committee, userData.uid, userCommitteeName]);

  const handleUserUpdate = () => {
    setMenuSelect("update");
    setUserUpdateStatus("Försöker uppdatera användare...");
    if (user) {
      updateUser(user)
        .then(setUserUpdateStatus("Uppgifter uppdaterade."))
        .catch((err) => {
          console.error("Fel vid user update:", err);
          setUserUpdateStatus("Det gick inte att uppdatera uppgifterna.");
          setError(
            "Det gick inte att uppdatera dina uppgifter. Prova att ladda om sidan och logga in igen eller kontakta webbansvariga."
          );
        });
    } else {
      setError("Du verkar inte vara inloggad. Prova att ladda om sidan och logga in igen.");
    }
  };

  if (error) {
    return (
      <ErrorPage
        error={{ header: "Ett fel inträffade vid inloggningen", body: error }}
        close={() => {
          setError("");
        }}
      />
    );
  }

  return (
    <div>
      <div className="userInfo">
        <p>
          Välkommen {userData.displayName}!
          <br />
          Nedanför kan du se {userCommitteeName}s senaste inlägg.
          {userData.permission === "admin" &&
            " Du ser även de inlägg som du skapat åt andra nämnder."}
        </p>
        {userData.permission === "moderator" && (
          <p>
            Du kan skapa nya eller redigera tidigare inlägg. Om du ta bort ett inlägg från din nämnd
            kan du arkivera det.
          </p>
        )}
        {userData.permission === "admin" && (
          <p>
            Du kan ta bort inlägg, redigera alla inlägg, byta vilken nämnd inlägget tillhör m.m.
          </p>
        )}
      </div>

      {/*Knappar*/}
      <h2>Navigera</h2>
      <div className={menu}>
        <button id="senaste" onClick={() => setMenuSelect("senaste")}>
          Senaste inläggen
        </button>
        <button id="update" onClick={handleUserUpdate}>
          Uppdatera uppgifter
        </button>
        <button id="how-to" onClick={() => setMenuSelect("how-to")}>
          HOW-TO
        </button>
        <button onClick={() => router.push("personalrummet/ntc")}>NTC</button>
        <button onClick={() => logOut()}>Logga ut</button>
      </div>
      <h2>Hantera</h2>
      <div className={menu}>
        <button onClick={() => router.push("personalrummet/redigera")}>Redigera inlägg</button>
        <button onClick={() => router.push("personalrummet/publicera")}>Publicera inlägg</button>
        <button onClick={() => router.push("personalrummet/tv")}>Hantera bilder på TV:n</button>
        {/* Bara de som kan göra inlägg på mottagningssidan får upp detta alternativet */}
        {(userData.permission === "admin" ||
          ["mottagningsnamnden", "naringslivsnamnden"].includes(userData.committee)) && (
          <button onClick={() => router.push("personalrummet/mottagning")}>Mottagning</button>
        )}
      </div>
      {menuSelect == "senaste" && (
        <div>
          <div>
            <h2>Nämndens senaste inlägg</h2>
            {committeePosts ? (
              <CommitteeFeed posts={committeePosts} permission={userData.permission} />
            ) : (
              <p>Finns inga inlägg</p>
            )}
          </div>
        </div>
      )}
      {menuSelect == "update" && <p>{userUpdateStatus}</p>}
      {menuSelect == "how-to" && (
        <div>
          <h2>HOW-TO</h2>
          <MarkdownRender mdData={contents["how-to"]} />
        </div>
      )}
    </div>
  );
}
