// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Col,
  Row,
  Glyphicon,
  Dropdown,
  MenuItem,
  FormControl,
} from 'react-bootstrap';

import QueryResponse from '../api/QueryResponse';
import AuthUtils from '../util/AuthUtils';
import DateUtils from '../util/DateUtils';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import Briefcase from '../api/Briefcase';

type BriefcasesState = {
  showCreateBriefcaseModal: boolean,
  inputBriefcaseName: string,
  showBriefcaseInfoModal: boolean,
  error?: string,
  selectedBriefcase: Briefcase | null,
  briefcases: Array<Briefcase>,
  briefcaseContentDocs: any,
};

class Briefcases extends React.Component<void, void, BriefcasesState> {
  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'Briefcases';

  static buildOrQuery(IDs: Array<string>) {
    let query = '';
    const length = IDs.length;
    IDs.forEach((id, index) => {
      if (index === 0) {
        query = query.concat(`OR(.id:FACET("${id}"), `);
      } else if (index === length - 1) {
        query = query.concat(`.id:FACET("${id}"))`);
      } else {
        query = query.concat(`.id:FACET("${id}"), `);
      }
    });
    return query;
  }

  constructor(props: CommentsProps) {
    super(props);
    this.state = {
      showCreateBriefcaseModal: false,
      inputBriefcaseName: '',
      showBriefcaseInfoModal: false,
      error: undefined,
      selectedBriefcase: null,
      briefcases: [],
      briefcaseContentDocs: [],
    };
    (this: any).showCreateBriefcaseModal = this.showCreateBriefcaseModal.bind(this);
    (this: any).hideCreateBriefcaseModal = this.hideCreateBriefcaseModal.bind(this);
    (this: any).showBriefcaseInfoModal = this.showBriefcaseInfoModal.bind(this);
    (this: any).hideBriefcaseInfoModal = this.hideBriefcaseInfoModal.bind(this);
    (this: any).getBriefcases = this.getBriefcases.bind(this);
    (this: any).captureBriefcaseName = this.captureBriefcaseName.bind(this);
    (this: any).createBriefcase = this.createBriefcase.bind(this);
    (this: any).deleteBriefcase = this.deleteBriefcase.bind(this);
  }

  state: BriefcasesState;

  componentDidMount() {
    this.getBriefcases();
  }

