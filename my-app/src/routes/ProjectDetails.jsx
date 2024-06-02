import styled from 'styled-components';

import useProjectStore from '../store/useProjectStore';

const Container = styled.div`
  text-align: left;
  margin: 5px;
  margin-top: 20px;
  font-size: 16px;
  width: 90%;
`;

export default function ProjectDetails() {
  const projectData = useProjectStore((state) => state.projectData);

  if (!projectData) {
    return null;
  }

  const paragraphs = projectData.post_text.split('\n');

  return (
    <Container>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Container>
  );
}
