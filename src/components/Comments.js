// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Col, Row, Glyphicon } from 'react-bootstrap';

import AuthUtils from '../util/AuthUtils';
import StringUtils from '../util/StringUtils';
import Comment from '../api/Comment';
import MetadataManager from '../api/MetadataManager';
import QueryResponse from '../api/QueryResponse';
import SimpleQueryRequest from '../api/SimpleQueryRequest';

type CommentsProps = {
  /** The document's ID, needed for adding/removing comments */
  docId: string,
};

type CommentsState = {
  comment: string;
  commentList: Array<Comment>;
  error: string | null;
  showCommentModal: boolean,
};

class Comments extends React.Component<void, CommentsProps, CommentsState> {
  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'Comments';

  constructor(props: CommentsProps) {
    super(props);
    this.state = {
      comment: '',
      commentList: [],
      error: null,
      showCommentModal: false,
    };
    this.metadataManager = new MetadataManager(this.context.searcher.search);
  }

  state: CommentsState;

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    const { searcher } = this.context;
    const { docId } = this.props;
    const commentList = [];
    if (searcher) {
      const qr = new SimpleQueryRequest();
      qr.query = `AND(table:'.comments', docId_s:FACET("${docId}"))`;
      qr.facets = [];
      qr.queryLanguage = 'advanced';
      qr.restParams.set('zones', ['.metadata']);
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

  getUserName = () => {
    const currentUser = AuthUtils.getSavedUser();
    if (currentUser) {
      return AuthUtils.getUserName(currentUser);
    }
    return AuthUtils.getUserName(AuthUtils.getLoggedInUserInfo());
  }

  metadataManager: MetadataManager;

  // default callback to handle query responses
  errorHandler = (error: string | null) => {
    if (error) {
      this.setState({
        error,
      });
    }
  };

  deleteComment = (id: string) => {
    const jsonDoc = `{ "id" : "${id}", "mode" : "DELETE" }`;
    this.metadataManager.addOrDeleteComment(JSON.parse(jsonDoc), this.getComments, this.errorHandler);
  }

  createFormattedCommentList = () => {
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
                <br />
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

  showCommentModal = () => {
    this.setState({
      showCommentModal: true,
    });
  }

  hideCommentModal = () => {
    this.setState({
      showCommentModal: false,
    });
  }

  captureComment = (e: Event) => {
    if (e.target instanceof HTMLTextAreaElement) {
      this.setState({
        comment: e.target.value,
      });
    }
  }

  saveComment = () => {
    const { docId } = this.props;
    const { comment } = this.state;
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
        table: ['.comments'],
      },
      id,
      zone: '.metadata',
    };
    this.metadataManager.addOrDeleteComment(JSON.parse(JSON.stringify(body)), this.getComments, this.errorHandler);
  }

  clearComment = () => {
    this.setState({
      comment: '',
    });
  }

  renderComments = () => {
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

  renderCommentModal = () => {
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

  renderCommentLink = () => {
    const { commentList } = this.state;
    const commentCount = commentList && commentList.length > 0 ? commentList.length : 0;
    const commentLabelFormat = 'Add a Comment|1 Comment|{} Comments';
    const commentLabel = StringUtils.fmt(commentLabelFormat, commentCount);
    return (
      <a
        className="attivio-tags-more"
        onClick={this.showCommentModal}
        role="button"
        tabIndex={0}
        title="Edit Comments"
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
