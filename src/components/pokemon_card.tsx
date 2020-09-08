import React from 'react';

import {Card, ListGroup, Button} from 'react-bootstrap';

interface Props {
    name: string,
    base_experience: number,
    sprite_url: string,
    height: number,
    weight: number,
    num_abilities: string[],
}

export const PokemonCard:React.FC<Props> = ({
    name,
    base_experience,
    sprite_url,
    height,
    weight,
    num_abilities
}) => {
    return (
        <Card style={{ width: '18rem' }} border="info">
        <Card.Header>{name}</Card.Header>    
        <Card.Img variant="top" 
            src={sprite_url}
            height="128"
        />
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
                Pokemon characteristics
            </Card.Text>
            <ListGroup variant="flush">
                <ListGroup.Item>Base Experience: {base_experience}</ListGroup.Item>
                <ListGroup.Item>Height: {height}</ListGroup.Item>
                <ListGroup.Item>Weight: {weight}</ListGroup.Item>
                <ListGroup.Item>
                    Abilities:
                    <p> 
                        {num_abilities.map(
                        ability => <Button variant="outline-info" className="mr-md-2">{ability}</Button>
                        )}
                    </p>    
                </ListGroup.Item>
            </ListGroup>                
        </Card.Body>
        <Card.Footer className="text-muted">
           <Card.Link href="https://pokeapi.co/">PokeAPI</Card.Link> 
        </Card.Footer>
        </Card>
    );
}