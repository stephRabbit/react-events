import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
// -------------------
import TextArea from '../../../app/common/form/TextArea';


class EventDetailedChatForm extends Component {
  handleCommentSubmit = values => {
    const { addEventComment, closeForm, eventId, parentId, reset  } = this.props;
    addEventComment(eventId, values, parentId);
    reset();
    if (parentId) {
      closeForm();
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
          <Field
            component={TextArea}
            name="comment"
            rows={2}
            type="text"
          />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </div>
    );
  }
}

export default reduxForm({
  Fields: 'comment'
})(EventDetailedChatForm);