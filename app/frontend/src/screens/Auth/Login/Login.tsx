import React from 'react';
import {Container, Content, List, ListItem, Input, Button, Text} from 'native-base';

const Login: React.FC = () => {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem>
                                <Input placeholder="EMAIL" />
                        </ListItem>

                        <ListItem>
                                <Input placeholder="PASSWORD" secureTextEntry={true}/>
                        </ListItem>
                    </List>
                    <Button><Text>Log in</Text></Button>
                </Content>
            </Container>
        );
};

export default Login