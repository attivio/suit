// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Col, Row, Glyphicon } from 'react-bootstrap';

import QueryResponse from '../api/QueryResponse';
import AuthUtils from '../util/AuthUtils';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import Comment from '../api/Comment';

type CommentsProps = {
  /** The document's ID, needed for adding/removing comments */
  docId: string,
  /** Optional. The table name to be used for comments document stored in the index */
  commentsTable?: string,
}

type CommentsDefaultProps = {
  commentsTable: string,
}

type CommentsState = {
  comment: string;
  commentList: Array<Comment>;
  error: string | null;
  showCommentModal: boolean,
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
      commentList: [],
      error: null,
      showCommentModal: false,
    };
    (this: any).showCommentModal = this.showCommentModal.bind(this);
    (this: any).hideCommentModal = this.hideCommentModal.bind(this);
    (this: any).captureComment = this.captureComment.bind(this);
    (this: any).saveComment = this.saveComment.bind(this);
    (this: any).clearComment = this.clearComment.bind(this);
    (this: any).getComments = this.getComments.bind(this);
    (this: any).deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    const { searcher } = this.context;
    const { docId, commentsTable } = this.props;
    const commentList = [];
    if (searcher) {
      const qr = new SimpleQueryRequest();
      qr.query = `AND(table:${commentsTable}, docId_s:FACET("${docId}"))`;
      qr.facets = [];
      qr.queryLanguage = 'advanced';
      searcher.doCustomSearch(qr, (response: QueryResponse | null, error: string | null) => {
        if (response && response.documents) {
          response.documents.forEach((doc) => {
            commentList.push(Comment.fromDoc(doc));
          });
          this.setState(
            {
              commentList,
              comment: '',
            },
          );
        } else if (error) {
          this.setState({
            error,
          });
        }
      });
    }
  }

  deleteComment(id: string) {
    const jsonDoc = `{ "id" : "${id}", "mode" : "DELETE" }`;
    this.context.searcher.search.addOrDeleteDocument(JSON.parse(jsonDoc), this.getComments);
  }

  createFormattedCommentList() {
    const { commentList } = this.state;
    const loggedInUser = AuthUtils.getUserName(AuthUtils.getSavedUser());
    const formattedCommentList = [];
    if (commentList && commentList.length > 0) {
      commentList.forEach((comment) => {
        const isCommentByLoggedInUser = (comment.username === loggedInUser);
        const removeCommentOption = isCommentByLoggedInUser && (
          <Glyphicon
            glyph="trash"
            onClick={() => {
              this.deleteComment(comment.id);
            }}
            style={{ fontSize: '1em', color: '#003c7e', cursor: 'pointer' }}
            title="Delete this comment"
          />
        );
        formattedCommentList.push(
          <div key={comment.id}>
            <div
              style={{ color: '#484848', backgroundColor: '#F5F5F5', borderRadius: '5px' }}
              title={comment.timestamp}
            >
              <div style={{ padding: '0.5em' }}>
                <b> <i> {comment.username} </i> </b>
                <div style={{ float: 'right' }}>
                  { removeCommentOption }
                </div>
                <br />
                <span style={{ whiteSpace: 'pre-wrap' }}>
                  {comment.text}
                </span>
              </div>
            </div>
            <br />
          </div>,
        );
      });
    }
    return formattedCommentList;
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
    const { comment } = this.state;
    const { searcher } = this.context;
    const username = AuthUtils.getUserName(AuthUtils.getSavedUser());
    const d = new Date();
    // const timestamp = `Posted on ${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;
    const loggedDateTime = d.toISOString();
    const id = username.concat(loggedDateTime);
    const body = {
      fields: {
        comment_s: [comment],
        docId_s: [docId],
        username_s: [username],
        date: [loggedDateTime],
        table: ['comments'],
      },
      id,
    };
    searcher.search.addOrDeleteDocument(JSON.parse(JSON.stringify(body)), this.getComments);
  }

  clearComment() {
    this.setState({
      comment: '',
    });
  }

  renderComments() {
    const { commentList } = this.state;
    const showComments = commentList && commentList.length > 0;
    if (showComments) {
      const formattedCommentList = this.createFormattedCommentList();
      return formattedCommentList;
    }
    return (
      <div style={{ width: '100%', textAlign: 'center', padding: '1em', color: 'gray' }}>
        <i> No Comments Available </i>
      </div>
    );
  }

  renderCommentModal() {
    const { showCommentModal, comment } = this.state;
    return (
      <Modal
        show={showCommentModal}
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
                value={comment}
                style={{ width: '100%' }}
                rows={5}
              />
              <div style={{ float: 'right' }}>
                <Button onClick={this.clearComment}>
                  Clear
                </Button>
                &nbsp;
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
              {this.renderComments()}
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
  }

  renderCommentLink() {
    const { commentList } = this.state;
    const commentCount = commentList && commentList.length > 0 ? commentList.length : 0;
    const commentLabel = commentCount > 0 ? `Comment (${commentCount})` : 'Comment';
    return (
      <a
        className="attivio-tags-more"
        onClick={this.showCommentModal}
        role="button"
        tabIndex={0}
        title="Add/View Comments"
      >
        {commentLabel}
      </a>
    );
  }

  render() {
    return (
      <div>
        {this.renderCommentLink()}
        {this.renderCommentModal()}
      </div>
    );
  }
}

export default Comments;
