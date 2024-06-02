import React, { useState } from 'react';
import styled from 'styled-components';
import DummyMainCard from './DummyMainCard';

export default function DummyMain() {
  const posts = [
    {
      title: 'SKKU Application',
      location: 'Suwon',
      description:
        'We are recruiting developers and designers to join our side project.',
      roles: ['Front-end: 2', 'Back-end: 3', 'Designer: 1'],
      recruitingInfo: 'Recruiting',
    },
    {
      title: 'SKKU rectuit',
      location: 'Seoul',
      description:
        'We are recruiting developers and designers to join our side project.',
      roles: ['Front-end: 4', 'Designer: 2'],
      recruitingInfo: 'Recruiting',
    },
    {
      title: 'SKKU Application',
      location: 'Suwon',
      description:
        'We are recruiting developers and designers to join our side project.',
      roles: ['Front-end: 2', 'Back-end: 2', 'Designer: 1'],
      recruitingInfo: 'Recruiting',
    },
  ];

  return (
    <PostList>
      {posts.map((post, index) => (
        <DummyMainCardWrapper key={index}>
          <DummyMainCard {...post} />
        </DummyMainCardWrapper>
      ))}
    </PostList>
  );
}

const PostList = styled.div`
  position: relative;
  width: 393px;
  height: 852px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

const DummyMainCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;
