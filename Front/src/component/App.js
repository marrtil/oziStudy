import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudyList from "./StudyList";
import TopMenu from "./TopMenu";
import JoinForm from "./JoinForm";
import ModForm from "./ModForm";
import Bottom from "./Bottom";
import { getMyStudy, getStudyList } from "../api";
import { useEffect, useState } from "react";

import "./App.css";
import StudyInputForm from "./StudyInputForm";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";
import Locater from "./Locater";
const LIMIT = 6;
function App() {
  let sessionStorage = window.sessionStorage;
  const [item, setItem] = useState([]);
  const [login, setLogin] = useState(sessionStorage.getItem("userId"));
  const [pageHeight, setPageHeight] = useState(850);
  var offset = 0;

  const handleLoad = async () => {
    let studyList = await getStudyList({ offset, LIMIT });
    setItem(item.push(...studyList));
  };
  const handleMyStudy = async () => {
    setItem(await getMyStudy(login));
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      if (pageHeight + (offset / 6) * 733 <= scroll) {
        offset += 6;
        handleLoad();
      }
    });
    handleLoad();
  }, [sessionStorage.getItem("userId")]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TopMenu
                  onMyStudy={handleMyStudy}
                  onLoad={handleLoad}
                  onLogin={setLogin}
                  // onSessionClear={handleSessionClear}
                />
                {/* <hr id="topHR"></hr> */}
                <div className="album  bg-light">
                  <SearchForm onLoad={handleLoad} />
                  <StudyList items={item} />
                  <Bottom />
                  {sessionStorage.getItem("userId") && (
                    <Link to="/studyInputForm" id="studyInputBtn">
                      스터디만들기
                    </Link>
                  )}
                </div>
              </>
            }
          />
          <Route path="/joinForm" element={<JoinForm />} />
          <Route
            path="/myStudy"
            element={
              <Locater
                location="myStudy"
                item={item}
                onMyStudy={handleMyStudy}
                onLoad={handleLoad}
                onLogin={setLogin}
              />
            }
          />
          <Route path="/studyInputForm" element={<StudyInputForm userId={login} />} />
          <Route path="/studyInputForm/modify/:studyId" element={<StudyInputForm userId={login} />} />
          <Route path="/modForm" element={<ModForm />} />
          <Route
            path="/studyFormDetail/:id"
            element={
              <div className="album bg-light">
                <Locater
                  location="studyFormDetail"
                  item={item}
                  onMyStudy={handleMyStudy}
                  onLoad={handleLoad}
                  onLogin={setLogin}
                />
              </div>
            }
          />
          <Route
            exact
            path="/search"
            element={<SearchResult onMyStudy={handleMyStudy} onLoad={handleLoad} onLogin={setLogin} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
