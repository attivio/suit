// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Col, Row, Glyphicon } from 'react-bootstrap';

import QueryResponse from '../api/QueryResponse';
import AuthUtils from '../util/AuthUtils';
import StringUtils from '../util/StringUtils';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import Comment from '../api/Comment';

type CommentsProps = {
  /** The document's ID, needed for adding/removing comments */
  docId: string,
  /** Optional. The table name to be used for comments document stored in the index */
  commentsTable?: string,
  /** Optional. The zone name to be used for storing the comment documents */
  zoneName?: string,
};

type CommentsDefaultProps = {
  commentsTable: string;
  zoneName: string;
};

type CommentsState = {
  comment: string;
  commentList: Array<Comment>;
  error: string | null;
  showCommentModal: boolean,
};

class Comments extends React.Component<CommentsDefaultProps, CommentsProps, CommentsState> {
  static contextTypes = {
    searcher: PropTypes.any,
  };

  static defaulProps = {
    commentsTable: 'comments',
    zoneName: 'default',
  }

  static displayName = 'Comments';

  constructor(props: CommentsProps) {
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
    (this: any).getUserName = this.getUserName.bind(this);
    (this: any).saveComment = this.saveComment.bind(this);
    (this: any).clearComment = this.clearComment.bind(this);
    (this: any).getComments = this.getComments.bind(this);
    (this: any).deleteComment = this.deleteComment.bind(this);
  }

  state: CommentsState;

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    const { searcher } = this.context;
    const { docId, commentsTable, zoneName } = this.props;
    const commentList = [];
    if (searcher) {
      const qr = new SimpleQueryRequest();
      qr.query = `AND(table:${commentsTable}, docId_s:FACET("${docId}"))`;
      qr.facets = [];
      qr.queryLanguage = 'advanced';
      qr.restParams.set('zones', [`${zoneName}`]);
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

  // eslint-disable-next-line class-methods-use-this
  getUserName() {
    const currentUser = AuthUtils.getSavedUser();
    if (currentUser) {
      return AuthUtils.getUserName(currentUser);
    }
    return AuthUtils.getUserName(AuthUtils.getLoggedInUserInfo());
  }

  deleteComment(id: string) {
    const jsonDoc = `{ "id" : "${id}", "mode" : "DELETE" }`;
    this.context.searcher.search.addOrDeleteDocument(JSON.parse(jsonDoc), this.getComments);
  }

  createFormattedCommentList() {
    const { commentList } = this.state;
    const loggedInUser = AuthUtils.getUserName(AuthUtils.getSavedUser());
    let formattedCommentList = [];

    if (commentList && commentList.length > 0) {
      formattedCommentList = commentList.map((comment) => {
        const isCommentByLoggedInUser = (comment.username === loggedInUser);
        const removeCommentOption = isCommentByLoggedInUser && (
          <Glyphicon
            glyph="remove-circle"
            onClick={() => {
              this.deleteComment(comment.id);
            }}
            style={{ fontSize: '1.2em', color: '#003c7e', cursor: 'pointer' }}
            title="Delete this comment"
          />
        );

        return (
          <div key={comment.id} style={{ paddingBottom: '0.6em' }}>
            <div
              style={{ color: '#484848', backgroundColor: '#F5F5F5', borderRadius: '5px' }}
              title={comment.timestamp}
            >
              <div style={{ padding: '0.5em', color: 'gray' }}>
                <div style={{ float: 'right' }}>
                  { removeCommentOption }
                </div>
                <span style={{ whiteSpace: 'pre-wrap' }}>
                  {comment.text} <i> — {comment.username} </i>
                </span>
              </div>
            </div>
          </div>
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
    const { docId, commentsTable, zoneName } = this.props;
    const { comment } = this.state;
    const { searcher } = this.context;
    const username = this.getUserName();
    const d = new Date();
    const loggedDateTime = d.toISOString();
    const id = username.concat(loggedDateTime);
    const body = {
      fields: {
        comment_s: [comment],
        docId_s: [docId],
        username_s: [username],
        date: [loggedDateTime],
        table: [commentsTable],
      },
      id,
      zone: zoneName,
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
      <div className="none">
        <i> No comments yet </i>
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
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} style={{ paddingBottom: '1em' }}>
              <h5 style={{ borderBottom: '1px solid lightgray', fontWeight: 'bold' }}> Previously Added Comments : </h5>
              <div style={{ width: '100%', maxHeight: '50vh', overflowY: 'auto' }}>
                {this.renderComments()}
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <textarea
                onChange={this.captureComment}
                value={comment}
                style={{ width: '100%' }}
                rows={5}
              />
              <div style={{ float: 'right' }}>
                <Button onClick={this.clearComment} disabled={!(comment && comment.length > 0)}>
                  Clear
                </Button>
                &nbsp;
                <Button onClick={this.saveComment} disabled={!(comment && comment.length > 0)}>
                  Add Comment
                </Button>
              </div>
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
    const commentLabelFormat = `Add a comment | 1 Comment | ${commentCount} Comments`;
    const commentLabel = StringUtils.fmt(commentLabelFormat, commentCount);
    return (
      <a
        className="attivio-tags-more"
        onClick={this.showCommentModal}
        role="button"
        tabIndex={0}
        title="Edit comments"
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
