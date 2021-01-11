import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Notes.css";

export default function Users() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [users, setUser] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [fastcam8id, setFastcam8id] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadUser() {
      return API.get("users", `/users/${id}`);
    }

    async function onLoad() {
      try {
        const users = await loadUser();
        const { firstname, lastname, createdAt, companyname, address, email, fastcam8id } = users;

        setUser(users);
        setFirstname(firstname);
        setLastname(lastname);
        setCreatedAt(createdAt);
        setCompanyname(companyname);
        setAddress(address);
        setEmail(email);
        setFastcam8id(fastcam8id);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);



  return (
    <div className="Notes">
      <Table>
        <thead>
        <tr>
          <th>Created At</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
          <th>Company</th>
          <th>Address</th>
          <th>FastCAM ID</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{new Date(createdAt).toLocaleString()}</td>
          <td>{firstname}</td>
          <td>{lastname}</td>
          <td>{email}</td>
          <td>{companyname}</td>
          <td>{address}</td>
          <td>{fastcam8id}</td>
        </tr>
      </tbody>
      </Table>
  </div>

  );
}
