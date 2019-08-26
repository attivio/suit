// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Glyphicon } from 'react-bootstrap';
import Menu, { MenuItemDef } from './Menu';
import AuthUtils from '../util/AuthUtils';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import Briefcase from '../api/Briefcase';

type AddToBriefcaseLinkProps = {
  docId: string;
};

type AddToBriefcaseState = {
  availableBriefcases: Array<Briefcase>,
  showAddToBriefcaseModal: boolean,
  selectedBriefcase: Briefcase,
  error: string | null,
};

class AddToBriefcaseLink extends React.Component<void, AddToBriefcaseLinkProps, AddToBriefcaseState> {
  static contextTypes = {
    searcher: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      availableBriefcases: [],
      showAddToBriefcaseModal: false,
      selectedBriefcase: null,
      error: null,
    };
    (this: any).addToBriefcase = this.addToBriefcase.bind(this);
    (this: any).showAddToBriefcaseModal = this.showAddToBriefcaseModal.bind(this);
    (this: any).hideAddToBriefcaseModal = this.hideAddToBriefcaseModal.bind(this);
    (this: any).briefcaseChanged = this.briefcaseChanged.bind(this);
    (this: any).showError = this.showError.bind(this);
  }

  getBriefcases() {
    const username = AuthUtils.getLoggedInUserId();
    const { searcher } = this.context;
    const availableBriefcases = [];
    if (searcher) {
      const qr = new SimpleQueryRequest();
      qr.query = `AND(table:briefcases, username_s:"${username}")`;
      qr.facets = [];
      qr.queryLanguage = 'advanced';
      searcher.doCustomSearch(qr, (response: QueryResponse | null, error: string | null) => {
        if (response && response.documents) {
          response.documents.forEach((doc) => {
            availableBriefcases.push(Briefcase.fromDoc(doc));
          });
          this.setState(
            {
              availableBriefcases,
            },
            this.createBriefcaseMenuItems,
          );
        } else if (error) {
          this.setState({ error });
        }
      });
    }
  }

  createBriefcaseMenuItems() {
    const { availableBriefcases } = this.state;
    const menuItems = [];
    if (availableBriefcases && availableBriefcases.length > 0) {
      availableBriefcases.forEach((briefcase) => {
        menuItems.push(new MenuItemDef(briefcase.name, briefcase.id, briefcase.docIds));
      });
    }
    return menuItems;
  }

  showAddToBriefcaseModal() {
    this.setState({
      showAddToBriefcaseModal: true,
    }, this.getBriefcases);
  }

  showError(error: string) {
    this.setState({
      error,
    });
  }

  hideAddToBriefcaseModal() {
    this.setState({
      showAddToBriefcaseModal: false,
    });
  }

  addToBriefcase() {
    const { docId } = this.props;
    const { selectedBriefcase } = this.state;
    const { searcher } = this.context;
    const briefcaseId = selectedBriefcase.id;
    const docIds = selectedBriefcase.docIds;
    const documentIDs = [];

    if (docIds && docIds.length > 0) {
      docIds.forEach((id) => {
        documentIDs.push(id);
      });
      documentIDs.unshift(docId);
    } else {
      documentIDs.push(docId);
    }
    if (searcher) {
      searcher.search.updateRealtimeField(
        briefcaseId,
        'briefcaseDocIds',
        documentIDs,
        this.hideAddToBriefcaseModal,
        this.showError,
        );
    }
  }

  briefcaseChanged(item: MenuItemDef) {
    const selectedBriefcaseID = item.value;
    const { availableBriefcases } = this.state;
    const selectedBriefcase = availableBriefcases.find((briefcase: Briefcase) => {
      return briefcase.id === selectedBriefcaseID;
    });
    this.setState({
      selectedBriefcase,
    });
  }

  renderAddToBriefcaseModal() {
    const { selectedBriefcase, error } = this.state;
    let currentSelection = null;
    if (selectedBriefcase && Object.keys(selectedBriefcase).length > 0) {
      currentSelection = selectedBriefcase.id;
    }
    const briefcaseMenuItems = this.createBriefcaseMenuItems();
    return (
      <Modal
        show={this.state.showAddToBriefcaseModal}
        onHide={this.hideAddToBriefcaseModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add this Document to a Briefcase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Menu
                label="Briefcase"
                selection={currentSelection}
                items={briefcaseMenuItems}
                onSelect={this.briefcaseChanged}
                width={300}
              />
              <div style={{ float: 'right' }}>
                <Button onClick={this.addToBriefcase}>
                  <Glyphicon
                    glyph="plus"
                    style={{ color: 'lightgreen', fontSize: '1em', paddingRight: '0.4em' }}
                  />
                  Add to Briefcase
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div style={{ color: 'red' }}>
                {error}
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideAddToBriefcaseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  renderAddToBriefcaseLink() {
    return (
      <a
        className="attivio-tags-more"
        onClick={this.showAddToBriefcaseModal}
        role="button"
        tabIndex={0}
        title="Add/View Comments"
      >
        Add to Briefcase
      </a>
    );
  }

  render() {
    return (
      <span>
        {this.renderAddToBriefcaseLink()}
        {this.renderAddToBriefcaseModal()}
      </span>
    );
  }
}

export default AddToBriefcaseLink;
