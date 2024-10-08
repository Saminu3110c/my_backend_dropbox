import React, { useState } from "react"
import { Card, Alert } from "react-bootstrap"
import { useAuth } from "../AuthContext"
import { Link } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"

export default function Profile() {
  const [error ] = useState("")
  const { currentUser } = useAuth()
  return (
    <CenteredContainer>
      <Card className="bg-light border border-secondary rounded">
        <Card.Body className="text-secondary">
          <h2 className="text-center text-secondary mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong className="text-dark">Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-secondary w-100 mt-3">
            Update Profile
          </Link>
          <Link to="/" className="btn btn-secondary w-100 mt-3">
            Dashboard
          </Link>
        </Card.Body>
      </Card>
    </CenteredContainer>
  )
}
