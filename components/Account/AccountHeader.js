import { Header, Icon, Segment, Label } from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";

function AccountHeader({ role, email, name, createdAt }) {
  return (
    <Segment secondary inverted color="violet">
      <Label
        color="green"
        size="large"
        ribbon
        icon="privacy"
        style={{ textTransform: "capitalize" }}
        content={role}
      />
      <Header inverted textAlign="center" as="h1" icon>
        <Icon name="user" />
        {name}
        <HeaderSubHeader>{email}</HeaderSubHeader>
        <HeaderSubHeader>Entrou em {createdAt}</HeaderSubHeader>
      </Header>
    </Segment>
  );
}

export default AccountHeader;
