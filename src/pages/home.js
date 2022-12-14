import React from 'react';
import { Card } from "components/common/card/card";
import Header from "components/common/header/header";
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as PlayIcon } from "feather-icons/dist/icons/play-circle.svg";
import { Link } from "react-router-dom";
import { Footer } from "components/common/footer/footer";

export const Home = () => {

  const Container = tw.div`flex flex-col items-center py-10`;
  const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-blue-500 text-gray-100 focus:bg-blue-700 focus:shadow-outline focus:outline-none transition duration-300`;

  const dataValues = [
    {
      title: '¿Qué es el proyecto?',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: 'https://picsum.photos/seed/picsum/350/450',
      imageFirst: false
    },
    {
      title: 'Características del Proyecto',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: 'https://picsum.photos/seed/picsum/350/450',
      imageFirst: true
    },
    {
      title: 'Resultados del Proyecto',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: 'https://picsum.photos/seed/picsum/350/450',
      imageFirst: false
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
        <Link to="/prediction">
          <PrimaryButton>
            <span className="playText">Implementación</span>
          </PrimaryButton>
        </Link>
      </Container>

      <Footer />
      
    </>
  )

};
