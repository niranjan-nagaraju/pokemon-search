import React, {useState} from 'react';

import {InputGroup, FormControl, Form, Col, Button} from 'react-bootstrap';
import {Search} from 'react-feather';

interface Props {
    // Callback from the App module
    // to be called when the search form is submitted. 
    callback: (searchStr: string) => void;
}

export const SearchBox:React.FC<Props> = ({callback}) => {
    const [searchString, setSearchString] = useState(""); 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        callback(searchString);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchString(e.target.value);
    }

    return (
        <Form onSubmit={handleSubmit}> 
            <Form.Row className="align-items-center">
                <Col sm="auto" className="my-1">
                    <InputGroup className="my-1">

                        <FormControl
                            type="text"
                            placeholder="e.g., Pikachu"
                            aria-label="Pokemon"
                            aria-describedby="search"
                            onChange={handleChange}
                        />

                        <InputGroup.Append>
                            <Button variant="info" size="sm" type="submit">
                                <Search />
                            </Button>
                        </InputGroup.Append>                        
                    </InputGroup>
                </Col>
            </Form.Row>
        </Form>
    );
}


export default SearchBox;