  getBriefcases() {
    const username = AuthUtils.getLoggedInUserId();
    const { searcher } = this.context;
    const briefcases = [];
    if (searcher) {
      const qr = new SimpleQueryRequest();
      qr.query = `AND(table:briefcases, username_s:"${username}")`;
      qr.facets = [];
      qr.queryLanguage = 'advanced';
      searcher.doCustomSearch(qr, (response: QueryResponse | null, error: string | null) => {
        if (response && response.documents) {
          response.documents.forEach((doc) => {
            briefcases.push(Briefcase.fromDoc(doc));
          });
          this.setState({ briefcases });
        } else if (error) {
          this.setState({ error });
        }
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getFomattedDocResults(doc: SearchDocument) {
    const id = doc.getFirstValue('.id');
    const uri = doc.getFirstValue('uri');
    const title = doc.getFirstValue('title') || 'Title not Available';
    return (
      <div key={id}>
        <div
          style={{ borderRadius: '5px', border: 'solid 1px lightgray' }}
        >
          <div style={{ padding: '0.5em' }}>
            <a href={uri} target="_blank" rel="noopener noreferrer"> {title} </a>
          </div>
        </div>
        <br />
      </div>
    );
  }

  getBriefcaseDocs() {
    const { selectedBriefcase } = this.state;
    const { searcher } = this.context;
    if (
      selectedBriefcase &&
      Object.keys(selectedBriefcase).length > 0 &&
      selectedBriefcase.docIds &&
      selectedBriefcase.docIds.length > 0
    ) {
      const { docIds } = selectedBriefcase;
      if (searcher && docIds && docIds.length > 0) {
        const qr = new SimpleQueryRequest();
        qr.query = Briefcases.buildOrQuery(docIds);
        qr.facets = [];
        qr.queryLanguage = 'advanced';
        searcher.doCustomSearch(qr, (queryResponse: QueryResponse | null, error: string | null) => {
          if (queryResponse && queryResponse.documents) {
            const briefcaseContentDocs = queryResponse.documents;
            this.setState({
              briefcaseContentDocs,
            });
          } else if (error) {
            this.setState({ error });
          }
        });
      }
    }
  }

  getFormattedBriefcaseDocs() {
    const { briefcaseContentDocs } = this.state;
    if (briefcaseContentDocs && briefcaseContentDocs.length > 0) {
      const formattedBriefcaseDocs = briefcaseContentDocs.map((doc) => {
        return this.getFomattedDocResults(doc);
      });
      return formattedBriefcaseDocs;
    }
    return (
      <div className="none">
        No Documents in this Briefcase
      </div>
    );
  }

  createBriefcaseMenuItems() {
    const { briefcases } = this.state;
    let briefcaseMenuItems = [];
    if (briefcases && briefcases.length > 0) {
      briefcaseMenuItems = briefcases.map((briefcase) => {
        const briefcaseName = briefcase.name.length > 15 ? `${briefcase.name.substring(0, 15)}...` : briefcase.name;
        const countLabel = (
          <span style={{ color: 'lightgray' }}>
            ({briefcase.docIds.length})
          </span>
        );
        return (
          <MenuItem key={briefcase.id}>
            <span // eslint-disable-line jsx-a11y/no-static-element-interactions
              onClick={() => {
                this.showBriefcaseInfoModal(briefcase);
              }}
              title={briefcase.name}
            >
              {briefcaseName} {countLabel}
            </span>
          </MenuItem>
        );
      });
    }
    return briefcaseMenuItems;
  }

  showCreateBriefcaseModal() {
    this.setState({
      showCreateBriefcaseModal: true,
      inputBriefcaseName: '',
    });
  }

  hideCreateBriefcaseModal() {
    this.setState({
      showCreateBriefcaseModal: false,
    });
  }

  showBriefcaseInfoModal(briefcase) {
    const showModal = () => {
      this.getBriefcaseDocs();
      this.setState({
        showBriefcaseInfoModal: true,
      });
    };
    this.setState({
      selectedBriefcase: briefcase,
    }, showModal);
  }

  hideBriefcaseInfoModal() {
    this.setState({
      showBriefcaseInfoModal: false,
    });
  }

  captureBriefcaseName(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        inputBriefcaseName: e.target.value,
      });
    }
  }

  createBriefcase() {
    const { inputBriefcaseName } = this.state;
    const { searcher } = this.context;
    const username = AuthUtils.getUserName(AuthUtils.getSavedUser());
    const d = new Date();
    const loggedDateTime = d.toISOString();
    const id = username.concat(loggedDateTime);
    const body = {
      fields: {
        name_s: [inputBriefcaseName],
        username_s: [username],
        date: [loggedDateTime],
        table: ['briefcases'],
      },
      id,
    };
    const closeModalAndRefresh = () => {
      this.setState({
        showCreateBriefcaseModal: false,
      }, this.getBriefcases);
    };
    searcher.search.addOrDeleteDocument(JSON.parse(JSON.stringify(body)), closeModalAndRefresh);
  }

  deleteBriefcase() {
    const { selectedBriefcase } = this.state;
    const jsonDoc = `{ "id" : "${selectedBriefcase.id}", "mode" : "DELETE" }`;
    const closeModalAndRefresh = () => {
      this.setState({
        showBriefcaseInfoModal: false,
      }, this.getBriefcases);
    };
    this.context.searcher.search.addOrDeleteDocument(JSON.parse(jsonDoc), closeModalAndRefresh);
  }

  renderBriefcaseInfoModal() {
    const { selectedBriefcase, showBriefcaseInfoModal } = this.state;
    const documents = this.getFormattedBriefcaseDocs();
    if (selectedBriefcase && Object.keys(selectedBriefcase).length > 0) {
      return (
        <Modal
          show={showBriefcaseInfoModal}
          onHide={this.hideBriefcaseInfoModal}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <Glyphicon
                glyph="briefcase"
                style={{ color: 'white', fontSize: '0.8em', paddingRight: '0.3em' }}
              />
              {selectedBriefcase.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <span style={{ float: 'right', color: 'gray', fontSize: '0.8em' }}>
                  Created on {DateUtils.formatDateCustom(selectedBriefcase.date, 'MMMM DD, YYYY hh:mm A')}
                </span>
                <h4> Documents in this Briefcase: </h4>
                <div>
                  {documents}
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} style={{ paddingTop: '1em' }}>
                <div style={{ float: 'right' }}>
                  <Button onClick={this.deleteBriefcase}>
                    <Glyphicon
                      glyph="trash"
                      style={{ color: 'red', fontSize: '1em', paddingRight: '0.4em' }}
                    />
                    Delete this briefcase
                  </Button>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideBriefcaseInfoModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return '';
  }

  renderCreateBriefcaseModal() {
    const { showCreateBriefcaseModal, inputBriefcaseName } = this.state;
    return (
      <Modal show={showCreateBriefcaseModal} onHide={this.hideCreateBriefcaseaModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Briefcase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h4> Enter a name for the Briefcase: </h4>
              <span style={{ fontSize: '12px', color: 'lightgray' }}>
                Briefcases allow you to save a collection of documents to use at a later stage
                without having to relaunch the search.
              </span>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={8} lg={8}>
              <FormControl
                placeholder="Briefcase Name"
                aria-label="Briefcase Name"
                aria-describedby="basic-addon2"
                onChange={this.captureBriefcaseName}
                value={inputBriefcaseName}
              />
            </Col>
            <Col xs={12} sm={6} md={4} lg={4} style={{ float: 'right' }}>
              <Button
                onClick={this.createBriefcase}
              >
                Create Briefcase
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideCreateBriefcaseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  renderBriefcases() {
    const { briefcases } = this.state;
    if (briefcases && briefcases.length > 0) {
      return this.createBriefcaseMenuItems();
    }
    return (
      <MenuItem key="noBriefcases">
        <span
          style={{
            cursor: 'default',
          }}
          className="none"
        >
          No Briefcases Available
        </span>
      </MenuItem>
    );
  }

  renderBriefcasesDropdown() {
    return (
      <Dropdown id="briefcasesDropDown" componentClass="div" style={{ display: 'inline-block' }}>
        <Dropdown.Toggle
          noCaret
          useAnchor
          className="attivio-smalltoolbar-btn"
          bsClass="attivio-smalltoolbar-btn"
          title="Briefcases"
          style={{
            position: 'relative',
            top: '2px',
            left: '-6px',
            color: '#fff',
            border: 'none',
            background: 'transparent',
          }}
        >
          <Glyphicon
            glyph="briefcase"
            style={{ color: 'white', fontSize: '1.1em', paddingRight: '0.2em', marginTop: '-0.1em' }}
          />
          <span className="attivio-globalmast-icon attivio-icon-arrow-down-blue" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <MenuItem
            key="createBriefcase"
            onSelect={this.showCreateBriefcaseModal}
            id="createBriefcaseHeader"
          >
            <span
              style={{
                fontSize: '14px',
                color: '#003c7e',
              }}
            >
              <b> Create New Briefcase </b>
            </span>
          </MenuItem>
          <hr style={{ marginTop: '2px', marginBottom: '2px', color: '#003c7e' }} />
          <div
            id="recentlyCreatedBriefcasesLabel"
            style={{
              width: '100%',
              textAlign: 'center',
              backgroundColor: '#dff0f9',
              color: '#5d7c89',
              cursor: 'default',
              padding: '0.2em',
            }}
          >
            <b>Recently Created Briefcases:</b>
          </div>
          <hr style={{ marginTop: '2px', marginBottom: '2px', color: '#003c7e' }} />
          {this.renderBriefcases()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  render() {
    return (
      <span>
        {this.renderBriefcasesDropdown()}
        {this.renderCreateBriefcaseModal()}
        {this.renderBriefcaseInfoModal()}
      </span>
    );
  }
}

export default Briefcases;
