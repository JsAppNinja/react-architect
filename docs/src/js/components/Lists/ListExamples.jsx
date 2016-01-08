import React from 'react';
import { List, ListItem, ListSubheader, ListDivider, FontIcon, Avatar, Paper, IconButton, Toolbar } from 'react-md';

const FakePhone = ({ children, primary = false, secondary = false }) => {
  return (
    <Paper>
      <Toolbar primary={primary} secondary={secondary}>
        <IconButton>menu</IconButton>
      </Toolbar>
      {children}
    </Paper>
  );
};

export default function ListExamples() {
  return (
    <div className="list-examples">
      <FakePhone primary={true}>
        <List>
          <ListItem primaryText="Inbox" />
          <ListItem primaryText="Starred" />
          <ListItem primaryText="Sent Mail" />
          <ListItem primaryText="Drafts" />
        </List>
      </FakePhone>
      <FakePhone secondary={true}>
        <List>
          <ListItem leftIcon={<FontIcon>inbox</FontIcon>} primaryText="Inbox" />
          <ListItem leftIcon={<FontIcon>access_time</FontIcon>} primaryText="Snoozed" />
          <ListItem leftIcon={<FontIcon>done</FontIcon>} primaryText="Done" />
          <ListDivider />
          <ListItem leftIcon={<FontIcon>drafts</FontIcon>} primaryText="Drafts" />
          <ListItem leftIcon={<FontIcon>send</FontIcon>} primaryText="Sent" />
          <ListItem leftIcon={<FontIcon>touch_app</FontIcon>} primaryText="Reminders" />
          <ListItem leftIcon={<FontIcon>delete</FontIcon>} primaryText="Trash" />
          <ListItem leftIcon={<FontIcon>report</FontIcon>} primaryText="Spam" />
        </List>
      </FakePhone>
      <FakePhone>
        <List subheader="Folders" primarySubheader={true}>
          <ListItem
            leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />}
            primaryText="Photos"
            secondaryText="Jan 9, 2014"
          />
          <ListItem
            leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />}
            primaryText="Recipes"
            secondaryText="Jan 17, 2014"
          />
          <ListItem
            leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />}
            primaryText="Work"
            secondaryText="Jan 28, 2014"
          />
          <ListDivider inset />
          <ListSubheader primaryText="Files" />
        </List>
      </FakePhone>
      <FakePhone secondary={true}>
        <List>
          <ListItem
            leftAvatar={<Avatar src="http://lorempixel.com/120/120/people" alt="some image" />}
            primaryText="Brunch this weekend?"
            secondaryText="Ali Connors"
            secondaryText2="I'll be in your neighborhood sometime this week"
          />
          <ListItem
            leftAvatar={<Avatar src="http://lorempixel.com/120/120/people" alt="some image" />}
            primaryText="Summer BBQ"
            secondaryText="to Alex, Scott, Jennifer"
            secondaryText2="Wish I could come, but I'm out of town this weekend."
          />
          <ListItem
            leftAvatar={<Avatar src="http://lorempixel.com/120/120/people" alt="some image" />}
            primaryText="Oui Oui"
            secondaryText="Sandra Adams - Do you have Paris"
            secondaryText2="recommendations? Have you ever been?"
          />
        </List>
      </FakePhone>
    </div>
  );
}
