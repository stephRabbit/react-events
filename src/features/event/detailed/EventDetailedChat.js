import React, { Component } from 'react';
import { Comment, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words';
// ----------------
import EventDetailedChatForm from './EventDetailedChatForm';

class EventDetailedChat extends Component {
  state = {
    showReplyForm: false,
    selectedCommentId: null
  };

  handleOpenReplyForm = id => () => {
    this.setState({
      showReplyForm: true,
      selectedCommentId: id
    });
  };

  handleCloseReplyForm = () => {
    this.setState({
      showReplyForm: false,
      selectedCommentId: null
    });
  };

  render() {
    const { addEventComment, eventChat, eventId } = this.props;
    const { selectedCommentId, showReplyForm } = this.state;
    return (
      <div>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{ border: 'none' }}
        >
          <Header>Chat about this event</Header>
        </Segment>

        <Segment attached>
          <Comment.Group>
            {eventChat && eventChat.map(comment => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.uid}`}>{comment.displayName}</Comment.Author>
                  <Comment.Metadata>
                    <div>{distanceInWords(comment.date, Date.now())} ago</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action onClick={this.handleOpenReplyForm(comment.id)}>Reply</Comment.Action>
                    {showReplyForm && selectedCommentId === comment.id && (
                      <EventDetailedChatForm
                        addEventComment={addEventComment}
                        closeForm={this.handleCloseReplyForm}
                        eventId={eventId}
                        form={`reply_${comment.id}`}
                        parentId={comment.id}
                      />
                    )}
                  </Comment.Actions>
                </Comment.Content>
                {comment.childNodes && comment.childNodes.map(childComment => (
                  <Comment.Group>
                    <Comment key={childComment.id}>
                      <Comment.Avatar src={childComment.photoURL || '/assets/user.png'} />
                      <Comment.Content>
                        <Comment.Author as={Link} to={`/profile/${childComment.uid}`}>{childComment.displayName}</Comment.Author>
                        <Comment.Metadata>
                          <div>{distanceInWords(childComment.date, Date.now())} ago</div>
                        </Comment.Metadata>
                        <Comment.Text>{childComment.text}</Comment.Text>
                        <Comment.Actions>
                          <Comment.Action onClick={this.handleOpenReplyForm(comment.id)}>Reply</Comment.Action>
                          {showReplyForm && selectedCommentId === comment.id && (
                            <EventDetailedChatForm
                              addEventComment={addEventComment}
                              closeForm={this.handleCloseReplyForm}
                              eventId={eventId}
                              form={`reply_${childComment.id}`}
                              parentId={childComment.parentId}
                            />
                          )}
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  </Comment.Group>
                ))}

              </Comment>
            ))}
          </Comment.Group>
          <EventDetailedChatForm
            addEventComment={addEventComment}
            eventId={eventId}
            form="newComment"
            parentId={0}
          />
        </Segment>
      </div>
    )
  }
}

export default EventDetailedChat;
