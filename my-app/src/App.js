// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Loginpic from "./routes/Loginpic";
import Makepost from "./routes/Makepost";
import Main from "./routes/Main";

import ProfilePage from "./routes/ProfilePage";
import PostsList from "./routes/PostsList";
import Portfolio from "./routes/Portfolio";
import ApplicationList from "./routes/ApplicatonList";
import AccountInformation from "./routes/AccountInformation";

import ProjectDescription from "./routes/ProjectDescription";
import TeamEvaluation from "./routes/TeamEvaluation";
import TeamMemberEvaluation from "./routes/TeamMemberEvaluation";
import ApplicationPort from "./routes/ApplicationPort";
import Scrab from "./routes/Scrab";

const projectId = 1;

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
};

const App = () => {
  const projectId = 1;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpic />} />
        {/* <Route path="/profilePage" element={<ProfilePage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        

        <Route path="/makepost" element={
          <PrivateRoute>
            <Makepost />
        </PrivateRoute>
        } />
        

        {/* <Route path="/main" element={<Main />} /> */}
        <Route path="/main" element={
          <PrivateRoute>
            <Main />
        </PrivateRoute>
        } />

        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
        </PrivateRoute>
        } />

        {/* <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/applicationList" element={<ApplicationList />} />
        <Route path="/accountInformation" element={<AccountInformation />} />
        <Route path="/applicationPort" element={<ApplicationPort />} />
        <Route
          path="/project-description"
          element={<ProjectDescription projectId={projectId} />}
        />
        <Route path="/evaluation" element={<TeamEvaluation />} />
        <Route
          path="/evaluation/:memberId"
          element={<TeamMemberEvaluation />}
        />
        <Route path="/scrab" element={<Scrab />} /> */}
        <Route path="/portfolio" element={
          <PrivateRoute>
            <Portfolio />
          </PrivateRoute>
        } />

        <Route path="/posts" element={
          <PrivateRoute>
            <PostsList />
          </PrivateRoute>
        } />

        <Route path="/applicationList" element={
          <PrivateRoute>
            <ApplicationList />
          </PrivateRoute>
        } />

        <Route path="/accountInformation" element={
          <PrivateRoute>
            <AccountInformation />
          </PrivateRoute>
        } />

        <Route path="/applicationPort" element={
          <PrivateRoute>
            <ApplicationPort />
          </PrivateRoute>
        } />

        <Route path="/project-description" element={
          <PrivateRoute>
            <ProjectDescription projectId={projectId} />
          </PrivateRoute>
        } />

        <Route path="/evaluation" element={
          <PrivateRoute>
            <TeamEvaluation />
          </PrivateRoute>
        } />

        <Route path="/evaluation/:memberId" element={
          <PrivateRoute>
            <TeamMemberEvaluation />
          </PrivateRoute>
        } />

        <Route path="/scrab" element={
          <PrivateRoute>
            <Scrab />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
