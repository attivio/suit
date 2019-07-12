import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Col, Row, Glyphicon } from 'react-bootstrap';

import QueryResponse from '../api/QueryResponse';
import AuthUtils from '../util/AuthUtils';
import SimpleQueryRequest from '../api/SimpleQueryRequest';

type CommentsProps = {
  docId: string,
  commentsTable: string | null,
}

type CommentsDefaultProps = {
  commentsTable: string,
}

type CommentsState = {
  comment: string;
  response: QueryResponse | null;
  error: string | null;
  showCommentModal: boolean,
  commentList: Array<any>,
}

class Comments extends React.Component<CommentsDefaultProps, CommentsProps, CommentsState> {
  static contextTypes = {
    searcher: PropTypes.any,
  };

  static defaultProps = {
    commentsTable: 'comments',
  };

  static displayName = 'Comments';

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      response: null,
      error: null,
      showCommentModal: false,
      commentList: [],
    };
    (this: any).showCommentModal = this.showCommentModal.bind(this);
    (this: any).hideCommentModal = this.hideCommentModal.bind(this);
    (this: any).captureComment = this.captureComment.bind(this);
    (this: any).saveComment = this.saveComment.bind(this);
    (this: any).getComments = this.getComments.bind(this);
    (this: any).deleteComment = this.deleteComment.bind(this);
  }

  componentWillMount() {
    this.getComments();
  }

  getComments() {
    const searcher = this.context.searcher;
    const { docId, commentsTable } = this.props;
    if (searcher) {
      const qr = new SimpleQueryRequest();
      qr.query = `AND(table:${commentsTable}, docId_s:FACET("${docId}"))`;
      qr.facets = [];
      qr.queryLanguage = 'advanced';
      searcher.doCustomSearch(qr, (response: QueryResponse | null, error: string | null) => {
        if (response) {
          this.setState(
            {
              response,
            },
            this.populateComments,
          );
        } else if (error) {
          this.setState({
            error,
          });
        }
      });
    }
  }

  deleteComment(id) {
    const jsonDoc = `{ "id" : "${id}", "mode" : "DELETE" }`;
    this.context.searcher.search.addOrDeleteDocument(JSON.parse(jsonDoc), this.getComments);
  }

  populateComments() {
    const response = this.state.response;
    const loggedInUser = AuthUtils.getUserName(AuthUtils.getSavedUser());
    if (response) {
      const commentList = [];
      response.documents.forEach((doc) => {
        const comment = {};
        comment.id = doc.getFirstValue('.id');
        comment.text = doc.getFirstValue('comment_s');
        comment.timestamp = doc.getFirstValue('timestamp_s');
        comment.username = doc.getFirstValue('username_s');
        const isCommentByLoggedInUser = (comment.username === loggedInUser);
        const removeComment = isCommentByLoggedInUser ? (
          <Glyphicon
            glyph="trash"
            onClick={() => {
              this.deleteComment(comment.id);
            }}
            style={{ fontSize: '1em', color: '#003c7e', cursor: 'pointer' }}
            title="Delete this comment"
          />
        ) : '';
        commentList.push(
          <div key={comment.id}>
            <div
              style={{ color: '#484848', backgroundColor: '#F5F5F5', borderRadius: '5px' }}
              title={comment.timestamp}
            >
              <div style={{ padding: '0.5em' }}>
                <b> <i> {comment.username} </i> </b>
                <div style={{ float: 'right' }}>
                  { removeComment }
                </div>
                <br />
                {comment.text}
              </div>
            </div>
            <br />
          </div>,
        );
      });
      this.setState({ commentList });
    }
  }

  showCommentModal() {
    this.setState({
      showCommentModal: true,
    });
  }

  hideCommentModal() {
    this.setState({
      showCommentModal: false,
    });
  }

  captureComment(e: Event) {
    if (e.target instanceof HTMLTextAreaElement) {
      this.setState({
        comment: e.target.value,
      });
    }
  }

  saveComment() {
    const { docId } = this.props;
    const searcher = this.context.searcher;
    const username = AuthUtils.getUserName(AuthUtils.getSavedUser());
    const loggedDateTime = new Date().toISOString();
    const id = username.concat(loggedDateTime);
    const comment = this.state.comment;
    const d = new Date();
    const timestamp = `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;

    const jsonDoc = `{ "fields" : { "comment_s" : [ "${comment}" ], `
      + `"docId_s" : [ "${docId}" ], "username_s" : [ "${username}" ], "date" : [ "${loggedDateTime}" ], `
      + `"timestamp_s" : [ "${timestamp}" ], "table" : [ "comments" ] }, "id" : "${id}" }`;
    searcher.search.addOrDeleteDocument(JSON.parse(jsonDoc), this.getComments);
  }

  render() {
    const noCommentLabel = (
      <div style={{ width: '100%', textAlign: 'center', padding: '1em', color: 'gray' }}>
        <i> No Comments Available </i>
      </div>
    );

    const commentModal = (
      <Modal
        show={this.state.showCommentModal}
        onHide={this.hideCommentModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add or View Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <textarea
                onChange={this.captureComment}
                value={this.state.comment}
                style={{ width: '100%' }}
                rows={5}
              />
              <div style={{ float: 'right' }}>
                <Button onClick={this.saveComment}>
                  Add Comment
                </Button>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <br />
              <br />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h5 style={{ borderBottom: '1px solid lightgray', fontWeight: 'bold' }}> Previously Added Comments : </h5>
              {this.state.commentList.length > 0 ? this.state.commentList : noCommentLabel}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideCommentModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const commentLink = (
      <a
        className="attivio-tags-more"
        onClick={this.showCommentModal}
        role="button"
        tabIndex={0}
        title="Add/View Comments"
      >
        Comment
      </a>
    );

    return (
      <div>
        {commentLink}
        {commentModal}
      </div>
    );
  }
}

export default Comments;
