import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  BiHome,
  BiPencil,
  BiHeart,
  BiSolidHeart,
  BiUser,
} from "react-icons/bi";

export default function TabBar() {
  const navigate = useNavigate();

  // 여기 바꿔야 함
  const goToHome = () => {
    navigate("/main");
  };

  const goToPosting = () => {
    navigate("/makepost");
  };

  const goToScrab = () => {
    navigate("/scrab");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <Navbar>
      <NavItem>
        <NavIcon onClick={goToHome} style={{ cursor: "pointer" }}>
          <BiHome />
        </NavIcon>
        <NavText onClick={goToHome} style={{ cursor: "pointer" }}>
          Home
        </NavText>
      </NavItem>
      <NavItem>
        <NavIcon onClick={goToPosting} style={{ cursor: "pointer" }}>
          <BiPencil />
        </NavIcon>
        <NavText onClick={goToPosting} style={{ cursor: "pointer" }}>
          Posting
        </NavText>
      </NavItem>
      <NavItem>
        <NavIcon onClick={goToScrab} style={{ cursor: "pointer" }}>
          <BiHeart />
        </NavIcon>
        <NavText onClick={goToScrab} style={{ cursor: "pointer" }}>
          Scrab
        </NavText>
      </NavItem>
      <NavItem onClick={goToProfile} style={{ cursor: "pointer" }}>
        <NavIcon>
          <BiUser />
        </NavIcon>
        <NavText>Profile</NavText>
      </NavItem>
    </Navbar>
  );
}

const Navbar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  background: #f8f8f8;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 1.5);

  position: fixed;
  width: 393px;
  height: 68px;
  bottom: -18px;
  z-index: 1000;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
  margin-top: -7px;
`;

const NavIcon = styled.div`
  font-size: 24px; // 아이콘 크기 조정
  margin-bottom: 5px; // 아이콘과 텍스트 사이 간격
`;

const NavText = styled.div`
  font-size: 14px; // 텍스트 크기
`;
