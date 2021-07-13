import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap';
import githubIcon from './../../assets/GitHub-Mark-Light-32px.png';

export default function Footer() {
    return (
        <Container className="text-center">
            <Col>
                <Row>
                    <Col>
                        <p>
                            {'Creada por: '} 
                            <a rel="noreferrer" href="https://github.com/Adrian-Garcia" target="_blank">Adrián García</a>{', '}
                            <a rel="noreferrer" href="https://github.com/alegayndra" target="_blank">Alejandra García</a>{', '}
                            <a rel="noreferrer" href="https://github.com/EstradaDiego99" target="_blank">Diego Estrada</a> 
                            {' & '}
                            <a rel="noreferrer" href="https://github.com/luispc111" target="_blank">Luis Alberto Pérez</a>
                        </p>
                    </Col>
                </Row>
                <Row className="p-2">
                    <Col>
                        <a rel="noreferrer" href="https://github.com/luispc111/PlanesDeEstudio" target="_blank">
                            <Image src={githubIcon} alt="Github link"/>
                        </a>
                    </Col>
                </Row>
            </Col>
        </Container>
    )
}
