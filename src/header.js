import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="row mr-0 ml-0">
      <div className="col-12 pr-0 pl-0">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/"><img src='https://mycostech.com/img/smalllogo.png' width='50' height='50'/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem >
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem >
                <NavLink href="https://github.com/siriphat0homnan/testMycos" target="bank">GitHub</NavLink>
              </NavItem>
              <NavItem >
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      </div>
    );
  }
}