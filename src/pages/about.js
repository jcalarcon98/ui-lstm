import React from 'react';
import { Card } from "components/common/card/card";
import Header from "components/common/header/header";
import tw from "twin.macro";
import { Footer } from "components/common/footer/footer";

export const About = () => {

  const Container = tw.div`flex flex-col items-center py-10`;

  const dataValues = [
    {
      title: 'Ingeniería en Sistemas',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: 'https://picsum.photos/seed/picsum/350/450',
      imageFirst: false,
    },
    {
      title: 'Autores:',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: 'https://picsum.photos/seed/picsum/350/450',
      imageFirst: true,
    }
  ]

  return (
    <>
      <Header />
      <Container>
        {
          dataValues.map((data, index)=> (
            <Card 
              key={index}
              {...data}
            />
          ))
        }
      </Container>
      <Footer />
    </>
  )

};
