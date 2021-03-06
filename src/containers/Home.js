import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState([]);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const users = await loadUsers();
        setUsers(users);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadUsers() {
    return API.get("users", "/users");
  }

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  function renderSubmissionListTable(users) {
    const submissions = users;
    sortConfig.key = "createdAt";
    sortConfig.direction = "descending";

    let sortedSubmissions = [...submissions];
    sortedSubmissions.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return (
      <>
        <table className="styled-table" onload={() => requestSort("createdAt")}>
          <caption>Your Submissions</caption>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Company</th>
              <th>Fastcam 8 ID</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {sortedSubmissions.map((submission) => (
              <tr className="active-row" key={submission.submissionid}>
                <td>{new Date(submission.createdAt).toLocaleDateString()}</td>
                <td>{submission.firstname}</td>
                <td>{submission.companyname}</td>
                <td>{submission.fastcam8id}</td>
                <td>{submission.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  function renderSubmissionList(users) {
    const submissions = users;

    let sortedSubmissions = [...submissions];
    sortedSubmissions.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return (
      <>
        <LinkContainer to="/users/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Upload a new user</span>
          </ListGroup.Item>
        </LinkContainer>
        <div>{renderSubmissionListTable(users)}</div>
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Reseller Portal</h1>
        <p className="text-muted">Submission of user portal</p>
      </div>
    );
  }

  function infoTab() {
    return (
      <div>
        <p>
          <br />
          Welcome to the FastCAM Reseller page! FastCAM works with many OEMs &
          Resellers of machines to ensure that your customers get the best
          FastCAM Software, right for their needs. To this end, we do offer
          sizeable discounts, based on volume, for FastCAM resellers.
          <br />
          <br />
        </p>
        <ul>
          <div>
            <h1>The Discount is Store wide!</h1>
            <li>
              This discount applies across the whole FastCAM Store! So you can
              buy any product discounted from the FastCAM online catalogue on
              behalf of your customer!
            </li>
          </div>
          <div>
            <h1>
              <br />
              FastCAM 8 Annual Discounts & remuneration
            </h1>
            <li>
              Every Year you will be entitled to the discount and can sell to
              your customers.
            </li>
            <li>
              This enables you to sell to your customer at a discount, and
              retain a portion of the sale as well.
            </li>
            <li>
              This also applies for future renewals on our FastCAM 8
              Subscriptions! This means with FastCAM you can generate perpetual
              income!
            </li>
          </div>
          <div>
            <h1>
              <br />
              FastCAM 8 Training
            </h1>
            <li>
              As with all customer of FastCAM 8, your customers will also be
              eligible for access to our Online Training system. You just need
              to fill out their details after purchase, and we can grant them
              access to the system
            </li>
          </div>
          <div>
            <h1>
              <br />
              FastCAM 8 Support
            </h1>
            <li>
              A Part of the deal is that you, as the Point of Contact, will also
              be the first line of support for FastCAM as well. So technical
              questions will need to be answered by you. However, if you have
              any over the top questions, or ones you cannot answer, we are
              happy to help you help your customer.
            </li>
          </div>
          <div>
            <h1>
              <br />
              FastCAM is in ACTIVE development!
            </h1>
            <li>
              As the product is being worked on daily, we can incorporate
              changes you may find useful for your customers into the software!
              However, please be aware these are subject to review and approval
            </li>
          </div>
        </ul>
        <p>
          <br />
          <br />
          To qualify for this process, please fill out signup form and we will
          be in touch shortly!
        </p>
      </div>
    );
  }

  function renderSubmissions() {
    return (
      <div className="notes">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Submissions</h2>
        <ListGroup>{!isLoading && renderSubmissionList(users)}</ListGroup>
      </div>
    );
  }
  function customerlinks() {
    return (
      <div>
        <span>You can see the OEM Links</span>
      </div>
    );
  }
  function filler() {
    return <div>Please login</div>;
  }

  return (
    <div className="Home">
      <Tabs
        defaultActiveKey="Submissions"
        transition={false}
        id="noanim-tab-example"
      >
        <Tab eventKey="Submissions" title="Submissions">
          {isAuthenticated ? renderSubmissions() : renderLander()}
        </Tab>
        <Tab eventKey="Information" title="Information">
          {infoTab()}
        </Tab>
        <Tab eventKey="" title="Reseller Links">
          {isAuthenticated ? customerlinks() : filler()}
        </Tab>
      </Tabs>
    </div>
  );
}
