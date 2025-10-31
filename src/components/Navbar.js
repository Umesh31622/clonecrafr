
// import React, { useState } from 'react';
// import { Navbar, Nav, Dropdown } from 'react-bootstrap';
// import { FaBars, FaBell, FaUser, FaSearch } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const TopNavbar = ({ toggleSidebar }) => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/authpage'); // redirect to login page
//   };

//   const handleProfile = () => {
//     alert(`Name: ${user.name || '-'}\nEmail: ${user.email || '-'}\nRole: ${user.role || '-'}`);
//   };

//   return (
//     <Navbar className="top-navbar shadow-sm px-3" expand="md">
//       <div className="d-flex align-items-center w-100 justify-content-between">

//         {/* Left: Hamburger always visible */}
//         <button 
//           className="btn btn-link text-dark p-0 me-2"
//           onClick={toggleSidebar}
//         >
//           <FaBars size={20} />
//         </button>

//         {/* Center: Search on desktop, name on mobile */}
//         <div className="flex-grow-1 d-flex justify-content-center">
//           <div className="d-none d-md-flex w-100">
//             <div className="input-group w-50">
//               <span className="input-group-text bg-transparent border-end-0">
//                 <FaSearch className="text-muted" />
//               </span>
//               <input 
//                 type="text" 
//                 className="form-control border-start-0" 
//                 placeholder="Search..."
//               />
//             </div>
//           </div>

//           <span className="d-md-none fw-bold">{user.name || 'Admin User'}</span>
//         </div>

//         {/* Right: Icons */}
//         <Nav className="d-flex align-items-center ms-auto">
//           <Nav.Item className="me-3 d-none d-md-block">
//             <FaBell className="text-muted" size={20} />
//           </Nav.Item>

//           <Dropdown align="end">
//             <Dropdown.Toggle 
//               variant="link" 
//               className="d-flex align-items-center text-decoration-none text-dark p-0"
//             >
//               <div className="user-avatar me-2">
//                 <FaUser className="text-muted" />
//               </div>
//               <div className="d-none d-md-block text-start">
//                 <div className="fw-semibold" style={{ fontSize: '0.9rem' }}>
//                   {user.name || 'Admin User'}
//                 </div>
//                 <div className="text-muted" style={{ fontSize: '0.8rem' }}>
//                   {user.role || 'Administrator'}
//                 </div>
//               </div>
//             </Dropdown.Toggle>

//             <Dropdown.Menu align="end">
//               <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
//               <Dropdown.Divider />
//               <Dropdown.Item 
//                 className="text-danger"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </Nav>
//       </div>
//     </Navbar>
//   );
// };

// export default TopNavbar;

import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { FaBars, FaBell, FaUser, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TopNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [user, setUser] = useState(storedUser);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(user.name || '');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/authpage'); // redirect to login page
  };

  const handleProfile = () => {
    alert(`Name: ${user.name || '-'}\nEmail: ${user.email || '-'}\nRole: ${user.role || '-'}`);
  };

  const handleSaveName = () => {
    const updatedUser = { ...user, name: editName };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setShowEditModal(false);
  };

  return (
    <>
      <Navbar className="top-navbar shadow-sm px-3" expand="md">
        <div className="d-flex align-items-center w-100 justify-content-between">

          {/* Left: Hamburger */}
          <button 
            className="btn btn-link text-dark p-0 me-2"
            onClick={toggleSidebar}
          >
            <FaBars size={20} />
          </button>

          {/* Center */}
          <div className="flex-grow-1 d-flex justify-content-center">
            <div className="d-none d-md-flex w-100">
              <div className="input-group w-50">
                <span className="input-group-text bg-transparent border-end-0">
                  <FaSearch className="text-muted" />
                </span>
                <input 
                  type="text" 
                  className="form-control border-start-0" 
                  placeholder="Search..."
                />
              </div>
            </div>

            <span className="d-md-none fw-bold">{user.name || 'Admin User'}</span>
          </div>

          {/* Right: Icons */}
          <Nav className="d-flex align-items-center ms-auto">
            <Nav.Item className="me-3 d-none d-md-block">
              <FaBell className="text-muted" size={20} />
            </Nav.Item>

            <Dropdown align="end">
              <Dropdown.Toggle 
                variant="link" 
                className="d-flex align-items-center text-decoration-none text-dark p-0"
              >
                <div className="user-avatar me-2">
                  <FaUser className="text-muted" />
                </div>
                <div className="d-none d-md-block text-start">
                  <div className="fw-semibold" style={{ fontSize: '0.9rem' }}>
                    {user.name || 'Admin User'}
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                    {user.role || 'Administrator'}
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                {/* <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item> */}
                <Dropdown.Item onClick={() => setShowEditModal(true)}>Edit Name</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item 
                  className="text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Navbar>

      {/* Edit Name Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter new name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveName}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TopNavbar;
