import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Cards = ({title, value}) => (
  <Card style={{ backgroundColor:'rgba(139, 215, 139, 0.8)', opacity:0.5, alignItems:'center',padding:10 ,borderRadius:5, shadowColor:"green"}} >
    {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
    <Card.Content>
      <Text variant="titleMedium" style={{fontWeight:"600"}} >{title.toUpperCase()}</Text>
      <Text variant="bodyMedium" style={{color:"green", alignSelf:"center"}} >{value}</Text>
    </Card.Content>
    {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
    {/* <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions> */}
  </Card>
);

export default Cards;